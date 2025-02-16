import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Avatar,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FaBox, FaFileInvoice, FaChartBar } from "react-icons/fa";
import { MdOutlineAssignmentReturn, MdMenu } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.png";

// Navbar Component
//this component renders a responsive sidebar navigation for the application

const Navbar = () => {
  const location = useLocation(); //get current route to find active menu item
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // check if the screen size is mobile
  const [mobileOpen, setMobileOpen] = useState(false);

  //find if the path is active
  const isActive = (path: string) => location.pathname === path;

  ///toggles the mobile drawer
  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  // Sidebar menu content
  const drawerContent = (
    <Box
      sx={{
        width: 240, // Sidebar width
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Logo Section */}
      <Box display="flex" justifyContent="center" alignItems="center" my={2}>
        <Avatar
          src={logo}
          alt="Logo"
          variant="square"
          sx={{ width: 70, height: 70 }}
        />
      </Box>

      {/* Navigation Links */}
      <List sx={{ flexGrow: 1 }}>
        {[
          {
            text: "Refund Orders",
            icon: <MdOutlineAssignmentReturn />,
            path: "/",
          },
          { text: "Products", icon: <FaBox />, path: "/products" },
          { text: "Invoices", icon: <FaFileInvoice />, path: "/invoices" },
          { text: "Statistics", icon: <FaChartBar />, path: "/statistics" },
        ].map(({ text, icon, path }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton
              component={Link}
              to={path}
              sx={{
                margin: 1,
                backgroundColor: isActive(path) ? "#f3e5f5" : "transparent",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#e1bee7",
                },
              }}
              onClick={toggleDrawer}
            >
              <ListItemIcon
                sx={{ color: isActive(path) ? "#815EA2" : "inherit" }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={text}
                sx={{ fontWeight: isActive(path) ? 900 : "normal" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            zIndex: 1300, // Ensures the button is above other content
          }}
        >
          <MdMenu size={28} />
        </IconButton>
      )}

      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            overflow: "hidden",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
