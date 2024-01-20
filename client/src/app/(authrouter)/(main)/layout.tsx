"use client";
// import { UserAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RestoreIcon from "@mui/icons-material/Restore";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import { usePathname } from "next/navigation";

import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, Button } from "@mui/material";
import { MqttContextProvider } from "@/contexts/MqttContext";
import { DashboardContextProvider } from "@/contexts/DashboardContext";
import { AuthContext } from "@/contexts/AuthContext";
import { ControlContextProvider } from "@/contexts/ControlContext";
const AppBarItems = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    route: "/dashboard",
  },
  {
    name: "Profile",
    icon: <AccountCircleIcon />,
    route: "/profile",
  },
  {
    name: "History",
    icon: <RestoreIcon />,
    route: "/history",
  },
  {
    name: "Control",
    icon: <ControlCameraIcon />,
    route: "/control",
  },
];

function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout, user } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(AppBarItems.findIndex((item) => item.route === pathname));
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <MqttContextProvider>
      <DashboardContextProvider>
        <ControlContextProvider>
          <div className=" flex flex-col h-screen w-screen">
            <AppBar
              position="fixed"
              sx={{
                backgroundColor: "#00DD00",
                padding: "0.5rem 0 0.5rem 0 ",
                height: "3.5rem",
              }}
            >
              <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                  <MenuIcon />
                </IconButton>
                <Typography className="ml-3" variant="h6">
                  {AppBarItems[selectedIndex].name}
                </Typography>
                <Typography style={{ flexGrow: 1 }} />

                <Typography className="text-xl select-none font-bold text-white ">Hello, {user?.username}</Typography>
              </Toolbar>
            </AppBar>
            <Drawer
              open={drawerOpen}
              onClose={handleDrawerToggle}
              PaperProps={{
                style: {
                  width: "20%",
                  minWidth: "300px",
                  maxWidth: "800px",
                  padding: "2.5rem 0 0 0",
                },
              }}
            >
              <List
                className="mt-10 flex flex-col 
justify-between h-full
"
                style={{
                  padding: "0px",
                }}
              >
                <div>
                  {AppBarItems.map((item, index) => (
                    <ListItem
                      key={index}
                      className="cursor-pointer select-none transition-all"
                      onClick={() => {
                        setSelectedIndex(index);
                        handleDrawerToggle();
                        router.push(item.route);
                      }}
                      style={{
                        backgroundColor: selectedIndex == index ? "#22c55e" : "transparent",
                        color: selectedIndex == index ? "white" : "black",
                        padding: "1rem",
                      }}
                    >
                      <ListItemIcon
                        style={{
                          color: selectedIndex == index ? "white" : "black",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItem>
                  ))}
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    borderRadius: "0px",
                    backgroundColor: "#22c55e",
                    padding: "0.5rem",
                  }}
                  onClick={logout}
                >
                  Sign Out
                </Button>
              </List>
            </Drawer>
            <div
              style={{
                marginTop: "3.5rem",
                padding: "1rem",
              }}
            >
              {children}
            </div>
          </div>
        </ControlContextProvider>
      </DashboardContextProvider>
    </MqttContextProvider>
  );
}

export default MainLayout;