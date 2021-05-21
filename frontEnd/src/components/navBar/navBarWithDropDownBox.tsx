/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  AppBar,
  Tabs,
  Tab,
  makeStyles,
  Theme,
  Toolbar,
  Box,
  Typography,
  Grow,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  ShoppingCart,
  ShoppingBasket,
  Home,
  Settings,
  AccountCircle,
} from "@material-ui/icons";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../store";
import {
  logout,
  cheackUser,
  setUserInfo,
  clearUserState,
} from "../../store/user/userActions";
import { refreshRequestToken } from "../../services/http";

export interface navBarProps {}

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: 0,
    padding: 0,
  },
  selectedTab: {
    color: "red",
  },
  wrapper: {
    color: "white",
    fontSize: 22,
    display: "flex",
    flexDirection: "row",
  },
}));

const NavBar: React.FC<navBarProps> = () => {
  const { items } = useSelector((state: RootStore) => state.cart);
  const { userActive } = useSelector((state: RootStore) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const cheack = async () => {
      await dispatch(cheackUser());
      if (userActive) {
        await dispatch(setUserInfo());
      }
    };
    cheack();
  }, [userActive]);
  const history = useHistory();

  const [value, setValue] = React.useState(0);
  const [opencleaningTools, setOpencleaningTools] = React.useState(false);
  const [openDrinks, setOpenDrinks] = React.useState(false);
  const [openchocolateAndsnacks, setOpenchocolateAndsnacks] = React.useState(
    false
  );
  const [openCanned, setOpenCanned] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const classes = useStyles();
  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname === "/") {
      setValue(5);
    } else if (location.pathname === "/cart") {
      setValue(0);
    } else if (location.pathname === "/cleaningSupplies") {
      setValue(1);
    } else if (location.pathname === "/drinks") {
      setValue(2);
    } else if (location.pathname === "/chocolateAndsnacks") {
      setValue(3);
    } else if (location.pathname === "/canned") {
      setValue(4);
    } else if (location.pathname === "/oils") {
      setValue(7);
    } else if (location.pathname === "/vegetables") {
      setValue(8);
    } else if (location.pathname === "/fruits") {
      setValue(9);
    } else if (
      location.pathname === "/settings" ||
      location.pathname === "/settings/change-password"
    ) {
      setValue(10);
    } else {
      setValue(5);
    }
  }, [location.pathname]);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpen = (category: string) => {
    if (category === "cleaningTools") {
      setOpencleaningTools(true);
      setOpenDrinks(false);
      setOpenchocolateAndsnacks(false);
      setOpenCanned(false);
    } else if (category === "drinks") {
      setOpencleaningTools(false);
      setOpenDrinks(true);
      setOpenchocolateAndsnacks(false);
      setOpenCanned(false);
    } else if (category === "chocolateAndsnacks") {
      setOpencleaningTools(false);
      setOpenDrinks(false);
      setOpenchocolateAndsnacks(true);
      setOpenCanned(false);
    } else if (category === "canned") {
      setOpencleaningTools(false);
      setOpenDrinks(false);
      setOpenchocolateAndsnacks(false);
      setOpenCanned(true);
    } else {
      setOpencleaningTools(false);
      setOpenDrinks(false);
      setOpenchocolateAndsnacks(false);
      setOpenCanned(false);
    }
  };
  const handleClose = () => {
    setOpencleaningTools(false);
    setOpenDrinks(false);
    setOpenchocolateAndsnacks(false);
    setOpenCanned(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(cheackUser());
    dispatch(clearUserState());
    refreshRequestToken();
    return history.replace("/");
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#188973" }}>
        <Box width="100%" display="flex" justifyContent="center">
          <IconButton component={NavLink} to="/" onMouseEnter={handleClose}>
            <ShoppingBasket style={{ fontSize: 100 }} />
          </IconButton>
        </Box>
        <Toolbar className={classes.toolbar}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab
              icon={<ShoppingCart />}
              label={
                <Typography>
                  {items && items.length ? items.length : ""}
                </Typography>
              }
              classes={{ wrapper: classes.wrapper }}
              component={NavLink}
              to="/cart"
              onMouseEnter={handleClose}
            />
            <Tab
              label="cleaningSupplies"
              style={{ color: "white", fontSize: 18, fontFamily: "serif" }}
              component={NavLink}
              to="/cleaningSupplies"
              onMouseEnter={() => handleOpen("cleaningTools")}
              onClick={handleClose}
            />
            <Tab
              label="chocolateAndsnacks"
              component={NavLink}
              to="/chocolateAndsnacks"
              style={{ color: "white", fontSize: 18, fontFamily: "serif" }}
              onMouseEnter={() => handleOpen("chocolateAndsnacks")}
              onClick={handleClose}
            />
            <Tab
              label="canned"
              component={NavLink}
              to="/canned"
              style={{ color: "white", fontSize: 18, fontFamily: "serif" }}
              onMouseEnter={() => handleOpen("canned")}
              onClick={handleClose}
            />
            <Tab
              icon={<Home htmlColor="white" fontSize="large" />}
              component={NavLink}
              to="/"
              onMouseEnter={handleClose}
            />
            <Tab
              label="drinks "
              component={NavLink}
              to="/drinks"
              style={{ color: "white", fontSize: 18, fontFamily: "serif" }}
              onMouseEnter={() => handleOpen("drinks")}
              onClick={handleClose}
            />
            <Tab
              label="oils "
              component={NavLink}
              to="/oils"
              style={{ color: "white", fontSize: 18, fontFamily: "serif" }}
              onMouseEnter={() => handleOpen("oils")}
              onClick={handleClose}
            />
            <Tab
              label="vegetables"
              component={NavLink}
              to="/vegetables"
              style={{ color: "white", fontSize: 18, fontFamily: "serif" }}
              onMouseEnter={() => handleOpen("vegetables")}
              onClick={handleClose}
            />
            <Tab
              label="fruits"
              component={NavLink}
              to="/fruits"
              style={{ color: "white", fontSize: 18, fontFamily: "serif" }}
              onMouseEnter={() => handleOpen("fruits")}
              onClick={handleClose}
            />
            {userActive ? (
              <Tab
                icon={<Settings fontSize="large" htmlColor="#ffffff" />}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                onMouseEnter={handleClose}
              />
            ) : (
              <Tab
                icon={<AccountCircle fontSize="large" htmlColor="#ffffff" />}
                component={NavLink}
                to="/login"
              />
            )}
          </Tabs>
        </Toolbar>
      </AppBar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onMouseEnter={handleClose}
        onClose={handleCloseMenu}
        style={{ marginLeft: 10 }}
      >
        <MenuItem onClick={handleCloseMenu} component={NavLink} to="/settings">
          Profile Settings
        </MenuItem>
        <MenuItem onClick={handleCloseMenu} component={NavLink} to="/settings">
          Site Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            handleLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      {/* cleaningSupplies */}

      {opencleaningTools ? (
        <Grow in={opencleaningTools} style={{ position: "absolute" }}>
          <Box
            width="100%"
            height="500px"
            zIndex="999999"
            bgcolor="#6CBDAD"
            display="flex"
            justifyContent="space-between"
            onMouseLeave={handleClose}
          >
            <Box mx={6} my={4}>
              ادوات تنظيف
            </Box>
          </Box>
        </Grow>
      ) : openDrinks ? (
        <Grow in={openDrinks} style={{ position: "absolute" }}>
          <Box
            width="100%"
            height="500px"
            zIndex="9999999999"
            bgcolor="#6CBDAD"
            display="flex"
            justifyContent="space-between"
            onMouseLeave={handleClose}
          >
            <Box mx={6} my={4}>
              مشروبات
            </Box>
            <Box mx={6} my={4}>
              مشروبات
            </Box>
            <Box mx={6} my={4}>
              مشروبات
            </Box>
            <Box mx={6} my={4}>
              مشروبات
            </Box>
          </Box>
        </Grow>
      ) : openchocolateAndsnacks ? (
        <Grow in={openchocolateAndsnacks} style={{ position: "absolute" }}>
          <Box
            width="100%"
            height="500px"
            zIndex="999999"
            bgcolor="#6CBDAD"
            display="flex"
            justifyContent="space-between"
            onMouseLeave={handleClose}
          >
            <Box mx={6} my={4}>
              openchocolateAndsnacks
            </Box>
            <Box mx={6} my={4}>
              openchocolateAndsnacks
            </Box>
            <Box mx={6} my={4}>
              openchocolateAndsnacks
            </Box>
            <Box mx={6} my={4}>
              openchocolateAndsnacks
            </Box>
          </Box>
        </Grow>
      ) : openCanned ? (
        <Grow in={openCanned} style={{ position: "absolute" }}>
          <Box
            width="100%"
            height="500px"
            zIndex="999999"
            bgcolor="#6CBDAD"
            display="flex"
            justifyContent="space-between"
            onMouseLeave={handleClose}
          >
            <Box mx={6} my={4}>
              openCanned
            </Box>
            <Box mx={6} my={4}>
              openCanned
            </Box>
            <Box mx={6} my={4}>
              openCanned
            </Box>
            <Box mx={6} my={4}>
              openCanned
            </Box>
          </Box>
        </Grow>
      ) : (
        ""
      )}
    </>
  );
};

export default NavBar;
