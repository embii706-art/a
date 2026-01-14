/**
 * Theme Management
 * Utilities untuk mengelola tema dark/light
 */

const THEME_KEY = 'kte_theme';

/**
 * Get current theme
 * @returns {string} Current theme ('light' or 'dark')
 */
export function getCurrentTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return saved;
  
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

/**
 * Set theme
 * @param {string} theme - Theme to set ('light' or 'dark')
 */
export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

/**
 * Toggle theme
 * @returns {string} New theme
 */
export function toggleTheme() {
  const current = getCurrentTheme();
  const newTheme = current === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  return newTheme;
}

/**
 * Initialize theme on page load
 */
export function initTheme() {
  const theme = getCurrentTheme();
  setTheme(theme);
}

// Auto-initialize theme before paint
(function() {
  const theme = getCurrentTheme();
  document.documentElement.setAttribute('data-theme', theme);
})();
