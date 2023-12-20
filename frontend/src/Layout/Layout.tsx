import Header from "../components/header/Header"
import Footer from "./Footer"
export interface ILayout {
  children: React.ReactNode
}
const Layout: React.FC<ILayout> = ({ children }) => {
  return <>
    <Header />
    {children}
    <Footer />
  </>

}

export default Layout