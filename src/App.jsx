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

export default function App() {
  const [ user, setUser ] = useState(null);

  function RequireAuth({ children }) {
    return (user !== null && user !== undefined) ? children : <Navigate to="/" replace />;
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
          element: <Dashboard user={ user } setUser={ setUser } />,
        },
        {
          path: '/app/receive',
          element: <Receive user={ user } setUser={ setUser } />
        },
        {
          path: '/app/request',
          element: <Request user={ user } setUser={ setUser } />
        },
        {
          path: '/app/logs',
          element: <LogsHistory user={ user } setUser={ setUser } />
        },
        {
          path: '/app/search',
          element: <Search user={ user } setUser={ setUser } />
        },
        {
          path: '/app/inventory',
          element: <Inventory user={ user } setUser={ setUser } />
        },
        {
          path: '/app/filter',
          element: <Filter user={user} setUser={setUser} />
        },
        {
          path: '/app/pending',
          element: <Pending user={user} setUser={setUser} />
        },
        {
          path: '/app/approved',
          element: <Approved user={user} setUser={setUser} />
        }
      ],
    },
  ]);

  return (
    <RouterProvider router={ router } />
  );
}
