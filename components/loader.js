/**
 * Loader Component
 * Komponen loading screen
 */

export function createLoader() {
  return `
    <div id="shellLoader" class="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[9999] hidden items-center justify-center">
      <div class="flex flex-col items-center gap-3">
        <div class="w-12 h-12 border-4 border-slate-700 border-t-purple-400 rounded-full animate-spin"></div>
        <p class="text-xs font-black tracking-widest text-slate-300">MEMUAT...</p>
      </div>
    </div>
  `;
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
