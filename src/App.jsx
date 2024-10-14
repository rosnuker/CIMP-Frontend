import { useState } from 'react'
import './css/App.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import AppLayout from './layout/AppLayout';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Receive from './pages/Receive';
import Request from './pages/Request2';
import LogsHistory from './pages/Logs';
import Search from './pages/Search';
import Inventory from './pages/Inventory';
import Filter from "./pages/Filter"
import Pending from "./pages/Pending"
import Approved from "./pages/Approved"
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import { Alert, Snackbar } from '@mui/material';

export default function App() {
  const [ user, setUser ] = useState(null);
  const [snackbarGreenOpen, setSnackbarGreenOpen] = useState(false);
  const [snackbarRedOpen, setSnackbarRedOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    event.stopPropagation();
    setSnackbarGreenOpen(false);
    setSnackbarRedOpen(false);
  };

  function RequireAuth({ children }) {
    return (user !== null && user !== undefined) ? children : <Navigate to="/" replace />;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignIn user={ user } setUser={ setUser } setSnackbarGreenOpen={ setSnackbarGreenOpen } setSnackbarRedOpen={ setSnackbarRedOpen } setSnackbarMessage={ setSnackbarMessage } />,
    },
    {
      path: '/app',
      element: <RequireAuth> <AppLayout user={ user } setUser={ setUser } setSnackbarGreenOpen={ setSnackbarGreenOpen } setSnackbarRedOpen={ setSnackbarRedOpen } setSnackbarMessage={ setSnackbarMessage } /> </RequireAuth>,
      children: [
        {
          index: true,
          element: (
            user && user.type === 'admin' ? (
              <AdminDashboard user={ user } setUser={ setUser } setSnackbarGreenOpen={ setSnackbarGreenOpen } setSnackbarRedOpen={ setSnackbarRedOpen } setSnackbarMessage={ setSnackbarMessage } />
            ) : user && user.type === 'acc_person' ? (
              <UserDashboard user={ user } setUser={ setUser } setSnackbarGreenOpen={ setSnackbarGreenOpen } setSnackbarRedOpen={ setSnackbarRedOpen } setSnackbarMessage={ setSnackbarMessage } />
            ) : (
              <Dashboard user={ user } setUser={ setUser } setSnackbarGreenOpen={ setSnackbarGreenOpen } setSnackbarRedOpen={ setSnackbarRedOpen } setSnackbarMessage={ setSnackbarMessage } />
            )
          ),
        },
        {
          path: '/app/receive',
          element: <Receive user={ user } setUser={ setUser } setSnackbarGreenOpen={ setSnackbarGreenOpen } setSnackbarRedOpen={ setSnackbarRedOpen } setSnackbarMessage={ setSnackbarMessage } />
        },
        {
          path: '/app/request',
          element: <Request user={ user } setUser={ setUser } setSnackbarGreenOpen={ setSnackbarGreenOpen } setSnackbarRedOpen={ setSnackbarRedOpen } setSnackbarMessage={ setSnackbarMessage } />
        },
        {
          path: '/app/logs',
          element: <LogsHistory user={ user } setUser={ setUser } setSnackbarGreenOpen={ setSnackbarGreenOpen } setSnackbarRedOpen={ setSnackbarRedOpen } setSnackbarMessage={ setSnackbarMessage } />
        },
        {
          path: '/app/search',
          element: <Search user={ user } setUser={ setUser } setSnackbarGreenOpen={ setSnackbarGreenOpen } setSnackbarRedOpen={ setSnackbarRedOpen } setSnackbarMessage={ setSnackbarMessage } />
        },
        {
          path: '/app/inventory',
          element: <Inventory user={ user } setUser={ setUser } setSnackbarGreenOpen={ setSnackbarGreenOpen } setSnackbarRedOpen={ setSnackbarRedOpen } setSnackbarMessage={ setSnackbarMessage } />
        },
        {
          path: '/app/filter',
          element: <Filter user={user} setUser={setUser} setSnackbarGreenOpen={ setSnackbarGreenOpen } setSnackbarRedOpen={ setSnackbarRedOpen } setSnackbarMessage={ setSnackbarMessage } />
        },
        {
          path: '/app/pending',
          element: <Pending user={user} setUser={setUser} setSnackbarGreenOpen={ setSnackbarGreenOpen } setSnackbarRedOpen={ setSnackbarRedOpen } setSnackbarMessage={ setSnackbarMessage } />
        },
        {
          path: '/app/approved',
          element: <Approved user={user} setUser={setUser} setSnackbarGreenOpen={ setSnackbarGreenOpen } setSnackbarRedOpen={ setSnackbarRedOpen } setSnackbarMessage={ setSnackbarMessage } />
        }
      ],
    },
  ]);

  return (
    <>
      <Snackbar open={snackbarGreenOpen} autoHideDuration={3500} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={snackbarRedOpen} autoHideDuration={3500} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      
      <RouterProvider router={ router } />
    </>
  );
}
