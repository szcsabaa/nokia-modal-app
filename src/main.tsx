import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import AppLayout from './components/layout/AppLayout.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import BasicExample from "./components/pages/BasicExample.tsx";
import {ModalProvider} from "./context/ModalContext.tsx";
import MultipleModalPage from "./components/pages/MultipleModalPage.tsx";

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
        element: <BasicExample/>,
      },
      {
        path: "/multiple",
        element: <MultipleModalPage/>,
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
    <ModalProvider>
      <RouterProvider router={router}/>
    </ModalProvider>
  </StrictMode>,
)
