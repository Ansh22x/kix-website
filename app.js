/**
 * Kratos Innovations X (kix) · Interactive Controller
 * Hallmark compliant: progressive enhancement, no forced transitions
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeroConsole();
  initProjectBuilder();
  initCopyButtons();
});

// ==========================================================================
// 1. Hero Console Sandbox
// ==========================================================================
const CONSOLE_DATA = {
  telegram: [
    { tag: '[tg:init]', type: 'accent', text: 'KIX-Telegram-Engine v2.4 initialized' },
    { tag: '[webhook]', type: 'cool', text: 'TLS 1.3 tunnel bound to https://api.kix.dev/tg/webhook' },
    { tag: '[router]', type: 'cool', text: 'Dispatching 14 registered slash commands & inline queries' },
    { tag: '[runtime]', type: 'ok', text: 'Event loop active · Latency: 12ms · Concurrency: 10,000 req/s' },
    { tag: '[status]', type: 'accent', text: 'Ready for user input. Type or click a command below.' }
  ],
  discord: [
    { tag: '[dc:shard]', type: 'accent', text: 'Connecting to Discord Gateway v10 via WebSocket' },
    { tag: '[commands]', type: 'cool', text: 'Synced 18 Application Commands (Guild & Global)' },
    { tag: '[roles]', type: 'cool', text: 'Auto-moderation & role verification listener armed' },
    { tag: '[latency]', type: 'ok', text: 'Heartbeat ping: 18ms · Shard 0/0 operational' },
    { tag: '[ready]', type: 'accent', text: 'Bot logged in as KIX-Sentinel#0001' }
  ],
  software: [
    { tag: '[core:api]', type: 'accent', text: 'Booting async microservice cluster (Python / Node)' },
    { tag: '[db:pool]', type: 'cool', text: 'PostgreSQL connection pool healthy (10/10 active)' },
    { tag: '[cache]', type: 'cool', text: 'Redis key-value store primed · Hit-rate 99.4%' },
    { tag: '[queue]', type: 'ok', text: 'Celery/BullMQ workers idle, awaiting scheduled payloads' },
    { tag: '[metrics]', type: 'accent', text: 'Memory: 42MB · CPU: 0.8% · Zero memory leaks detected' }
  ],
  web: [
    { tag: '[web:ssr]', type: 'accent', text: 'V8 edge runtime ready with HTTP/3 & QUIC support' },
    { tag: '[bundle]', type: 'cool', text: 'CSS tokens compiled · Zero runtime overhead · No slop' },
    { tag: '[audit]', type: 'ok', text: 'Lighthouse score: 100 Performance, 100 Accessibility' },
    { tag: '[ttfb]', type: 'cool', text: 'Edge cache hit · TTFB: 24ms across global nodes' },
    { tag: '[ready]', type: 'accent', text: 'KIX design system verified by UI Lead Abhishek' }
  ]
};

const COMMAND_RESPONSES = {
  '/start': [
    { tag: '[kix:bot]', type: 'accent', text: 'Welcome to Kratos Innovations X (KIX).' },
    { tag: '[info]', type: 'cool', text: 'We build production-ready bots, custom backends, and websites.' },
    { tag: '[action]', type: 'ok', text: 'Contact Founder: @TheDarkKratosX | Engineer: @TheDarkKratos' }
  ],
  '/status': [
    { tag: '[cluster]', type: 'ok', text: 'ALL SYSTEMS NOMINAL · 99.98% uptime in production' },
    { tag: '[load]', type: 'cool', text: 'Active bot instances: 48 · Zero dropped webhook deliveries' },
    { tag: '[gateway]', type: 'cool', text: 'Telegram Bot API: Connected · Discord Gateway: OK' }
  ],
  '/team': [
    { tag: '[founder]', type: 'accent', text: 'Rahul Pachpute · Lead Architect (@TheDarkKratosX)' },
    { tag: '[member]', type: 'cool', text: 'Ansh · Founding Member & Full-Stack Eng (@TheDarkKratos)' },
    { tag: '[designer]', type: 'cool', text: 'Abhishek · Main UI Designer (@Artixtcho)' }
  ],
  '/quote': [
    { tag: '[estimate]', type: 'accent', text: 'Need a bot or software? Check our interactive builder below.' },
    { tag: '[speed]', type: 'ok', text: 'Typical turnaround: Telegram bots (3-5 days), Web (5-10 days)' },
    { tag: '[contact]', type: 'cool', text: 'Direct Telegram line: https://t.me/TheDarkKratosX' }
  ]
};

function initHeroConsole() {
  const tabs = document.querySelectorAll('.tab-btn');
  const logStream = document.getElementById('consoleLogStream');
  const cmdPills = document.querySelectorAll('.cmd-pill');

  if (!logStream) return;

  function renderLines(lines) {
    logStream.innerHTML = '';
    lines.forEach(line => {
      const lineEl = document.createElement('div');
      lineEl.className = 'log-line';

      const tagClass = line.type === 'accent' ? 'log-tag--accent' : line.type === 'ok' ? 'log-tag--ok' : '';
      lineEl.innerHTML = `
        <span class="log-tag ${tagClass}">${escapeHtml(line.tag)}</span>
        <span class="log-text">${escapeHtml(line.text)}</span>
      `;
      logStream.appendChild(lineEl);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      const target = tab.dataset.tab;
      if (CONSOLE_DATA[target]) {
        renderLines(CONSOLE_DATA[target]);
      }
    });
  });

  cmdPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cmd = pill.dataset.cmd;
      if (COMMAND_RESPONSES[cmd]) {
        const customLines = [
          { tag: `[exec:cmd]`, type: 'cool', text: `Executing ${cmd}...` },
          ...COMMAND_RESPONSES[cmd]
        ];
        renderLines(customLines);
      }
    });
  });
}

// ==========================================================================
// 2. Interactive Project Spec Estimator & Direct Telegram Deep-Linking
// ==========================================================================
function initProjectBuilder() {
  const categoryInputs = document.querySelectorAll('input[name="project_category"]');
  const featureCheckboxes = document.querySelectorAll('input[name="feature"]');
  const timelineSelect = document.getElementById('builderTimeline');
  const summaryType = document.getElementById('summaryType');
  const summaryTimeline = document.getElementById('summaryTimeline');
  const summaryFeatures = document.getElementById('summaryFeatures');
  const btnSendRahul = document.getElementById('btnSendRahul');
  const btnSendAnsh = document.getElementById('btnSendAnsh');
  const btnSendAbhishek = document.getElementById('btnSendAbhishek');

  if (!categoryInputs.length) return;

  function updateSpec() {
    let selectedCat = 'Telegram Bot';
    categoryInputs.forEach(input => {
      const parent = input.closest('.choice-card');
      if (input.checked) {
        selectedCat = input.value;
        parent?.classList.add('is-selected');
      } else {
        parent?.classList.remove('is-selected');
      }
    });

    const selectedFeatures = [];
    featureCheckboxes.forEach(cb => {
      const parent = cb.closest('.choice-card');
      if (cb.checked) {
        selectedFeatures.push(cb.value);
        parent?.classList.add('is-selected');
      } else {
        parent?.classList.remove('is-selected');
      }
    });

    const timeline = timelineSelect ? timelineSelect.value : 'Standard (1-2 weeks)';

    if (summaryType) summaryType.textContent = selectedCat;
    if (summaryTimeline) summaryTimeline.textContent = timeline;
    if (summaryFeatures) {
      summaryFeatures.textContent = selectedFeatures.length > 0 
        ? selectedFeatures.join(', ') 
        : 'Core logic only';
    }

    // Build encoded Telegram pre-fill message
    const msg = `Hello KIX Team!\nI have a project inquiry for Kratos Innovations X.\n\nProject Type: ${selectedCat}\nFeatures Needed: ${selectedFeatures.length ? selectedFeatures.join(', ') : 'Base deployment'}\nTarget Timeline: ${timeline}\n\nLet's discuss requirements and kick off the build!`;
    const encoded = encodeURIComponent(msg);

    if (btnSendRahul) btnSendRahul.href = `https://t.me/TheDarkKratosX?text=${encoded}`;
    if (btnSendAnsh) btnSendAnsh.href = `https://t.me/TheDarkKratos?text=${encoded}`;
    if (btnSendAbhishek) btnSendAbhishek.href = `https://t.me/Artixtcho?text=${encoded}`;
  }

  categoryInputs.forEach(input => input.addEventListener('change', updateSpec));
  featureCheckboxes.forEach(cb => cb.addEventListener('change', updateSpec));
  if (timelineSelect) timelineSelect.addEventListener('change', updateSpec);

  // Initial calculation
  updateSpec();
}

// ==========================================================================
// 3. One-Click Copy for Telegram Handles
// ==========================================================================
function initCopyButtons() {
  const copyBtns = document.querySelectorAll('[data-copy-handle]');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const handle = btn.dataset.copyHandle;
      try {
        await navigator.clipboard.writeText(handle);
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.textContent = originalText;
        }, 1800);
      } catch (err) {
        // Fallback: direct window open if copy fails
        window.open(`https://t.me/${handle.replace('@', '')}`, '_blank');
      }
    });
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// ==========================================================================
// 4. Light / Dark Mode Toggle
// ==========================================================================
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  if (!toggleBtn || !themeIcon) return;

  const sunPath = 'M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z';
  const moonPath = 'M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z';

  function updateIcon(mode) {
    if (mode === 'dark') {
      themeIcon.innerHTML = `<path d="${sunPath}"/>`;
      toggleBtn.setAttribute('title', 'Switch to light mode');
    } else {
      themeIcon.innerHTML = `<path d="${moonPath}"/>`;
      toggleBtn.setAttribute('title', 'Switch to dark mode');
    }
  }

  // Initial check
  const currentMode = document.documentElement.dataset.mode || 'light';
  updateIcon(currentMode);

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.mode === 'dark';
    const nextMode = isDark ? 'light' : 'dark';
    
    if (nextMode === 'dark') {
      document.documentElement.dataset.mode = 'dark';
      localStorage.setItem('kix-theme', 'dark');
    } else {
      delete document.documentElement.dataset.mode;
      localStorage.setItem('kix-theme', 'light');
    }
    
    updateIcon(nextMode);
  });
}
