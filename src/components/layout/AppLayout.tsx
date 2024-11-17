import Header from "./Header.tsx";
import Content from "./Content.tsx";
import Footer from "./Footer.tsx";
import {Outlet} from "react-router-dom";

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <Content>
        <Outlet />
      </Content>
      <Footer/>
    </div>
  )
}

export default AppLayout
