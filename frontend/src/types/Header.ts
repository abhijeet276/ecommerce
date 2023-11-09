export interface IHeaderBar{
    burgerColor:string,
    burgerColorHover:string
    logo: {url:string}[],
    logoWidth:string
    navColor1:string
    logoHoverSize:string
    logoHoverColor:string
    // link1Text:{url:string}
    // link2Text="URL"
    // link3Text="Contact"
    // link4Text="About"
    // link1Url="/"
    // link2Url="/product"
    // link3Url="/Contact"
    // link4Url="/about"
    link1Size:string
    link1Color:string
    nav1justifyContent:string
    nav2justifyContent:string
    nav3justifyContent:string
    nav4justifyContent:string
    link1ColorHover:string
    link1Margin:string
    profileIconColor:string
    searchIconColor:string
    cartIconColor:string
    profileIconColorHover:string
    searchIconColorHover:string
    cartIconColorHover:string
    cartIconMargin:string
}
export interface IHeaderBars{
    Header:IHeaderBar
    }