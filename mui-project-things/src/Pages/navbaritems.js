import HomeIcon from '@mui/icons-material/Home';
import TableChartIcon from '@mui/icons-material/TableChart';
import ForestIcon from '@mui/icons-material/Forest';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Brightness4Icon from '@mui/icons-material/Brightness4';
export const MainNavbarItems = [
    {
        id: 0,
        icon: <HomeIcon/>,
        label: "Home",
        route: "/"

    },
    {
        id: 1,
        icon: <ForestIcon/>,
        label: "Plants",
        route: "/plants"

    },
    {
        id: 2,
        icon: <TableChartIcon/>,
        label: "Table",
        route: "/table"

    },
    {
        id: 3,
        icon: <CalendarMonthIcon/>,
        label: "Calender",
        route: "/calender"

    },
    {
        id: 4,
        icon: <Brightness4Icon/>,
        label: "Dark Mode",
        route: "/dm"
    }
]