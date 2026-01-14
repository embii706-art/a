/**
 * Role Configuration
 * Daftar role yang tersedia dalam sistem
 */

export const ROLES = {
  SUPER_ADMIN: 'superadmin',
  KETUA: 'ketua',
  WAKIL_KETUA: 'wakil-ketua',
  SEKRETARIS: 'sekretaris',
  BENDAHARA: 'bendahara',
  KOORDINATOR: 'koordinator',
  ANGGOTA: 'anggota'
};

export const ROLE_PAGES = {
  [ROLES.SUPER_ADMIN]: 'super-admin.html',
  [ROLES.KETUA]: 'ketua.html',
  [ROLES.WAKIL_KETUA]: 'wakil-ketua.html',
  [ROLES.SEKRETARIS]: 'sekretaris.html',
  [ROLES.BENDAHARA]: 'bendahara.html',
  [ROLES.KOORDINATOR]: 'koordinator.html',
  [ROLES.ANGGOTA]: 'anggota.html'
};

export const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]: 'Super Admin',
  [ROLES.KETUA]: 'Ketua',
  [ROLES.WAKIL_KETUA]: 'Wakil Ketua',
  [ROLES.SEKRETARIS]: 'Sekretaris',
  [ROLES.BENDAHARA]: 'Bendahara',
  [ROLES.KOORDINATOR]: 'Koordinator',
  [ROLES.ANGGOTA]: 'Anggota'
};
