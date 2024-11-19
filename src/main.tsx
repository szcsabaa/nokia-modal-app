import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import AppLayout from './components/layout/AppLayout.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ModalProvider} from "./context/ModalContext.tsx";
import MultipleModalPage from "./components/pages/MultipleModalPage.tsx";
import RegisterPage from "./components/pages/RegisterPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
      },
      {
        path: "/multiple",
        element: <MultipleModalPage/>,
      },
      {
        path: "/form",
        element: <RegisterPage />,
      },
    ]
  },
]);

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <RouterProvider router={router}/>
      </ModalProvider>
    </QueryClientProvider>
  </StrictMode>,
)
