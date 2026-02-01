import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import StoreContext from '../../store/StoreContext';
import NoAccessCtr from '../base/NoAccessCtr/NoAccessCtr';

const PermissionRoute = observer(({ permission, children }) => {
  const { store } = useContext(StoreContext);
  const { SessionStore } = store;

  if (SessionStore.loading) return null;

  if (!SessionStore.currentUser) {
    return <NoAccessCtr />;
  }

  if (!SessionStore.hasPermission(permission)) {
    return <NoAccessCtr showRedirectToLogin={false} />;
  }

  return children;
});

export default PermissionRoute;
