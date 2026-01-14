/**
 * Toast Component
 * Komponen notifikasi toast
 */

const toastContainer = (() => {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-4 right-4 z-[10000] flex flex-col gap-2';
    document.body.appendChild(container);
  }
  return container;
})();

/**
 * Show toast notification
 * @param {Object} options - Toast options
 */
export function showToast(options = {}) {
  const {
    message = '',
    type = 'info', // success, error, info, warning
    duration = 3000,
    icon = null
  } = typeof options === 'string' ? { message: options } : options;

  const toast = document.createElement('div');
  
  const colors = {
    success: 'bg-green-500 border-green-400',
    error: 'bg-red-500 border-red-400',
    info: 'bg-blue-500 border-blue-400',
    warning: 'bg-yellow-500 border-yellow-400'
  };

  const icons = {
    success: 'check_circle',
    error: 'error',
    info: 'info',
    warning: 'warning'
  };

  toast.className = `${colors[type] || colors.info} text-white px-4 py-3 rounded-xl shadow-lg border flex items-center gap-2 animate-slide-in-right min-w-[250px] max-w-md`;
  
  toast.innerHTML = `
    ${icon || icons[type] ? `<span class="material-symbols-rounded">${icon || icons[type]}</span>` : ''}
    <span class="flex-1 text-sm font-semibold">${message}</span>
    <button class="toast-close ml-2 w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition">
      <span class="material-symbols-rounded text-sm">close</span>
    </button>
  `;

  const container = toastContainer;
  container.appendChild(toast);

  // Close button
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => removeToast(toast));

  // Auto remove
  setTimeout(() => removeToast(toast), duration);
}

/**
 * Remove toast
 * @param {HTMLElement} toast - Toast element
 */
function removeToast(toast) {
  toast.style.animation = 'slide-out-right 0.3s ease-out';
  setTimeout(() => toast.remove(), 300);
}

/**
 * Success toast
 * @param {string} message - Toast message
 */
export function toastSuccess(message) {
  showToast({ message, type: 'success' });
}

/**
 * Error toast
 * @param {string} message - Toast message
 */
export function toastError(message) {
  showToast({ message, type: 'error' });
}

/**
 * Info toast
 * @param {string} message - Toast message
 */
export function toastInfo(message) {
  showToast({ message, type: 'info' });
}

/**
 * Warning toast
 * @param {string} message - Toast message
 */
export function toastWarning(message) {
  showToast({ message, type: 'warning' });
}
