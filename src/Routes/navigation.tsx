import Dashboard from "../components/dashboard/Dashboard";
import PortfolioManager from "../components/portfolio/PortfolioManager";
import DexExchange from "../components/dex-exchange/DexExchange";
import News from "../components/news/News";
import Profile from "../components/profile/Profile";
import {CoinContainerDescription} from "../components/coin-info/CoinContainerDescription";
import LoginContainer from "../components/login/LoginContainer";
import {ReactComponent as PurchaseIcon} from "../assets/images/header-img/credit-card.svg"
import {ReactComponent as PortfolioIcon} from "../assets/images/header-img/database.svg"
import {ReactComponent as DashboardIcon} from "../assets/images/header-img/delicious.svg"
import {ReactComponent as NewsIcon} from "../assets/images/header-img/newspaper.svg"

//Route navigation map
export const routesNavigation = [
    {path: '/dashboard',      element: <Dashboard/>,                  name: "Dashboard",         icon: DashboardIcon ,   isMenu : true ,     isPrivate : true},
    {path: '/portfolio',      element: <PortfolioManager/>,           name: "Portfolio",         icon: PortfolioIcon ,   isMenu : true ,     isPrivate : true},
    {path: '/dex-exchange',   element: <DexExchange/>,                name: "DEX Exchange",      icon: PurchaseIcon ,    isMenu : true ,     isPrivate : true},
    {path: '/news',           element: <News/>,                       name: "News",              icon: NewsIcon ,        isMenu : true ,     isPrivate : true},
    {path: '/profile',        element: <Profile/>,                    name: "Profile",           icon: "" ,              isMenu : false ,    isPrivate : true},
    {path: '/coin_info/:id?', element: <CoinContainerDescription/>,   name: "Coin Info",         icon: "" ,              isMenu : false ,    isPrivate : true},
    {path: '/login',          element: <LoginContainer/>,             name: "Login",             icon: "" ,              isMenu : false ,    isPrivate : false},
];

