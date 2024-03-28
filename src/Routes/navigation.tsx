//ICONS
import {ReactComponent as PurchaseIcon} from "../assets/images/header-img/credit-card.svg"
import {ReactComponent as PortfolioIcon} from "../assets/images/header-img/database.svg"
import {ReactComponent as DashboardIcon} from "../assets/images/header-img/delicious.svg"
import {ReactComponent as NewsIcon} from "../assets/images/header-img/newspaper.svg"
//COMPONENTS
import Dashboard from "../components/dashboard/Dashboard";
import PortfolioManager from "../components/portfolio/PortfolioManager";
import DexExchange from "../components/dex-exchange/DexExchange";
import News from "../components/news/News";
import Profile from "../components/profile/Profile";
import LoginContainer from "../components/login/LoginContainer";
import CoinContainerDescription from "../components/coin-info/CoinContainerDescription";

/**
 * Route navigation map
 */
export const routesNavigation = [
    {path: '/dashboard',      element: <Dashboard/>,                  name: "Dashboard",         icon: DashboardIcon ,   isMenu : true ,     isPrivate : true},
    {path: '/portfolio',      element: <PortfolioManager/>,           name: "Portfolio",         icon: PortfolioIcon ,   isMenu : true ,     isPrivate : true},
    {path: '/dex-exchange',   element: <DexExchange/>,                name: "DEX Exchange",      icon: PurchaseIcon ,    isMenu : true ,     isPrivate : true},
    {path: '/news',           element: <News/>,                       name: "News",              icon: NewsIcon ,        isMenu : true ,     isPrivate : true},
    {path: '/profile',        element: <Profile/>,                    name: "Profile",           icon: "" ,              isMenu : false ,    isPrivate : true},
    {path: '/coin_info/:id?', element: <CoinContainerDescription/>,   name: "Coin Info",         icon: "" ,              isMenu : false ,    isPrivate : true},
    {path: '/login',          element: <LoginContainer/>,             name: "Login",             icon: "" ,              isMenu : false ,    isPrivate : false},
];

/**
 * Routes Navigation Explanation:
 * - Dashboard    :     Represents the dashboard page where users can view various metrics and data.
 * - Portfolio    :     Allows users to manage their investment portfolios, tracking their assets and performance.
 * - Dex-exchange :     Provides access to a decentralized exchange platform for cryptocurrency trading.
 * - News         :     Displays news articles and updates related to the cryptocurrency market and industry.
 * - Profile      :     Enables users to view and edit their personal profile and account settings.
 * - Coin_info    :     Offers detailed information about a specific cryptocurrency, including price, charts, and other relevant data.
 * - Login        :     Provides a login page for users to authenticate and access secured features of the application.
 */
