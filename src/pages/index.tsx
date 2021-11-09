import { ReactElement } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import {
	Link as RouterLink,
	Outlet,
	useMatch,
} from "react-router-dom";
import { plugins } from "../app";

const drawerWidth = 400;

export default function Index(): ReactElement {
	const { params } = useMatch("/:id");

	return <Box sx={{ height: 1, display: "flex" }}>
		<CssBaseline />
		<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			<Toolbar>
				<Typography variant="h6" noWrap component="div">
                    DevEx+
				</Typography>
			</Toolbar>
		</AppBar>
		<Drawer
			variant="permanent"
			anchor="left"
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				["& .MuiDrawer-paper"]: { width: drawerWidth, boxSizing: "border-box" },
			}}
		>
			<Toolbar />
			<List>
				{Object.entries(plugins).map(([key, plugin]) => {
					return <ListItemButton key={key} component={RouterLink} to={key} selected={params.id === key}>
						<ListItemIcon>
							{plugin.icon}
						</ListItemIcon>
						<ListItemText primary={plugin.name} />
					</ListItemButton>;
				})}
			</List>
		</Drawer>
		<Box component="main" sx={{ height: 1, flexGrow: 1, p: 3 }}>
			<Toolbar />
			<Outlet />
		</Box>
	</Box>;
}
