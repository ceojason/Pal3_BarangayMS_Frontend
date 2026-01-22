import React from 'react';
import App from './App.jsx';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginMainCtr from './containers/Login/LoginMainCtr.jsx';
import MyAdminDashboardMainCtr from './containers/MyAdminDashboard/MyAdminDashboardMainCtr.jsx';
import MyProfileMainCtr from './containers/MyProfile/MyProfileMainCtr.jsx';
import SearchStudentMainCtr from './containers/SearchStudent/SearchStudentMainCtr.jsx';
import AddStudentMainCtr from './containers/AddStudent/AddStudentMainCtr.jsx';
import AddAdminMainCtr from './containers/AddAdmin/AddAdminMainCtr.jsx';
import AddUsersMainCtr from './containers/AddUsers/AddUsersMainCtr.jsx';
import SearchUsersMainCtr from './containers/SearchUsers/SearchUsersMainCtr.jsx';
import NotificationLogsMainCtr from './containers/NotificationLogs/NotificationLogsMainCtr.jsx';
import AddAnnouncementMainCtr from './containers/AddAnnouncement/AddAnnouncementMainCtr.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <LoginMainCtr />,
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'studentAdd',
        element: <AddStudentMainCtr />,
      },
      {
        path: 'studentSearch',
        element: <SearchStudentMainCtr />,
      },
      {
        path: 'dashboard',
        element: <MyAdminDashboardMainCtr />,
      },
      {
        path: 'myProfile',
        element: <MyProfileMainCtr />,
      },
      {
        path: 'adminAdd',
        element: <AddAdminMainCtr />,
      },
      {
              path: 'usersAdd',
              element: <AddUsersMainCtr />,
            },
      {
              path: 'usersSearch',
              element: <SearchUsersMainCtr />,
            },
      {
              path: 'notificationLogs',
              element: <NotificationLogsMainCtr />,
            },
      {
              path: 'announcementAdd',
              element: <AddAnnouncementMainCtr />,
            },
    ],
  }
]);

export default router;