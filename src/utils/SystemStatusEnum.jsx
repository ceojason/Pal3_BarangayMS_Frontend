const SystemStatusEnum = {

  INACTIVE: {
    key: 0,
    dscp: 'Inactive',
    className: 'status_inactive'
  },

  ACTIVE: {
    key: 1,
    dscp: 'Active',
    className: 'status_active'
  },

  UNDER_GRADUATE: {
    key: 2,
    dscp: 'Undergraduate',
    className: 'status_undergraduate'
  },

  GRADUATE: {
    key: 3,
    dscp: 'Graduate',
    className: 'status_graduate'
  },

  LOGGED_IN: {
    key: 4,
    dscp: 'Logged in',
    className: 'status_loggedin'
  },

  LOGGED_OUT: {
    key: 5,
    dscp: 'Logged Out',
    className: 'status_loggedout'
  },

  SENT: {
    key: 6,
    dscp: 'Sent successfully',
    className: 'status_sent'
  },

  NOT_SENT: {
    key: 7,
    dscp: 'Sent error',
    className: 'status_notsent'
  },

  PENDING: {
    key: 8,
    dscp: 'Pending',
    className: 'status_pending'
  },

  PROCESSED: {
    key: 9,
    dscp: 'Processed',
    className: 'status_processed'
  },

  REJECTED: {
    key: 10,
    dscp: 'Rejected',
    className: 'status_rejected'
  },

  IN_PROGRESS: {
    key: 11,
    dscp: 'In Progress',
    className: 'status_processed'
  },

  CLOSED: {
    key: 12,
    dscp: 'Closed',
    className: 'status_sent'
  },

};

export const getSystemStatusByKey = (key) => {

  return Object.values(SystemStatusEnum)
    .find(status => status.key === key);

};

export const getSystemStatusDscp = (key) => {

  const status = getSystemStatusByKey(key);

  return status ? status.dscp : '-';

};

export default SystemStatusEnum;