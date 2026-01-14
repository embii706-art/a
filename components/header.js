/**
 * Header Component
 * Komponen header dengan logo dan navigasi
 */

/**
 * Create header component
 * @param {Object} options - Header options
 * @returns {string} HTML string
 */
export function createHeader(options = {}) {
  const {
    title = 'KARTEJI',
    subtitle = '',
    showLogout = true,
    showThemeToggle = true,
    role = ''
  } = options;

  return `
    <div class="h-14 px-4 flex items-center justify-between border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
      <div class="flex items-center gap-2">
        <div class="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
          <span class="material-symbols-rounded text-purple-300">diversity_3</span>
        </div>
        <div>
          <p class="text-[10px] font-black tracking-[0.25em] text-slate-300 uppercase">${title}</p>
          ${role ? `<p id="roleLabel" class="text-xs font-black text-slate-200">${role}</p>` : ''}
        </div>
      </div>
      
      <div class="flex items-center gap-2">
        ${showThemeToggle ? `
          <button id="btnThemeToggle" class="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center active:scale-95 transition">
            <span class="material-symbols-rounded text-slate-300" id="themeIcon">dark_mode</span>
          </button>
        ` : ''}
        
        ${showLogout ? `
          <button id="btnLogout" class="text-xs font-black bg-white/10 border border-white/10 px-3 py-2 rounded-xl active:scale-95 hover:bg-white/20 transition">
            Keluar
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

/**
 * Initialize header events
 */
export function initHeaderEvents(onLogout) {
  const btnLogout = document.getElementById('btnLogout');
  const btnThemeToggle = document.getElementById('btnThemeToggle');
  
  if (btnLogout && onLogout) {
    btnLogout.addEventListener('click', onLogout);
  }
  
  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('kte_theme', newTheme);
      
      const icon = document.getElementById('themeIcon');
      if (icon) {
        icon.textContent = newTheme === 'dark' ? 'dark_mode' : 'light_mode';
      }
    });
  }
}
