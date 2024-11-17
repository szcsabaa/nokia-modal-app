import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppLayout from './components/layout/AppLayout.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
      },
      {
        path: "/basic",
        element: <div>Basic modal example</div>,
      },
      {
        path: "/multiple",
        element: <div>Multiple modal example</div>,
      },
      {
        path: "/form",
        element: <div>Form example</div>,
      },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
