import React from 'react';
import App from './App.jsx';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginMainCtr from './containers/Login/LoginMainCtr.jsx';
import MyAdminDashboardMainCtr from './containers/MyAdminDashboard/MyAdminDashboardMainCtr.jsx';
import SearchStudentMainCtr from './containers/SearchStudent/SearchStudentMainCtr.jsx';
import AddStudentMainCtr from './containers/AddStudent/AddStudentMainCtr.jsx';
import AddAdminMainCtr from './containers/AddAdmin/AddAdminMainCtr.jsx';
import AddUsersMainCtr from './containers/AddUsers/AddUsersMainCtr.jsx';
import SearchUsersMainCtr from './containers/SearchUsers/SearchUsersMainCtr.jsx';
import NotificationLogsMainCtr from './containers/NotificationLogs/NotificationLogsMainCtr.jsx';
import AddAnnouncementMainCtr from './containers/AddAnnouncement/AddAnnouncementMainCtr.jsx';
import SearchAnnouncementMainCtr from './containers/SearchAnnouncement/SearchAnnouncementMainCtr.jsx';
import MyProfileMainCtr from './containers/MyProfile/MyProfileMainCtr.jsx';
import AnnouncementLogsMainCtr from './containers/AnnouncementLogs/AnnouncementLogsMainCtr.jsx';
import DocumentRequestMainCtr from './containers/DocumentRequest/DocumentRequestMainCtr.jsx';
import DocumentRequestsInquiryMainCtr from './containers/DocumentRequestsInquiry/DocumentRequestsInquiryMainCtr.jsx';
import RejectDocumentRequestsInquiryMainCtr from './containers/RejectDocumentRequestsInquiry/RejectDocumentRequestsInquiryMainCtr.jsx';
import DocumentHistoryMainCtr from './containers/DocumentHistory/DocumentHistoryMainCtr.jsx';
import PermissionRoute from './components/Routes/PermissionRoute.jsx';
import Permissions from './constants/others/Permissions.js';


const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginMainCtr /> },

  {
    path: '/',
    element: <App />,
    children: [
      // 🔹 BOTH
      {
        path: 'dashboard',
        element: (
          <PermissionRoute permission={Permissions.DASHBOARD}>
            <MyAdminDashboardMainCtr />
          </PermissionRoute>
        ),
      },

      // 🔹 ADMIN
      {
        path: 'usersAdd',
        element: (
          <PermissionRoute permission={Permissions.USERS_ADD}>
            <AddUsersMainCtr />
          </PermissionRoute>
        ),
      },
      {
        path: 'usersSearch',
        element: (
          <PermissionRoute permission={Permissions.USERS_VIEW}>
            <SearchUsersMainCtr />
          </PermissionRoute>
        ),
      },
      {
        path: 'notificationLogs',
        element: (
          <PermissionRoute permission={Permissions.VIEW_NOTIFICATION_LOGS}>
            <NotificationLogsMainCtr />
          </PermissionRoute>
        ),
      },
      {
        path: 'announcementAdd',
        element: (
          <PermissionRoute permission={Permissions.ANNOUNCEMENT_ADD}>
            <AddAnnouncementMainCtr />
          </PermissionRoute>
        ),
      },
      {
        path: 'announcementSearch',
        element: (
          <PermissionRoute permission={Permissions.ANNOUNCEMENT_VIEW}>
            <SearchAnnouncementMainCtr />
          </PermissionRoute>
        ),
      },

      // 🔹 BOTH
      {
        path: 'myProfile',
        element: (
          <PermissionRoute permission={Permissions.MY_PROFILE}>
            <MyProfileMainCtr />
          </PermissionRoute>
        ),
      },

      // 🔹 RESIDENT
      {
        path: 'announcementLogs',
        element: (
          <PermissionRoute permission={Permissions.ANNOUNCEMENT_HISTORY}>
            <AnnouncementLogsMainCtr />
          </PermissionRoute>
        ),
      },
      {
        path: 'documentRequest',
        element: (
          <PermissionRoute permission={Permissions.REQUEST_DOCUMENT}>
            <DocumentRequestMainCtr />
          </PermissionRoute>
        ),
      },
      {
        path: 'viewDocumentRequests',
        element: (
          <PermissionRoute permission={Permissions.VIEW_DOCUMENT_REQUESTS}>
            <DocumentRequestsInquiryMainCtr />
          </PermissionRoute>
        ),
      },
      {
        path: 'documentHistory',
        element: (
          <PermissionRoute permission={Permissions.REQUEST_DOCUMENT_HISTORY}>
            <DocumentHistoryMainCtr />
          </PermissionRoute>
        ),
      },

      // 🔹 BOTH (if intentional)
      {
        path: 'rejectedDocumentRequests',
        element: (
          <PermissionRoute permission={Permissions.VIEW_DOCUMENT_REQUESTS}>
            <RejectDocumentRequestsInquiryMainCtr />
          </PermissionRoute>
        ),
      },
    ],
  },
]);

export default router;