/**
 * General Utilities
 * Helper functions umum untuk aplikasi
 */

/**
 * Format currency to Indonesian Rupiah
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}

/**
 * Format date to Indonesian locale
 * @param {Date|string} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('id-ID', { ...defaultOptions, ...options }).format(dateObj);
}

/**
 * Format datetime to Indonesian locale
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted datetime
 */
export function formatDateTime(date) {
  return formatDate(date, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type (success, error, info, warning)
 * @param {number} duration - Duration in milliseconds
 */
export function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  };
  
  toast.className = `fixed top-4 right-4 ${colors[type] || colors.info} text-white px-6 py-3 rounded-xl shadow-lg z-[10000] animate-slide-in-right`;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slide-out-right 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * Show loader
 */
export function showLoader() {
  const loader = document.getElementById('shellLoader');
  if (loader) {
    loader.classList.remove('hidden');
    loader.classList.add('flex');
  }
}

/**
 * Hide loader
 */
export function hideLoader() {
  const loader = document.getElementById('shellLoader');
  if (loader) {
    loader.classList.add('hidden');
    loader.classList.remove('flex');
  }
}

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate text
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text
 */
export function truncate(text, length = 50) {
  if (text.length <= length) return text;
  return text.substr(0, length) + '...';
}

/**
 * Get URL parameters
 * @param {string} param - Parameter name
 * @returns {string|null} Parameter value
 */
export function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<void>}
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Teks berhasil disalin', 'success');
  } catch (error) {
    console.error('Failed to copy:', error);
    showToast('Gagal menyalin teks', 'error');
  }
}
