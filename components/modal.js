/**
 * Modal Component
 * Komponen modal dialog
 */

/**
 * Create modal
 * @param {Object} options - Modal options
 * @returns {HTMLElement} Modal element
 */
export function createModal(options = {}) {
  const {
    id = 'modal',
    title = 'Modal',
    content = '',
    showFooter = true,
    confirmText = 'Konfirmasi',
    cancelText = 'Batal',
    size = 'md' // sm, md, lg, xl
  } = options;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  const modal = document.createElement('div');
  modal.id = id;
  modal.className = 'fixed inset-0 z-[9999] hidden items-center justify-center bg-black/50 backdrop-blur-sm';
  modal.innerHTML = `
    <div class="modal-content w-full ${sizeClasses[size]} mx-4 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl transform transition-all">
      <div class="modal-header flex items-center justify-between p-4 border-b border-white/10">
        <h3 class="text-lg font-bold text-white">${title}</h3>
        <button class="modal-close w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
          <span class="material-symbols-rounded text-slate-300">close</span>
        </button>
      </div>
      
      <div class="modal-body p-4">
        ${content}
      </div>
      
      ${showFooter ? `
        <div class="modal-footer flex items-center justify-end gap-2 p-4 border-t border-white/10">
          <button class="modal-cancel px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-sm font-bold text-slate-300 hover:bg-white/20 transition">
            ${cancelText}
          </button>
          <button class="modal-confirm px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white hover:opacity-90 transition">
            ${confirmText}
          </button>
        </div>
      ` : ''}
    </div>
  `;

  document.body.appendChild(modal);

  // Event listeners
  const closeButtons = modal.querySelectorAll('.modal-close, .modal-cancel');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => hideModal(id));
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal(id);
  });

  return modal;
}

/**
 * Show modal
 * @param {string} id - Modal ID
 */
export function showModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Hide modal
 * @param {string} id - Modal ID
 */
export function hideModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

/**
 * Update modal content
 * @param {string} id - Modal ID
 * @param {string} content - New content
 */
export function updateModalContent(id, content) {
  const modal = document.getElementById(id);
  if (modal) {
    const body = modal.querySelector('.modal-body');
    if (body) body.innerHTML = content;
  }
}

/**
 * Confirm dialog
 * @param {Object} options - Dialog options
 * @returns {Promise<boolean>} User response
 */
export function confirmDialog(options = {}) {
  const {
    title = 'Konfirmasi',
    message = 'Apakah Anda yakin?',
    confirmText = 'Ya',
    cancelText = 'Tidak'
  } = options;

  return new Promise((resolve) => {
    const modal = createModal({
      id: 'confirmDialog',
      title,
      content: `<p class="text-slate-300">${message}</p>`,
      confirmText,
      cancelText
    });

    const confirmBtn = modal.querySelector('.modal-confirm');
    const cancelBtn = modal.querySelector('.modal-cancel');

    confirmBtn.addEventListener('click', () => {
      hideModal('confirmDialog');
      modal.remove();
      resolve(true);
    });

    cancelBtn.addEventListener('click', () => {
      hideModal('confirmDialog');
      modal.remove();
      resolve(false);
    });

    showModal('confirmDialog');
  });
}

/**
 * Alert dialog
 * @param {Object} options - Dialog options
 * @returns {Promise<void>}
 */
export function alertDialog(options = {}) {
  const {
    title = 'Pemberitahuan',
    message = '',
    okText = 'OK'
  } = options;

  return new Promise((resolve) => {
    const modal = createModal({
      id: 'alertDialog',
      title,
      content: `<p class="text-slate-300">${message}</p>`,
      confirmText: okText,
      showFooter: true
    });

    // Hide cancel button
    const cancelBtn = modal.querySelector('.modal-cancel');
    if (cancelBtn) cancelBtn.style.display = 'none';

    const confirmBtn = modal.querySelector('.modal-confirm');
    confirmBtn.addEventListener('click', () => {
      hideModal('alertDialog');
      modal.remove();
      resolve();
    });

    showModal('alertDialog');
  });
}
