export const usePermissions = () => ({
  permissions: [] as string[],
  permissionsLoaded: true,
  hasPermission: () => true,
  hasAnyPermission: () => true,
  can: () => true,
})
