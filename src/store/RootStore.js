import DashboardStore from './DashboardStore';
import LoginStore from './LoginStore';
import UserStore from './UserStore';
import StudentEnrollmentStore from './StudentEnrollmentStore';
import SettingsStore from './SettingsStore';
import SessionStore from './SessionStore';
import AdminEnrollmentStore from './AdminEnrollmentStore';
import UsersStore from './UsersStore';
import NotificationLogsStore from './NotificationLogsStore';
import AnnouncementStore from './AnnouncementStore';







class RootStore {
  constructor() {
    this.AnnouncementStore = new AnnouncementStore();

    this.NotificationLogsStore = new NotificationLogsStore();

    this.AdminEnrollmentStore = new AdminEnrollmentStore();

    this.SessionStore = new SessionStore();

    this.SettingsStore = new SettingsStore();

    this.StudentEnrollmentStore = new StudentEnrollmentStore();

    this.UserStore = new UserStore();
    this.DashboardStore = new DashboardStore();
    this.LoginStore = new LoginStore();
    this.UsersStore = new UsersStore();
  }
}

const rootStore = new RootStore();
export default rootStore;
