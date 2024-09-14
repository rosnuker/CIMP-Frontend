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
          element: <Receive />,
        },
        {
          path: '/app/request',
          element: <Request />,
        },
        {
          path: '/app/logs',
          element: <LogsHistory />,
        },
        {
          path: '/app/search',
          element: <Search />
        },
        {
          path: '/app/inventory',
          element: <RequireAuth> <Inventory user={ user } setUser={ setUser } /> </RequireAuth>
      },
      {
        path: 'filter',
        element: <RequireAuth> <Filter user={user} setUser={setUser} /> </RequireAuth>
      },
      ],
    },
  ]);

  return (
    <RouterProvider router={ router } />
  );
}
