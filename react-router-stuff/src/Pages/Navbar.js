import Drawer from '@mui/material/Drawer';

import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List'
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MainNavbarItems } from "./navbaritems";
import { useParaams, useNavigate } from "react-router-dom"



export function NavBar(){
    const navigate = useNavigate();
    const drawerWidth = 220;
    return(
        <div>
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: "#35605A",
            color: "white",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {MainNavbarItems.map((items, index) => (
            <ListItem
            button
            key={items.id}
            onClick={()=> navigate(items.route)}
            >
              <ListItemButton>
                <ListItemIcon sx={{color: "#ffffff"}}>
                  {items.icon}
                </ListItemIcon>
                <ListItemText primary={items.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
        </div>

    )
}