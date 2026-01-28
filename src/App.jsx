import React, { useEffect, useContext, Fragment } from 'react';
import Navbar from './components/base/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react';
import StoreContext from './store/StoreContext';
import NoAccessCtr from './components/base/NoAccessCtr/NoAccessCtr';// index.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // includes Popper


const App = observer(() => {
  const { store } = useContext(StoreContext);
  const { SessionStore } = store;

  useEffect(() => {
    SessionStore.fetchUser();
  }, [SessionStore]);

  if (SessionStore.loading) {
    return <></>;
  }

  if (!SessionStore.currentUser) {
    return <NoAccessCtr />;
  }

  return (
    <Fragment>
      <Navbar />
      <main className="container mt-3">
        <Outlet />
      </main>
    </Fragment>
  );
});

export default App;