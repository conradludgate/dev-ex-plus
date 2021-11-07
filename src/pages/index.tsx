import { ReactElement } from "react";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from "@mui/material/Drawer";
import {
    Link as RouterLink,
    Outlet,
} from 'react-router-dom';
import { plugins } from "../app";

const drawerWidth = 400;

export default function Index(): ReactElement {
    return <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Clipped drawer
                </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <List>
                {plugins.map((plugin) => {
                    return <ListItem key={plugin.id}>
                        <ListItemButton component={RouterLink} to={plugin.id}>
                            <ListItemIcon>
                                {plugin.icon}
                            </ListItemIcon>
                            <ListItemText primary={plugin.name} />
                        </ListItemButton>
                    </ListItem>
                })}
            </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Outlet />
        </Box>
    </Box>;
}
