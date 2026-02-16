export enum Bundle {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest',
}

export enum Permission {
  IS_ADMIN = 'is_admin',
  IS_USER = 'is_user',
  IS_GUEST = 'is_guest',
  VIEW_DASHBOARD = 'view_dashboard',
  VIEW_PROFILE = 'view_profile',
  EDIT_PROFILE = 'edit_profile',
  DELETE_PROFILE = 'delete_profile',
}

export const BundlePermissions: Record<Bundle, Permission[]> = {
  [Bundle.ADMIN]: Object.values(Permission),
  [Bundle.USER]: [
    Permission.IS_USER,
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_PROFILE,
    Permission.EDIT_PROFILE,
  ],
  [Bundle.GUEST]: [Permission.IS_GUEST, Permission.VIEW_DASHBOARD],
};
