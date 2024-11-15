import HomeIcon from '@mui/icons-material/Home';
import TableChartIcon from '@mui/icons-material/TableChart';
import ForestIcon from '@mui/icons-material/Forest';
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

    }
]