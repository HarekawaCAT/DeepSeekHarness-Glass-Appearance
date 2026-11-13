/**
 * Client half of the glass-appearance bundle: a wallpaper behind a translucent
 * window, with one opacity percentage per surface and a custom text color.
 *
 * Performance contract: two owned <style> elements, no theme-service override and
 * no app-wide re-render. The wallpaper tag is rewritten only when the wallpaper
 * changes (it may hold a large data URL); the token tag is rewritten at most once
 * per animation frame, so dragging a slider stays smooth.
 */
window.__ModuleLoader__.load({
  id: 'dsh-glass-appearance',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const NS = 'glassAppearance';
    const KEY = 'dsh.glass-appearance.v3';
    const LEGACY_KEY = 'dsh.glass-appearance.v2';

    const DICT = {
      en: {
        nav: 'Glass appearance',
        title: 'Glass appearance',
        intro: 'A wallpaper behind a translucent window. Each surface has its own opacity; changes apply immediately.',
        wall: 'Wallpaper',
        'wall.aurora': 'Aurora',
        'wall.dusk': 'Dusk',
        'wall.graphite': 'Graphite',
        'image.pick': 'Choose image…',
        'image.clear': 'Remove',
        'image.url': 'Image URL',
        on: 'On',
        off: 'Off',
        video: 'Video background',
        'video.pick': 'Choose video…',
        'video.url': 'Video URL (https://…)',
        'video.note':
          'A local file only lasts this run — browsers cannot reopen it after a restart; paste an https URL to keep it. Video plus glass is GPU-heavy: raise the wallpaper dim or turn the video off if it stutters.',
        'video.asset': 'Use resources/background.mp4',
        'video.folder': 'Open resources folder',
        'video.asset.note':
          'Drop a video at <plugin>/resources/background.mp4: the plugin serves it locally, so it survives restarts and keeps working offline.',
        'video.missing': 'resources/background.mp4 was not found — falling back to the wallpaper.',
        mask: 'Wallpaper dim',
        opacity: 'Opacity',
        'op.sidebar': 'Sidebar',
        'op.panel': 'Dialogs and panels',
        'op.card': 'Cards and code',
        'op.menu': 'Menus and popovers',
        'op.input': 'Input box',
        'op.add': 'Add file button',
        'op.bubble': 'My messages',
        'op.ask': 'Question dialog',
        'op.toBottom': 'Jump-to-bottom button',
        'op.hint': 'Hover tooltips and cards',
        text: 'Text color',
        auto: 'Auto',
        blur: 'Blur',
        'blur.sidebar': 'Sidebar',
        'blur.bar': 'Bottom bar (below input)',
        'blur.input': 'Input box',
        'blur.dialog': 'Dialogs',
        'blur.menu': 'Menus and popovers',
        'blur.code': 'Chat code blocks',
        'blur.bubble': 'My messages',
        'blur.newSession': 'New session button',
        'blur.add': 'Add file button',
        'blur.ask': 'Question dialog',
        'blur.toBottom': 'Jump-to-bottom button',
        'blur.hint': 'Hover tooltips and cards',
        account: 'Account row',
        'diag.title': 'Diagnostics',
        'diag.button': 'Scan opaque backgrounds',
        'diag.hint': 'Lists the largest elements that still paint a solid background. Run it once per screen.',
        'account.name': 'Display name',
        'account.name.ph': 'Empty keeps the account name',
        'account.avatar': 'Avatar image URL',
        'account.avatar.ph': 'https://…',
        'account.avatar.pick': 'Choose image…',
        reset: 'Restore defaults',
        storage: 'The image is too large to store; it stays active until you close the app.',
        pct: '{value}%',
        px: '{value}px',
      },
      zh: {
        nav: '玻璃外观',
        title: '玻璃外观',
        intro: '背景图铺在窗口最底层，各面板分别设定不透明度，修改立即生效。',
        wall: '背景',
        'wall.aurora': '极光',
        'wall.dusk': '暮色',
        'wall.graphite': '石墨',
        'image.pick': '选择图片…',
        'image.clear': '移除',
        'image.url': '图片地址',
        on: '开',
        off: '关',
        video: '视频背景',
        'video.pick': '选择视频文件…',
        'video.url': '视频地址（https://…）',
        'video.note':
          '本地视频只对本次运行有效，重启后需重新选择；填 https 地址可以长期保留。视频 + 毛玻璃比较吃 GPU，卡的话调高「背景遮罩」或关掉视频。',
        'video.asset': '使用 resources/background.mp4',
        'video.folder': '打开 resources 文件夹',
        'video.asset.note':
          '把视频放到插件目录的 resources/background.mp4：由插件本地代发，重启后依然有效，离线也能用。',
        'video.missing': '没找到 resources/background.mp4，已回退到背景图。',
        mask: '背景遮罩',
        opacity: '不透明度',
        'op.sidebar': '侧边栏',
        'op.panel': '对话框与面板',
        'op.card': '卡片与代码块',
        'op.menu': '菜单与弹层',
        'op.input': '输入框',
        'op.add': '添加文件按钮',
        'op.bubble': '我发的消息',
        'op.ask': '确认目标对话框',
        'op.toBottom': '回到底部按钮',
        'op.hint': '悬停提示与详情框',
        text: '文字颜色',
        auto: '自动',
        blur: '模糊',
        'blur.sidebar': '侧边栏',
        'blur.bar': '底边栏（输入框下方）',
        'blur.input': '输入框',
        'blur.dialog': '对话框',
        'blur.menu': '弹层与菜单',
        'blur.code': '对话代码块',
        'blur.bubble': '我发的消息',
        'blur.newSession': '新会话按钮',
        'blur.add': '添加文件按钮',
        'blur.ask': '确认目标对话框',
        'blur.toBottom': '回到底部按钮',
        'blur.hint': '悬停提示与详情框',
        account: '账号栏',
        'diag.title': '诊断',
        'diag.button': '扫描不透明背景',
        'diag.hint': '列出当前界面上仍然是不透明大色块的元素。每切换一个界面点一次。',
        'account.name': '显示名称',
        'account.name.ph': '留空则用账号原名',
        'account.avatar': '头像图片地址',
        'account.avatar.ph': 'https://…',
        'account.avatar.pick': '选择头像图片…',
        reset: '恢复默认',
        storage: '图片太大无法保存，本次运行仍然生效。',
        pct: '{value}%',
        px: '{value}px',
      },
    };

    const WALLS = {
      aurora: {
        swatch: 'linear-gradient(135deg,#070b14,#1d3b63 50%,#4a2f6b)',
        dark: {
          bg: 'radial-gradient(900px 620px at 14% 8%,rgba(52,120,190,.42),rgba(52,120,190,0) 62%),linear-gradient(160deg,#070b14,#0b1220 50%,#0a0f1d)',
          tint: '#0b1220',
          text: '#e8eefc',
        },
        light: {
          bg: 'radial-gradient(900px 620px at 12% 6%,rgba(191,219,254,.85),rgba(191,219,254,0) 60%),linear-gradient(160deg,#f7faff,#eef3ff 55%,#f6f4ff)',
          tint: '#ffffff',
          text: '#0f172a',
        },
      },
      dusk: {
        swatch: 'linear-gradient(135deg,#0b0810,#3a1f3d 55%,#5c2a2a)',
        dark: {
          bg: 'radial-gradient(820px 600px at 18% 0%,rgba(140,64,96,.45),rgba(140,64,96,0) 60%),linear-gradient(165deg,#0b0810,#140f1b 50%,#0a0912)',
          tint: '#140f1b',
          text: '#f2e9f4',
        },
        light: {
          bg: 'radial-gradient(820px 600px at 12% 0%,rgba(255,228,236,.92),rgba(255,228,236,0) 62%),linear-gradient(165deg,#fffaf7,#fdf1f5)',
          tint: '#fffdfd',
          text: '#241220',
        },
      },
      graphite: {
        swatch: 'linear-gradient(135deg,#090a0c,#1b1f24 55%,#2c333b)',
        dark: {
          bg: 'radial-gradient(900px 640px at 82% 0%,rgba(106,118,132,.32),rgba(106,118,132,0) 58%),linear-gradient(180deg,#090a0c,#14171b 60%,#0c0e11)',
          tint: '#14171b',
          text: '#eef1f5',
        },
        light: {
          bg: 'radial-gradient(900px 640px at 85% 0%,rgba(226,232,240,.9),rgba(226,232,240,0) 60%),linear-gradient(180deg,#fafbfc,#eceff3)',
          tint: '#ffffff',
          text: '#111827',
        },
      },
    };

    const WALL_IDS = Object.keys(WALLS);
    /** Copy used when the hero is switched to English. */
    const HERO_TEXT = { headline: 'DeepSeek HARNESS', preview: 'Explore the unknown' };

    /** The Host half serves `<package>/resources/` at this prefix. */
    const ASSET_ROUTE = '/glass-assets/';
    const ASSET_VIDEO = 'background.mp4';

    /** HEAD-probe results per asset URL, so the video only takes over once it exists. */
    const assetState = new Map();

    /** Resolve `asset:` pseudo-URLs onto the Host asset route. */
    function resolveSource(url) {
      return url.startsWith('asset:') ? ASSET_ROUTE + url.slice('asset:'.length) : url;
    }

    function assetReady(src) {
      if (!assetState.has(src)) {
        const entry = { ok: null };
        assetState.set(src, entry);
        fetch(src, { method: 'HEAD' })
          .then((response) => {
            entry.ok = response.ok;
          })
          .catch(() => {
            entry.ok = false;
          })
          .finally(() => {
            for (const listener of [...listeners]) listener();
            if (paint !== null) paint();
          });
      }
      return assetState.get(src);
    }

    function videoAssetMissing(current) {
      if (!current.videoUrl.startsWith('asset:')) return false;
      const entry = assetState.get(resolveSource(current.videoUrl));
      return entry !== undefined && entry.ok === false;
    }
    const MODES = ['auto', 'dark', 'light'];
    const PARTS = [
      ['sidebar', 'op.sidebar'],
      ['panel', 'op.panel'],
      ['card', 'op.card'],
      ['menu', 'op.menu'],
      ['input', 'op.input'],
      ['add', 'op.add'],
      ['bubble', 'op.bubble'],
      ['ask', 'op.ask'],
      ['toBottom', 'op.toBottom'],
      ['hint', 'op.hint'],
    ];
    const BLUR_PARTS = [
      ['sidebar', 'blur.sidebar'],
      ['bar', 'blur.bar'],
      ['input', 'blur.input'],
      ['dialog', 'blur.dialog'],
      ['menu', 'blur.menu'],
      ['code', 'blur.code'],
      ['bubble', 'blur.bubble'],
      ['newSession', 'blur.newSession'],
      ['add', 'blur.add'],
      ['ask', 'blur.ask'],
      ['toBottom', 'blur.toBottom'],
      ['hint', 'blur.hint'],
    ];
    const DEFAULTS = {
      wall: 'aurora',
      image: '',
      video: false,
      videoUrl: '',
      mode: 'auto',
      mask: 35,
      blur: {
        sidebar: 10, bar: 12, input: 0, dialog: 12, menu: 40, code: 6, bubble: 0,
        newSession: 6, add: 0, ask: 0, toBottom: 0, hint: 10,
      },
      text: '',
      accountName: '',
      accountAvatar: '',
      op: { sidebar: 55, panel: 82, card: 64, menu: 86, input: 82, add: 70, bubble: 80, ask: 85, toBottom: 80, hint: 88 },
    };

    // #region state

    let state = load();
    let stored = true;
    let imageRev = 0;
    let paint = null;
    let readScheme = () => 'dark';
    let translate = (key) => key;
    const listeners = new Set();

    function clamp(value, min, max) {
      return value < min ? min : value > max ? max : value;
    }

    function percent(value, min, max) {
      const number = Math.round(Number(value));
      return Number.isFinite(number) ? clamp(number, min, max) : min;
    }

    function isHex(value) {
      return typeof value === 'string' && /^#[0-9a-f]{6}$/iu.test(value);
    }

    /** `#rrggbb` plus an alpha channel; non-hex input is returned unchanged. */
    function rgba(color, alpha) {
      if (!isHex(color)) return color;
      const value = Number.parseInt(color.slice(1), 16);
      const a = Math.round(clamp(alpha, 0, 1) * 1000) / 1000;
      return 'rgba(' + (value >> 16) + ',' + ((value >> 8) & 255) + ',' + (value & 255) + ',' + a + ')';
    }

    function cleanImage(value) {
      return String(value)
        .trim()
        .replace(/["'()\\\s]/gu, '')
        .slice(0, 3_500_000);
    }

    function normalize(raw) {
      const input = raw !== null && typeof raw === 'object' ? raw : {};
      const op = input.op !== null && typeof input.op === 'object' ? input.op : {};
      const blurInput = input.blur;
      const blur = blurInput !== null && typeof blurInput === 'object' ? blurInput : {};
      const legacyBlur = typeof blurInput === 'number' ? blurInput : undefined;
      return {
        wall: WALLS[input.wall] !== undefined ? input.wall : DEFAULTS.wall,
        image: typeof input.image === 'string' ? input.image.slice(0, 3_500_000) : '',
        video: input.video === true,
        videoUrl: typeof input.videoUrl === 'string' ? input.videoUrl.slice(0, 2000) : '',
        mode: MODES.includes(input.mode) ? input.mode : DEFAULTS.mode,
        mask: percent(input.mask === undefined ? DEFAULTS.mask : input.mask, 0, 85),
        blur: {
          sidebar: percent(blur.sidebar === undefined ? (legacyBlur === undefined ? DEFAULTS.blur.sidebar : legacyBlur) : blur.sidebar, 0, 48),
          bar: percent(blur.bar === undefined ? DEFAULTS.blur.bar : blur.bar, 0, 48),
          input: percent(blur.input === undefined ? DEFAULTS.blur.input : blur.input, 0, 48),
          dialog: percent(blur.dialog === undefined ? DEFAULTS.blur.dialog : blur.dialog, 0, 48),
          menu: percent(blur.menu === undefined ? DEFAULTS.blur.menu : blur.menu, 0, 48),
          code: percent(blur.code === undefined ? DEFAULTS.blur.code : blur.code, 0, 48),
          bubble: percent(blur.bubble === undefined ? DEFAULTS.blur.bubble : blur.bubble, 0, 48),
          newSession: percent(blur.newSession === undefined ? DEFAULTS.blur.newSession : blur.newSession, 0, 48),
          add: percent(blur.add === undefined ? DEFAULTS.blur.add : blur.add, 0, 48),
          ask: percent(blur.ask === undefined ? DEFAULTS.blur.ask : blur.ask, 0, 48),
          toBottom: percent(blur.toBottom === undefined ? DEFAULTS.blur.toBottom : blur.toBottom, 0, 48),
          hint: percent(blur.hint === undefined ? DEFAULTS.blur.hint : blur.hint, 0, 48),
        },
        text: isHex(input.text) ? input.text.toLowerCase() : '',
        accountName: typeof input.accountName === 'string' ? input.accountName.slice(0, 80) : '',
        accountAvatar: typeof input.accountAvatar === 'string' ? input.accountAvatar.slice(0, 3_500_000) : '',
        op: {
          sidebar: percent(op.sidebar === undefined ? DEFAULTS.op.sidebar : op.sidebar, 8, 100),
          panel: percent(op.panel === undefined ? DEFAULTS.op.panel : op.panel, 8, 100),
          card: percent(op.card === undefined ? DEFAULTS.op.card : op.card, 8, 100),
          menu: percent(op.menu === undefined ? DEFAULTS.op.menu : op.menu, 8, 100),
          input: percent(op.input === undefined ? DEFAULTS.op.input : op.input, 8, 100),
          add: percent(op.add === undefined ? DEFAULTS.op.add : op.add, 8, 100),
          bubble: percent(op.bubble === undefined ? DEFAULTS.op.bubble : op.bubble, 8, 100),
          ask: percent(op.ask === undefined ? DEFAULTS.op.ask : op.ask, 8, 100),
          toBottom: percent(op.toBottom === undefined ? DEFAULTS.op.toBottom : op.toBottom, 8, 100),
          hint: percent(op.hint === undefined ? DEFAULTS.op.hint : op.hint, 8, 100),
        },
      };
    }

    function load() {
      try {
        const raw = window.localStorage.getItem(KEY) ?? window.localStorage.getItem(LEGACY_KEY);
        const loaded = normalize(raw === null ? {} : JSON.parse(raw));
        // A blob URL dies with its page, so a locally picked video cannot be restored.
        if (loaded.videoUrl.startsWith('blob:')) loaded.videoUrl = '';
        return loaded;
      } catch (error) {
        return normalize({});
      }
    }

    function set(patch) {
      const previous = state;
      state = normalize({
        ...state,
        ...patch,
        op: { ...state.op, ...(patch.op || {}) },
        blur: { ...state.blur, ...(patch.blur || {}) },
      });
      if (state.image !== previous.image) imageRev += 1;
      try {
        window.localStorage.setItem(KEY, JSON.stringify(state));
        stored = true;
      } catch (error) {
        stored = false;
      }
      for (const listener of [...listeners]) listener();
      if (paint !== null) paint();
    }

    function subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    }

    // #endregion

    // #region appearance

    function palette(current) {
      const scheme = (current.mode === 'auto' ? readScheme() : current.mode) === 'light' ? 'light' : 'dark';
      const colors = (WALLS[current.wall] || WALLS[DEFAULTS.wall])[scheme];
      return { scheme, bg: colors.bg, tint: colors.tint, text: current.text || colors.text };
    }

    function wallpaper(current, colors) {
      const layer = current.image === '' ? colors.bg : 'url("' + current.image + '")';
      if (current.mask === 0) return layer;
      const shade = rgba(colors.scheme === 'dark' ? '#000000' : '#ffffff', current.mask / 100);
      return 'linear-gradient(' + shade + ',' + shade + '),' + layer;
    }

    /** Relative luminance of a `#rrggbb` color, for picking readable text on a fill. */
    function luminance(hex) {
      const channel = (index) => {
        const value = Number.parseInt(hex.slice(1 + index * 2, 3 + index * 2), 16) / 255;
        return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * channel(0) + 0.7152 * channel(1) + 0.0722 * channel(2);
    }

    /** Black or white, whichever reads better on `hex`. */
    function onColor(hex) {
      return isHex(hex) && luminance(hex) > 0.45 ? '#0b1220' : '#ffffff';
    }

    /** Every surface reads from these host tokens; nothing else is overridden. */
    function tokenCss(current, colors) {
      const alpha = (value) => rgba(colors.tint, value / 100);
      const text = colors.text;
      const tokens = {
        '--dsw-alias-bg-base': 'rgba(0,0,0,0)',
        '--dsw-specific-sidebar-fill': alpha(current.op.sidebar),
        '--dsw-alias-bg-overlay': alpha(current.op.panel),
        '--dsw-alias-bg-layer-1': alpha(current.op.panel),
        '--dsw-alias-bg-layer-2': alpha(current.op.card),
        '--dsw-alias-bg-layer-3': alpha(current.op.card),
        '--dsw-menu-surface-fill': alpha(current.op.menu),
        '--dsw-specific-menu': alpha(current.op.menu),
        '--dsw-alias-menu-group-header-fill': alpha(current.op.menu),
        '--dsw-alias-label-primary': text,
        // Primary buttons (new task, add plugin, send) take the text color as their fill,
        // with an automatically contrasting label.
        '--dsw-alias-button-primary-fill': text,
        '--dsw-alias-button-primary-hover': rgba(text, 0.85),
        '--dsw-alias-label-primary-foreground': onColor(text),
        '--dsw-alias-label-secondary': rgba(text, 0.76),
        '--dsw-alias-label-tertiary': rgba(text, 0.6),
        '--dsw-alias-label-caption': rgba(text, 0.46),
        '--dsw-alias-border-l1': rgba(text, 0.08),
        '--dsw-alias-border-l2': rgba(text, 0.14),
        '--dsw-alias-border-l3': rgba(text, 0.18),
        '--dsw-alias-border-l4': rgba(text, 0.22),
        '--dsw-alias-interactive-bg-hover': rgba(text, 0.07),
        '--dsw-alias-interactive-bg-active': rgba(text, 0.12),
        '--dsw-alias-bg-module-platform': rgba(text, 0.08),
        '--dsw-alias-button-elevated-fill': alpha(Math.min(100, current.op.sidebar + 15)),
        // Hover states paint their own opaque fills; keep them glassy too.
        '--dsw-alias-button-floating-hover': alpha(Math.min(100, current.op.sidebar + 24)),
        '--dsw-alias-interactive-bg-hover-solid': alpha(Math.min(100, current.op.sidebar + 10)),
        '--dsw-alias-markdown-code-block': alpha(current.op.card),
        '--dsw-alias-markdown-code-block-banner': alpha(current.op.card),
        '--dsw-alias-markdown-inline-code': 'color-mix(in srgb,currentColor 12%,transparent)',
        // Hover tooltips and row detail cards.
        '--dsw-alias-tooltip-bg': alpha(current.op.hint),
        '--dsw-specific-tip': alpha(current.op.hint),
      };
      return (
        'body{' + Object.keys(tokens).map((name) => name + ':' + tokens[name] + ' !important').join(';') + '}' +
        // The composer card and the user bubble keep their own hue; only the alpha changes.
        '[data-composer-card]{background-color:color-mix(in srgb,var(--dsw-specific-input-major) ' +
        current.op.input + '%,transparent) !important}' +
        '[data-message-bubble]{background-color:color-mix(in srgb,var(--dsw-specific-bubble) ' +
        current.op.bubble + '%,transparent) !important}' +
        'button[class*="GRgSLq_add"]{background-color:color-mix(in srgb,var(--dsw-specific-selector) ' +
        current.op.add + '%,transparent) !important}' +
        // The sticky code-block banner sits above the block; keep it the same tint as the block,
        // and give inline `code` a tint of its own text color so it follows the theme.
        '[data-code-block-banner]{background-color:' + alpha(current.op.card) + ' !important}' +
        ':not(pre)>code{background-color:color-mix(in srgb,currentColor 12%,transparent) !important}' +
        // The ask-question card and the jump-to-bottom button carry their own opaque fills.
        '[data-question-key]>section{background-color:color-mix(in srgb,var(--dsw-specific-input-major) ' +
        current.op.ask + '%,transparent) !important}' +
        // The settled question/answer bubble reuses the user-message bubble without its
        // data-message-bubble marker, so it needs its own fill.
        '[data-question-reply]>div>*{background-color:color-mix(in srgb,var(--dsw-specific-input-major) ' +
        current.op.ask + '%,transparent) !important}' +
        'button[class*="toBottom"]{background-color:color-mix(in srgb,var(--dsw-alias-button-floating-fill) ' +
        current.op.toBottom + '%,transparent) !important}' +
        // Switches: the ON track follows the text color; the knob keeps the contrast color
        // already set through --dsw-alias-label-primary-foreground.
        '[role="switch"][aria-checked="true"],[aria-checked="true"][class*="switch"]{background-color:' +
        text + ' !important}' +
        // The knob follows the color scheme instead of the text color, so it changes with
        // light/dark and never turns into a hard black dot on the yellow track.
        '[role="switch"]>*,[role="switch"] [class*="thumb"]{background-color:' +
        (colors.scheme === 'dark' ? 'rgba(255,255,255,0.94)' : '#111827') + ' !important}' +
        // The session list fades into the sidebar fill over its last 24px. That fade only
        // works against an opaque fill; over glass it shows the wallpaper as a bright haze.
        '[class*="treeBody"]>[class*="fade"],[class*="GAkraW_fade"]{display:none !important}' +
        // The edited-files card header and the presented-file cards paint hard-coded
        // static fills that no theme token reaches. A universal important declaration is
        // the only hash-independent way to override them.
        '*{--changes-fill:' + alpha(Math.min(100, current.op.card + 6)) +
        ' !important;--changes-hover:' + alpha(Math.min(100, current.op.card + 14)) +
        ' !important;--deliverable-fill:' + alpha(current.op.card) +
        ' !important;--deliverable-hover:' + alpha(Math.min(100, current.op.card + 10)) + ' !important}' +
        '[class*="HOHHba_header"]{background-color:var(--changes-fill) !important}' +
        accountCss(current) +
        heroCss() +
        blurCss(current, colors)
      );
    }

    /**
     * Optional English hero copy. The host slogan is not translated by its locale pack,
     * so the only lever is replacing the text node's rendering.
     */
    /**
     * English hero copy. The host slogan is not translatable from a plugin, so the hero
     * renders the English wordmark instead, always.
     */
    function heroCss() {
      return (
        // A zero-font-size inline span puts its baseline at the bottom of the strut, which
        // lifts the injected text; making it a flex box keeps the line box centered.
        '[class*="titleGroup"]>span:first-child{font-size:0 !important;display:flex;align-items:center}' +
        '[class*="titleGroup"]>span:first-child::after{content:' + JSON.stringify(HERO_TEXT.headline) +
        ';font-size:30px;line-height:36px;font-weight:500;white-space:nowrap}' +
        '[class*="previewBadge"]{font-size:0 !important;align-self:flex-start}' +
        '[class*="previewBadge"]::after{content:' + JSON.stringify(HERO_TEXT.preview) +
        ';font-size:11px;line-height:16px;white-space:nowrap}'
      );
    }

    /**
     * Optional account-row overrides. The host account store is package-private, so a
     * plugin can neither read the nickname nor the avatar URL; these two fields let the
     * user supply them and render through CSS variables.
     */
    function accountCss(current) {
      const name = current.accountName.trim();
      const avatar = current.accountAvatar.trim();
      let css = '';
      if (name !== '') {
        css +=
          'body{--ga-account-name:' + JSON.stringify(name) + '}' +
          'button[aria-haspopup="menu"][data-signed-out="false"][data-collapsed="false"]>span:last-child{font-size:0 !important}' +
          'button[aria-haspopup="menu"][data-signed-out="false"][data-collapsed="false"]>span:last-child::after{content:var(--ga-account-name);' +
          'font-size:14px;line-height:20px;color:inherit}';
      }
      if (avatar !== '') {
        css +=
          'body{--ga-account-avatar:url("' + avatar + '")}' +
          'button[aria-haspopup="menu"][data-signed-out="false"]>span:first-child{background-image:var(--ga-account-avatar) !important;' +
          'background-size:cover !important;background-position:center !important}' +
          'button[aria-haspopup="menu"][data-signed-out="false"]>span:first-child>*{opacity:0 !important}';
      }
      return css;
    }

    /** One blur percentage per surface; every surface uses the host's own hook. */
    function blurCss(current, colors) {
      const blur = current.blur;
      const value = (radius) => (radius > 0 ? 'blur(' + radius + 'px)' : 'none');
      const pair = (selector, filter) =>
        selector + '{backdrop-filter:' + filter + ' !important;-webkit-backdrop-filter:' + filter + ' !important}';
      return (
        // The sidebar blurs through a negative-z pseudo layer: a filter on the column
        // itself would make it a containing block for the titlebar's fixed-position
        // buttons (toggle, collapsed new-session), which clips them away.
        '[class*="sidebarCol"]{position:relative}' +
        '[class*="sidebarCol"]::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;' +
        'backdrop-filter:' + value(blur.sidebar) + ' !important;-webkit-backdrop-filter:' + value(blur.sidebar) + ' !important}' +
        // The bottom-bar slider covers only the strip below the input card, as a rectangle.
        '[class*="GRgSLq_dock"]{width:100%;backdrop-filter:' + value(blur.bar) +
        ' !important;-webkit-backdrop-filter:' + value(blur.bar) + ' !important}' +
        pair('[data-composer-card]', value(blur.input)) +
        pair('[role="dialog"][aria-modal="true"]', value(Math.round(blur.dialog * 0.7))) +
        pair('.md-code-block', value(blur.code)) +
        pair('[data-message-bubble]', value(blur.bubble)) +
        pair('button[class*="newSession"]', value(blur.newSession)) +
        pair('button[class*="GRgSLq_add"]', value(blur.add)) +
        pair('[data-question-key]>section', value(blur.ask)) +
        pair('[data-question-reply]>div>*', value(blur.ask)) +
        pair('button[class*="toBottom"]', value(blur.toBottom)) +
        // The composer's command menu is a listbox with no fill of its own: its material
        // comes from a wrapper no slider could reach, so it gets one here.
        '[role="listbox"],[class*="pc3rQa_menu"],[class*="_menu_pc3rQa"]{background-color:' +
        rgba(colors.tint, current.op.menu / 100) + ' !important;border-radius:var(--dsw-radius-lg)' +
        ';backdrop-filter:' + value(blur.menu) + ' !important;-webkit-backdrop-filter:' + value(blur.menu) + ' !important}' +
        // The session row's hover card hard-codes its own dark fill through
        // --dsw-hovercard-bg. Its class is emitted as `_card_<hash>_<n>`, so the
        // local name comes BEFORE the hash.
        '[class*="_card"]{--dsw-hovercard-bg:' + rgba(colors.tint, current.op.hint / 100) + ' !important}' +
        '[class*="card_bgejw"]{background-color:' + rgba(colors.tint, current.op.hint / 100) +
        ' !important;backdrop-filter:' + value(blur.hint) + ' !important;-webkit-backdrop-filter:' + value(blur.hint) + ' !important}' +
        // Hover tooltips and non-modal popover panels: translucent fill plus the hint blur.
        '[role="tooltip"],[data-side][data-portal],[role="dialog"]:not([aria-modal="true"]){background-color:' +
        rgba(colors.tint, current.op.hint / 100) + ' !important;backdrop-filter:' + value(blur.hint) +
        ' !important;-webkit-backdrop-filter:' + value(blur.hint) + ' !important}' +
        '.md-code-block{background-color:' + rgba(colors.tint, current.op.card / 100) + ' !important}' +
        'body{--dsw-mask-blur:' + value(blur.dialog) +
        ' !important;--dsw-menu-backdrop-filter:' + (blur.menu > 0 ? 'blur(' + blur.menu + 'px) saturate(150%)' : 'none') +
        ' !important}'
      );
    }

    function wallCss(current, colors, videoOn) {
      const base = colors.scheme === 'dark' ? '#06080f' : '#f2f5ff';
      const backdrop = videoOn
        ? 'background-color:transparent !important;background-image:none !important'
        : 'background-color:' + base + ' !important;background-image:' + wallpaper(current, colors) +
          ' !important;background-size:cover !important;background-position:center !important;background-repeat:no-repeat !important';
      return (
        'html{color-scheme:' + colors.scheme + ' !important;background-color:' + base + ' !important}' +
        'body{' + backdrop + '}' +
        // The video layer is the only DOM this plugin owns: a fixed, non-interactive
        // element behind every column, removed with the plugin.
        '[data-dsh-glass-video]{position:fixed;inset:0;width:100%;height:100%;object-fit:cover;' +
        'z-index:-1;pointer-events:none;background:transparent}'
      );
    }

    // #endregion

    // #region settings page

    const PAGE_CSS =
      '.ga-page{display:flex;flex-direction:column;padding:4px 0 40px}' +
      '.ga-h{margin:0;color:var(--dsw-alias-label-primary);font-size:18px;font-weight:510;line-height:26px}' +
      '.ga-p{margin:6px 0 0;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px}' +
      '.ga-section{margin-top:18px;padding-top:10px;border-top:.5px solid var(--dsw-alias-border-l2)}' +
      '.ga-sub{margin:0 0 2px;color:var(--dsw-alias-label-primary);font-size:13px;font-weight:510;line-height:22px}' +
      '.ga-row{display:flex;align-items:center;gap:16px;padding:10px 0}' +
      '.ga-label{flex:1;min-width:0;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}' +
      '.ga-control{display:inline-flex;align-items:center;gap:8px;flex:none}' +
      '.ga-chips{display:flex;flex-wrap:wrap;gap:6px;padding:6px 0}' +
      '.ga-range{width:190px;accent-color:var(--dsw-alias-brand-primary)}' +
      '.ga-value{min-width:44px;text-align:right;color:var(--dsw-alias-label-secondary);font-size:12px;font-variant-numeric:tabular-nums}' +
      '.ga-chip{position:relative;box-sizing:border-box;display:inline-flex;align-items:center;gap:6px;height:28px;' +
      'padding:0 10px;border-radius:var(--dsw-radius-md,8px);border:.5px solid var(--dsw-alias-border-l3);' +
      'background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;line-height:18px;cursor:pointer;white-space:nowrap}' +
      '.ga-chip:hover{background:var(--dsw-alias-interactive-bg-hover)}' +
      '.ga-chip:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}' +
      '.ga-chip[aria-pressed="true"]{border-color:var(--dsw-alias-brand-primary);box-shadow:inset 0 0 0 1px var(--dsw-alias-brand-primary)}' +
      '.ga-swatch{width:18px;height:18px;border-radius:5px;flex:none;box-shadow:inset 0 0 0 .5px rgba(255,255,255,.35)}' +
      '.ga-input{box-sizing:border-box;width:100%;height:32px;margin-top:6px;padding:0 10px;' +
      'border-radius:var(--dsw-radius-sm,6px);border:.5px solid var(--dsw-alias-border-l3);' +
      'background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font:inherit;font-size:12px}' +
      '.ga-input:focus{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:0}' +
      '.ga-color{width:34px;height:24px;padding:0;border:.5px solid var(--dsw-alias-border-l3);border-radius:6px;background:transparent;cursor:pointer}' +
      '.ga-field{box-sizing:border-box;width:220px;max-width:100%;height:30px;padding:0 10px;' +
      'border-radius:var(--dsw-radius-sm,6px);border:.5px solid var(--dsw-alias-border-l3);' +
      'background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary);font:inherit;font-size:12px}' +
      '.ga-field:focus{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:0}' +
      '.ga-stack{display:inline-flex;flex-direction:column;align-items:flex-end;gap:8px;min-width:0}' +
      '.ga-file{position:absolute;inset:0;opacity:0;cursor:pointer}' +
      '.ga-warn{margin:14px 0 0;color:var(--dsw-alias-state-warn-primary);font-size:12px;line-height:18px}' +
      '.ga-note{margin:8px 0 0;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:17px}' +
      '.ga-list{display:flex;flex-direction:column;gap:5px;max-height:260px;overflow:auto;padding:6px 0}' +
      '.ga-item{display:flex;gap:8px;align-items:baseline;font-size:11px;line-height:16px}' +
      '.ga-itemName{color:var(--dsw-alias-label-primary);font-family:var(--dsw-font-mono,monospace);word-break:break-all}' +
      '.ga-itemMeta{color:var(--dsw-alias-label-tertiary);white-space:nowrap}' +
      '.ga-foot{display:flex;justify-content:flex-end;padding:16px 0 0}' +
      '.ga-link{border:0;background:transparent;color:var(--dsw-alias-link);font:inherit;font-size:12px;padding:6px 10px;border-radius:6px;cursor:pointer}' +
      '.ga-link:hover{background:var(--dsw-alias-interactive-bg-hover)}' +
      '@media (width<=640px){.ga-range{width:120px}}';

    function useSettings() {
      const [snapshot, setSnapshot] = React.useState(state);
      React.useEffect(() => subscribe(() => setSnapshot(state)), []);
      return snapshot;
    }

    /**
     * Report the largest visible elements whose computed background is still solid.
     * Used to find host surfaces that paint their own opaque fill.
     */
    function scanOpaque() {
      const rows = [];
      const nodes = document.body.getElementsByTagName('*');
      for (const node of nodes) {
        const rect = node.getBoundingClientRect();
        if (rect.width * rect.height < 2400) continue;
        const style = window.getComputedStyle(node);
        if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) < 0.05) continue;
        const background = style.backgroundColor;
        const match = /rgba?\(([^)]+)\)/u.exec(background);
        const parts = match === null ? [] : match[1].split(',').map((value) => value.trim());
        const alpha = parts.length === 4 ? Number(parts[3]) : parts.length === 3 ? 1 : 0;
        if (!(alpha >= 0.55)) continue;
        rows.push({
          name: String(node.className || node.tagName).slice(0, 80),
          color: background,
          size: Math.round(rect.width) + '×' + Math.round(rect.height),
          area: rect.width * rect.height,
        });
      }
      rows.sort((a, b) => b.area - a.area);
      return rows.slice(0, 40);
    }

    const chip = (key, label, pressed, onClick, swatch) =>
      h(
        'button',
        { key, type: 'button', className: 'ga-chip', 'aria-pressed': pressed, onClick },
        swatch === undefined
          ? label
          : [
              h('span', { key: 's', className: 'ga-swatch', 'aria-hidden': true, style: { background: swatch } }),
              label,
            ],
      );

    const row = (key, label, control) =>
      h('div', { key, className: 'ga-row' }, [
        h('div', { key: 'label', className: 'ga-label' }, label),
        h('div', { key: 'control', className: 'ga-control' }, control),
      ]);

    const slider = (key, label, value, min, max, suffix, onChange) =>
      row(key, label, [
        h('input', {
          key: 'range',
          className: 'ga-range',
          type: 'range',
          min,
          max,
          step: 1,
          value,
          'aria-label': label,
          onChange: (event) => onChange(Number(event.currentTarget.value)),
        }),
        h('span', { key: 'value', className: 'ga-value' }, suffix.replace('{value}', String(value))),
      ]);

    /** Decode, downscale, and re-encode a chosen file so it fits in localStorage. */
    function pickImage(file, done, max = 2200) {
      const reader = new FileReader();
      const fallback = () => {
        if (typeof reader.result === 'string') done(reader.result);
      };
      reader.onerror = fallback;
      reader.onload = () => {
        const image = new Image();
        image.onerror = fallback;
        image.onload = () => {
          try {
            const scale = Math.min(1, max / Math.max(image.width, image.height));
            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.round(image.width * scale));
            canvas.height = Math.max(1, Math.round(image.height * scale));
            canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
            done(canvas.toDataURL('image/jpeg', 0.86));
          } catch (error) {
            fallback();
          }
        };
        image.src = String(reader.result);
      };
      reader.readAsDataURL(file);
    }

    function Page(props) {
      const current = useSettings();
      const [scan, setScan] = React.useState([]);
      const t = props !== null && typeof props === 'object' && typeof props.t === 'function' ? props.t : translate;
      const colors = palette(current);
      const onImage = (event) => {
        const file = event.currentTarget.files && event.currentTarget.files[0];
        if (file) pickImage(file, (dataUrl) => set({ image: cleanImage(dataUrl) }));
        event.currentTarget.value = '';
      };

      return h('div', { className: 'ga-page' }, [
        h('style', { key: 'css' }, PAGE_CSS),
        h('h2', { key: 'title', className: 'ga-h' }, t('title')),
        h('p', { key: 'intro', className: 'ga-p' }, t('intro')),
        h('div', { key: 'wall', className: 'ga-section' }, [
          h('div', { key: 'sub', className: 'ga-sub' }, t('wall')),
          h(
            'div',
            { key: 'swatches', className: 'ga-chips' },
            WALL_IDS.map((id) =>
              chip(id, t('wall.' + id), current.wall === id, () => set({ wall: id }), WALLS[id].swatch),
            ),
          ),
          h('div', { key: 'image', className: 'ga-chips' }, [
            h('span', { key: 'pick', className: 'ga-chip' }, [
              t('image.pick'),
              h('input', {
                key: 'file',
                className: 'ga-file',
                type: 'file',
                accept: 'image/*',
                'aria-label': t('image.pick'),
                onChange: onImage,
              }),
            ]),
            current.image === '' ? null : chip('clear', t('image.clear'), false, () => set({ image: '' })),
          ]),
          h('input', {
            key: 'url',
            className: 'ga-input',
            type: 'text',
            spellCheck: false,
            autoComplete: 'off',
            value: current.image.startsWith('data:') ? '' : current.image,
            placeholder: t('image.url'),
            'aria-label': t('image.url'),
            onChange: (event) => set({ image: cleanImage(event.currentTarget.value) }),
          }),
          slider('mask', t('mask'), current.mask, 0, 85, t('pct'), (value) => set({ mask: value })),
          row('video', t('video'), [
            chip('videoToggle', current.video ? t('on') : t('off'), current.video, () =>
              set({ video: !current.video }),
            ),
          ]),
          current.video === false
            ? null
            : h('div', { key: 'videoPick', className: 'ga-chips' }, [
                h('span', { key: 'pick', className: 'ga-chip' }, [
                  t('video.pick'),
                  h('input', {
                    key: 'file',
                    className: 'ga-file',
                    type: 'file',
                    accept: 'video/*',
                    'aria-label': t('video.pick'),
                    onChange: (event) => {
                      const file = event.currentTarget.files && event.currentTarget.files[0];
                      if (file !== undefined && file !== null) {
                        try {
                          set({ video: true, videoUrl: URL.createObjectURL(file) });
                        } catch (error) {
                          /* Blob URLs unavailable: the note tells the user to paste a URL. */
                        }
                      }
                      event.currentTarget.value = '';
                    },
                  }),
                ]),
                current.videoUrl === ''
                  ? null
                  : chip('clearVideo', t('image.clear'), false, () => set({ videoUrl: '' })),
              ]),
          current.video === false
            ? null
            : h('div', { key: 'videoAsset', className: 'ga-chips' }, [
                chip(
                  'videoAssetPick',
                  t('video.asset'),
                  current.videoUrl === 'asset:' + ASSET_VIDEO,
                  () => set({ video: true, videoUrl: 'asset:' + ASSET_VIDEO }),
                ),
                chip('videoFolder', t('video.folder'), false, () => {
                  fetch('/glass-resources/open', { method: 'POST' }).catch(() => {});
                }),
              ]),
          current.video === false
            ? null
            : h('input', {
                key: 'videoUrl',
                className: 'ga-input',
                type: 'text',
                spellCheck: false,
                autoComplete: 'off',
                value: current.videoUrl.startsWith('blob:') || current.videoUrl.startsWith('asset:')
                  ? ''
                  : current.videoUrl,
                placeholder: t('video.url'),
                'aria-label': t('video.url'),
                onChange: (event) => set({ video: true, videoUrl: cleanImage(event.currentTarget.value) }),
              }),
          current.video === false
            ? null
            : h('p', { key: 'videoNote', className: 'ga-note' }, t('video.note')),
          current.video === false
            ? null
            : h('p', { key: 'videoAssetNote', className: 'ga-note' }, t('video.asset.note')),
          videoAssetMissing(current)
            ? h('p', { key: 'videoMissing', className: 'ga-warn' }, t('video.missing'))
            : null,
        ]),
        h('div', { key: 'opacity', className: 'ga-section' }, [
          h('div', { key: 'sub', className: 'ga-sub' }, t('opacity')),
          ...PARTS.map(([id, key]) =>
            slider(id, t(key), current.op[id], 8, 100, t('pct'), (value) => set({ op: { [id]: value } })),
          ),
        ]),
        h('div', { key: 'blur', className: 'ga-section' }, [
          h('div', { key: 'sub', className: 'ga-sub' }, t('blur')),
          ...BLUR_PARTS.map(([id, key]) =>
            slider('blur-' + id, t(key), current.blur[id], 0, 48, t('px'), (value) =>
              set({ blur: { [id]: value } }),
            ),
          ),
        ]),
        h('div', { key: 'text', className: 'ga-section' }, [
          h('div', { key: 'sub', className: 'ga-sub' }, t('text')),
          row('text', t('text'), [
            h('input', {
              key: 'color',
              className: 'ga-color',
              type: 'color',
              value: current.text === '' ? colors.text : current.text,
              'aria-label': t('text'),
              onChange: (event) => set({ text: event.currentTarget.value }),
            }),
            chip('auto', t('auto'), current.text === '', () => set({ text: '' })),
          ]),
        ]),
        h('div', { key: 'account', className: 'ga-section' }, [
          h('div', { key: 'sub', className: 'ga-sub' }, t('account')),
          row('accountName', t('account.name'), [
            h('input', {
              key: 'value',
              className: 'ga-field',
              type: 'text',
              spellCheck: false,
              autoComplete: 'off',
              value: current.accountName,
              placeholder: t('account.name.ph'),
              'aria-label': t('account.name'),
              onChange: (event) => set({ accountName: event.currentTarget.value }),
            }),
          ]),
          row('accountAvatar', t('account.avatar'), [
            h('div', { key: 'stack', className: 'ga-stack' }, [
              h('div', { key: 'actions', className: 'ga-chips' }, [
                h('span', { key: 'pick', className: 'ga-chip' }, [
                  t('account.avatar.pick'),
                  h('input', {
                    key: 'file',
                    className: 'ga-file',
                    type: 'file',
                    accept: 'image/*',
                    'aria-label': t('account.avatar.pick'),
                    onChange: (event) => {
                      const file = event.currentTarget.files && event.currentTarget.files[0];
                      if (file) pickImage(file, (dataUrl) => set({ accountAvatar: cleanImage(dataUrl) }), 256);
                      event.currentTarget.value = '';
                    },
                  }),
                ]),
                current.accountAvatar === ''
                  ? null
                  : chip('clearAvatar', t('image.clear'), false, () => set({ accountAvatar: '' })),
              ]),
              h('input', {
                key: 'value',
                className: 'ga-field',
                type: 'text',
                spellCheck: false,
                autoComplete: 'off',
                value: current.accountAvatar.startsWith('data:') ? '' : current.accountAvatar,
                placeholder: t('account.avatar.ph'),
                'aria-label': t('account.avatar'),
                onChange: (event) => set({ accountAvatar: cleanImage(event.currentTarget.value) }),
              }),
            ]),
          ]),
        ]),
        stored ? null : h('p', { key: 'warn', className: 'ga-warn' }, t('storage')),
        h('div', { key: 'diag', className: 'ga-section' }, [
          h('div', { key: 'sub', className: 'ga-sub' }, t('diag.title')),
          h('div', { key: 'row', className: 'ga-row' }, [
            h('div', { key: 'label', className: 'ga-label' }, t('diag.hint')),
            h(
              'div',
              { key: 'control', className: 'ga-control' },
              chip('scan', t('diag.button'), false, () => setScan(scanOpaque())),
            ),
          ]),
          scan.length === 0
            ? null
            : h(
                'div',
                { key: 'list', className: 'ga-list' },
                scan.map((entry, index) =>
                  h('div', { key: String(index), className: 'ga-item' }, [
                    h('span', { key: 'name', className: 'ga-itemName' }, entry.name),
                    h('span', { key: 'meta', className: 'ga-itemMeta' }, entry.color + ' · ' + entry.size),
                  ]),
                ),
              ),
        ]),
        h('div', { key: 'foot', className: 'ga-foot' }, [
          h('button', { key: 'reset', type: 'button', className: 'ga-link', onClick: () => set(DEFAULTS) }, t('reset')),
        ]),
      ]);
    }

    // #endregion

    return {
      inject: ['slots', 'locale', 'theme'],
      apply(ctx) {
        translate = ctx.locale.bind(NS);
        readScheme = () => {
          const snapshot = ctx.theme.getTheme();
          const active = snapshot !== null && typeof snapshot === 'object' ? snapshot.active : null;
          return active !== null && active !== undefined && active.colorScheme === 'light' ? 'light' : 'dark';
        };
        ctx.effect(() => ctx.locale.register(NS, DICT), 'glass-appearance: dictionaries');

        const wallTag = document.createElement('style');
        const glassTag = document.createElement('style');
        wallTag.setAttribute('data-dsh-glass-wall', '');
        glassTag.setAttribute('data-dsh-glass-layer', '');

        const video = document.createElement('video');
        video.setAttribute('data-dsh-glass-video', '');
        video.setAttribute('aria-hidden', 'true');
        video.muted = true;
        video.loop = true;
        video.autoplay = true;
        video.playsInline = true;

        const syncVideo = (on, src) => {
          if (!on) {
            if (typeof video.pause === 'function') video.pause();
            video.style.display = 'none';
            return;
          }
          if (video.getAttribute('src') !== src) video.setAttribute('src', src);
          video.style.display = 'block';
          // Reuse the wallpaper dim slider: fade the video toward the scheme base color.
          video.style.opacity = String(Math.max(0.12, 1 - (state.mask / 100) * 0.85));
          const played = typeof video.play === 'function' ? video.play() : undefined;
          if (played !== null && played !== undefined && typeof played.catch === 'function') played.catch(() => {});
        };

        let frame = 0;
        let wallKey = '';

        const draw = () => {
          const colors = palette(state);
          const source = resolveSource(state.videoUrl);
          // An `asset:` source only takes over once its HEAD probe confirms the file.
          const available = state.videoUrl.startsWith('asset:')
            ? assetReady(source).ok === true
            : source !== '';
          const videoOn = state.video && available;
          const key =
            state.wall + '|' + colors.scheme + '|' + state.mask + '|' + imageRev + '|' +
            (videoOn ? source : '');
          if (key !== wallKey) {
            wallKey = key;
            wallTag.textContent = wallCss(state, colors, videoOn);
          }
          glassTag.textContent = tokenCss(state, colors);
          syncVideo(videoOn, source);
        };

        const schedule = () => {
          if (frame !== 0) return;
          frame = window.requestAnimationFrame(() => {
            frame = 0;
            draw();
          });
        };

        ctx.effect(() => {
          document.head.append(wallTag, glassTag);
          document.body.appendChild(video);
          draw();
          const off = ctx.on('theme/change', schedule);
          paint = schedule;
          return () => {
            off();
            if (frame !== 0) window.cancelAnimationFrame(frame);
            frame = 0;
            wallKey = '';
            if (paint === schedule) paint = null;
            if (typeof video.pause === 'function') video.pause();
            video.remove();
            wallTag.remove();
            glassTag.remove();
          };
        }, 'glass-appearance: paint');

        ctx.slots.inject('settings.section', () =>
          ctx.slots.register(
            {
              name: 'settings.section',
              id: 'glass-appearance',
              order: 5,
              locale: NS,
              label: () => translate('nav'),
            },
            Page,
          ),
        );
      },
    };
  },
});
