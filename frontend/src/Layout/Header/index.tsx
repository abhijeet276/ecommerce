import { ReactNavbar } from "overlay-navbar"
import logo from "../../assets/logo/logo.png"
import { useTheme } from "../../contexts/themeContext";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
const Header: React.FC = () => {
  // const { theme,toggleTheme } = useTheme();

  const options = {
    burgerColorHover: "#eb4034",
    logo,
    logoWidth: "20vmax",
    navColor1: "white",
    logoHoverSize: "10px",
    logoHoverColor: "#eb4034",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIcon: true,
    profileIconUrl: "/login",
    ProfileIconElement: MdAccountCircle,
    profileIconColor: "rgba(35, 35, 35,0.8)",
    searchIcon: true,
    SearchIconElement: MdSearch,
    searchIconColor: "rgba(35, 35, 35,0.8)",
    cartIconColor: "rgba(35, 35, 35,0.8)",
    profileIconColorHover: "#eb4034",
    searchIconColorHover: "#eb4034",
    cartIcon: true,
    cartIconColorHover: "#eb4034",
    cartIconMargin: "1vmax",
    CartIconElement: MdAddShoppingCart,
  };
  return (
    <>
      {/* <input
        className="toggle-btn__input"
        type="checkbox"
        name="checkbox"
        onChange={toggleTheme}
        checked={theme === 'light'}
      /> */}
      <ReactNavbar {...options} />
    </>
  );
};

export default Header;