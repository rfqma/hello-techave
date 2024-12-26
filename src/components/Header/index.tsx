"use client";

import * as React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

interface MenuProps {
  label: string;
  path: string;
}

const menus: MenuProps[] = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Form", path: "/form" },
];

const drawerWidth = 240;

export default function DrawerAppBar(props: Props) {
  const pathname = usePathname();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "start" }}>
      <Typography variant="h6" sx={{ my: 2, ml: 2 }}>
        Profile App
      </Typography>
      <Divider />
      <List>
        {menus.map((item) => (
          <Link key={item.label} href={item.path}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  textAlign: "start",
                  color: item.path === pathname ? "#275fa4" : "#303030",
                  ":hover": {
                    color: "#275fa4",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar sx={{ bgcolor: "#275fa4" }} component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Profile App
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "row",
              gap: 1,
            }}
          >
            {menus.map((item) => (
              <Link key={item.label} href={item.path}>
                <Button
                  key={item.label}
                  sx={{
                    color: item.path === pathname ? "#275fa4" : "#fff",
                    bgcolor: item.path === pathname ? "white" : "transparent",
                    ":hover": {
                      color: "#275fa4",
                      bgcolor: "white",
                    },
                  }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        {/* <Toolbar /> */}
      </Box>
    </Box>
  );
}
