import Permissions from './Permissions';

const RolePermissions = {
  2: [
    Permissions.USERS_VIEW,
    Permissions.USERS_ADD,
    Permissions.ANNOUNCEMENT_VIEW,
    Permissions.ANNOUNCEMENT_ADD,
    Permissions.PROCESS_DOCUMENT_REQUESTS,
    Permissions.VIEW_DOCUMENT_REQUESTS,
    Permissions.VIEW_NOTIFICATION_LOGS,
    Permissions.MY_PROFILE,
    Permissions.DASHBOARD,
  ],

  3: [
    Permissions.MY_PROFILE,
    Permissions.REQUEST_DOCUMENT,
    Permissions.REQUEST_DOCUMENT_HISTORY,
    Permissions.ANNOUNCEMENT_HISTORY,
    Permissions.DASHBOARD,
  ],
};

export default RolePermissions;