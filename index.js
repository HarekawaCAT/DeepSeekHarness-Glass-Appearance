/**
 * Host half of the glass-appearance bundle.
 *
 * The Client cannot keep a locally picked video across restarts: a `blob:` URL dies with
 * its page and the GUI origin changes port between launches, so neither localStorage nor
 * IndexedDB survives. Instead this half serves the plugin's own `resources/` directory
 * over the local HTTP server, so the Client can point at a stable same-origin URL and the
 * file simply lives on disk.
 *
 * Every step is best-effort: this package also carries the Client half, so an exception
 * here would fail the whole row and take the appearance layer down with it.
 */
import { createReadStream } from 'node:fs';
import { mkdir, stat } from 'node:fs/promises';
import { dirname, extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const PACKAGE_DIR = dirname(fileURLToPath(import.meta.url));
const ASSET_DIR = join(PACKAGE_DIR, 'resources');
const ROUTE = '/glass-assets';
const OPEN_ROUTE = '/glass-resources/open';

const CONTENT_TYPES = {
  '.mp4': 'video/mp4',
  '.m4v': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.ogv': 'video/ogg',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
};

/**
 * Answer one asset request from `resources/`, refusing anything outside it.
 * @param request - incoming HTTP request.
 * @param response - response stream to complete.
 * @returns a promise settled when the body is handed to the socket.
 */
async function serveAsset(request, response) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.statusCode = 405;
    response.setHeader('Allow', 'GET, HEAD');
    response.end();
    return;
  }
  const url = new URL(request.url ?? '/', 'http://localhost');
  const prefix = ROUTE + '/';
  const name = decodeURIComponent(url.pathname.startsWith(prefix) ? url.pathname.slice(prefix.length) : '');
  const target = normalize(join(ASSET_DIR, name));
  if (name === '' || (target !== ASSET_DIR && !target.startsWith(ASSET_DIR + sep))) {
    response.statusCode = 404;
    response.end('not found');
    return;
  }
  let info;
  try {
    info = await stat(target);
  } catch {
    response.statusCode = 404;
    response.end('not found');
    return;
  }
  if (!info.isFile()) {
    response.statusCode = 404;
    response.end('not found');
    return;
  }
  response.setHeader('Content-Type', CONTENT_TYPES[extname(target).toLowerCase()] ?? 'application/octet-stream');
  response.setHeader('Content-Length', String(info.size));
  response.setHeader('Cache-Control', 'no-cache');
  if (request.method === 'HEAD') {
    response.end();
    return;
  }
  await new Promise((resolve) => {
    const stream = createReadStream(target);
    stream.on('error', () => {
      response.destroy();
      resolve();
    });
    response.on('close', resolve);
    stream.pipe(response);
  });
}

/**
 * Reveal the asset directory in the platform file manager.
 * @param request - incoming HTTP request; only POST is accepted.
 * @param response - response stream to complete.
 * @returns a promise settled once the folder request is handed to the OS.
 */
async function openResources(request, response) {
  if (request.method !== 'POST') {
    response.statusCode = 405;
    response.setHeader('Allow', 'POST');
    response.end();
    return;
  }
  try {
    await mkdir(ASSET_DIR, { recursive: true });
    const { spawn } = await import('node:child_process');
    const [command, args] =
      process.platform === 'win32'
        ? ['explorer.exe', [ASSET_DIR]]
        : process.platform === 'darwin'
          ? ['open', [ASSET_DIR]]
          : ['xdg-open', [ASSET_DIR]];
    const child = spawn(command, args, { detached: true, stdio: 'ignore' });
    child.unref();
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end('{"ok":true}');
  } catch (error) {
    response.statusCode = 500;
    response.end(String(error));
  }
}

/**
 * @param ctx - plugin context; the web server is optional so the bundle still loads
 *              in a composition without one.
 */
export function apply(ctx) {
  let server;
  try {
    server = ctx.get('webServer');
  } catch {
    server = undefined;
  }
  if (server === undefined || server === null || typeof server.register !== 'function') return;
  try {
    ctx.effect(() => {
      const disposers = [];
      try {
        disposers.push(server.register({ kind: 'prefix', path: ROUTE, handler: serveAsset }));
      } catch (error) {
        console.warn('[glass-appearance] asset route unavailable', error);
      }
      try {
        disposers.push(server.register({ kind: 'exact', path: OPEN_ROUTE, handler: openResources }));
      } catch (error) {
        console.warn('[glass-appearance] open-folder route unavailable', error);
      }
      return () => {
        for (const dispose of disposers) {
          try {
            dispose();
          } catch {
            /* Already released. */
          }
        }
      };
    }, 'glass-appearance: resources routes');
  } catch (error) {
    console.warn('[glass-appearance] route registration skipped', error);
  }
}
