import React, { useEffect, useContext, Fragment } from 'react';
import Navbar from './components/base/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react'; // Needed for reactivity
import StoreContext from './store/StoreContext'; // Adjust path as needed
import NoAccessCtr from './components/base/NoAccessCtr/NoAccessCtr';

const App = observer(() => {
  const { store } = useContext(StoreContext); // Access MobX stores
  const { SessionStore } = store;

  useEffect(() => {
    SessionStore.fetchUser(); // Call your API method here
  }, [SessionStore]);

  if (SessionStore.loading) {
    return <></>;
  }else{
    if (SessionStore.currentUser==null || SessionStore.currentUser==undefined) {
      return <NoAccessCtr />;
    }
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