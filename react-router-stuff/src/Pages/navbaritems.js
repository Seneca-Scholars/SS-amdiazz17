import HomeIcon from '@mui/icons-material/Home';

import MapIcon from '@mui/icons-material/Map';
import TableChartIcon from '@mui/icons-material/TableChart';
export const MainNavbarItems = [
    {
        id: 0,
        icon: <HomeIcon/>,
        label: "Home",
        route: "/home"

    },
    {
        id: 1,
        icon: <MapIcon/>,
        label: "Map",
        route: "/map"

    },
    {
        id: 2,
        icon: <TableChartIcon/>,
        label: "Table",
        route: "/table"

    }
]