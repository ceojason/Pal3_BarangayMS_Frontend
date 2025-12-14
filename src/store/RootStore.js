import DashboardStore from './DashboardStore';
import LoginStore from './LoginStore';
import UserStore from './UserStore';
import StudentEnrollmentStore from './StudentEnrollmentStore';
import SettingsStore from './SettingsStore';
import SessionStore from './SessionStore';
import AdminEnrollmentStore from './AdminEnrollmentStore';






class RootStore {
  constructor() {
    this.AdminEnrollmentStore = new AdminEnrollmentStore();

    this.SessionStore = new SessionStore();

    this.SettingsStore = new SettingsStore();

    this.StudentEnrollmentStore = new StudentEnrollmentStore();

    this.UserStore = new UserStore();
    this.DashboardStore = new DashboardStore();
    this.LoginStore = new LoginStore();
  }
}

const rootStore = new RootStore();
export default rootStore;
