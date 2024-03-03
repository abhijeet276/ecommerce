import { Navigate } from "react-router-dom";
import Footer from "./Footer"
import Header from "./Header"
import { useAppSelector } from "../redux/hooks";
export interface ILayout {
  children: React.ReactNode
}
const Layout: React.FC<ILayout> = ({ children }) => {
  const {isAuthenticated} = useAppSelector(state=>state.user);
  return <>
    {isAuthenticated ?
      <>
        <Header />
        {children}
        <Footer />
      </>
      :
      <Navigate to="/login" replace />
    }
  </>

}

export default Layout