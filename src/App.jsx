import { useState } from 'react'
import './css/App.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import SignIn from './pages/SignIn';
import AppLayout from './layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Receive from './pages/Receive';
import Request from './pages/Request';
import LogsHistory from './pages/Logs';
import Search from './pages/Search';
import Inventory from './pages/Inventory';
import Filter from "./pages/Filter"
import Pending from "./pages/Pending"
import Approved from "./pages/Approved"


export default function App() {
  const [ user, setUser ] = useState(null);

  function RequireAuth({ children }) {
    return user !== null ? children : <Navigate to="/" replace />;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignIn user={ user } setUser={ setUser } />,
    },
    {
      path: '/app',
      element: <RequireAuth> <AppLayout user={ user } setUser={ setUser } /> </RequireAuth>,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: '/app/receive',
          element: <RequireAuth> <Receive user={ user } setUser={ setUser } /> </RequireAuth>
        },
        {
          path: '/app/request',
          element: <RequireAuth> <Request user={ user } setUser={ setUser } /> </RequireAuth>
        },
        {
          path: '/app/logs',
          element: <RequireAuth> <LogsHistory user={ user } setUser={ setUser } /> </RequireAuth>
        },
        {
          path: '/app/search',
          element: <RequireAuth> <Search user={ user } setUser={ setUser } /> </RequireAuth>
        },
        {
          path: '/app/inventory',
          element: <RequireAuth> <Inventory user={ user } setUser={ setUser } /> </RequireAuth>
      },
      {
        path: 'filter',
        element: <RequireAuth> <Filter user={user} setUser={setUser} /> </RequireAuth>
      },
      {
        path: 'pending',
        element: <Pending />
      },
      {
        path: 'approved',
        element: <Approved />
      }
      ],
    },
  ]);

  return (
    <RouterProvider router={ router } />
  );
}
