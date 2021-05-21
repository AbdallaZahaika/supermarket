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

export interface NavBarDesktopProps {}

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

const NavBarDesktop: React.FC<NavBarDesktopProps> = () => {
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

  const [anchorElUser, setAnchorElUserMenu] =
    React.useState<null | HTMLElement>(null);
  const [anchorElCleaningSupplies, setAnchorElCleaningSupplies] =
    React.useState<null | HTMLElement>(null);
  const [anchorElDrinks, setAnchorElDrinks] =
    React.useState<null | HTMLElement>(null);
  const [anchorElChocolateAndsnacks, setAnchorElChocolateAndsnacks] =
    React.useState<null | HTMLElement>(null);
  const [anchorElCanned, setAnchorElCanned] =
    React.useState<null | HTMLElement>(null);

  const classes = useStyles();
  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname === "/") {
      setValue(4);
    } else if (location.pathname === "/cart") {
      setValue(0);
    } else if (
      location.pathname === "/cleaningSupplies" ||
      location.pathname === "/cleaningSupplies/washing-powder" ||
      location.pathname === "/cleaningSupplies/floor-cleaning"
    ) {
      setValue(1);
    } else if (
      location.pathname === "/drinks" ||
      location.pathname === "/drinks/juice" ||
      location.pathname === "/drinks/soft-drinks" ||
      location.pathname === "/drinks/water"
    ) {
      setValue(5);
    } else if (
      location.pathname === "/chocolateAndsnacks" ||
      location.pathname === "/chocolateAndsnacks/chocolate" ||
      location.pathname === "/chocolateAndsnacks/snacks"
    ) {
      setValue(2);
    } else if (
      location.pathname === "/canned" ||
      location.pathname === "/canned/sauce" ||
      location.pathname === "/canned/canned"
    ) {
      setValue(3);
    } else if (location.pathname === "/oils") {
      setValue(6);
    } else if (location.pathname === "/vegetables") {
      setValue(7);
    } else if (location.pathname === "/fruits") {
      setValue(8);
    } else if (
      location.pathname === "/settings" ||
      location.pathname === "/settings/change-password" ||
      location.pathname === "/login" ||
      location.pathname === "/sign-up" ||
      location.pathname === "/send-forgot-passowrd-email" ||
      location.pathname === "/reset-passowrd"
    ) {
      setValue(9);
    } else {
      setValue(4);
    }
  }, [location.pathname]);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
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
          <IconButton component={NavLink} to="/">
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
            />
            <Tab
              label="cleaningSupplies"
              style={{ color: "white", fontSize: 18, fontFamily: "serif" }}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                setAnchorElCleaningSupplies(event.currentTarget)
              }
              onMouseOver={(event: any) =>
                setAnchorElCleaningSupplies(event.currentTarget)
              }
            />
            <Tab
              label="chocolateAndsnacks"
              style={{ color: "white", fontSize: 18, fontFamily: "serif" }}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                setAnchorElChocolateAndsnacks(event.currentTarget)
              }
              onMouseOver={(event: any) =>
                setAnchorElChocolateAndsnacks(event.currentTarget)
              }
            />
            <Tab
              label="canned"
              style={{ color: "white", fontSize: 18, fontFamily: "serif" }}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                setAnchorElCanned(event.currentTarget)
              }
              onMouseOver={(event: any) =>
                setAnchorElCanned(event.currentTarget)
              }
            />
            <Tab
              icon={<Home htmlColor="white" fontSize="large" />}
              component={NavLink}
              to="/"
            />
            <Tab
              label="drinks "
              style={{ color: "white", fontSize: 18, fontFamily: "serif" }}
              aria-haspopup="true"
              aria-controls="simple-menu"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                setAnchorElDrinks(event.currentTarget)
              }
              onMouseOver={(event: any) =>
                setAnchorElDrinks(event.currentTarget)
              }
            />
            <Tab
              label="oils "
              component={NavLink}
              to="/oils"
              style={{ color: "white", fontSize: 18, fontFamily: "serif" }}
            />
            <Tab
              label="vegetables"
              component={NavLink}
              to="/vegetables"
              style={{ color: "white", fontSize: 18, fontFamily: "serif" }}
            />
            <Tab
              label="fruits"
              component={NavLink}
              to="/fruits"
              style={{ color: "white", fontSize: 18, fontFamily: "serif" }}
            />
            {userActive ? (
              <Tab
                icon={<Settings fontSize="large" htmlColor="#ffffff" />}
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  setAnchorElUserMenu(event.currentTarget)
                }
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
        anchorEl={anchorElUser}
        keepMounted
        open={Boolean(anchorElUser)}
        onClose={() => setAnchorElUserMenu(null)}
        style={{ margin: "50px 0px 0px 10px" }}
      >
        <MenuItem
          component={NavLink}
          to="/settings"
          onClick={() => setAnchorElUserMenu(null)}
        >
          Profile Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorElUserMenu(null);
            handleLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
      <Menu
        id="simple-menu"
        anchorEl={anchorElCleaningSupplies}
        keepMounted
        open={Boolean(anchorElCleaningSupplies)}
        onClose={() => setAnchorElCleaningSupplies(null)}
        style={{ margin: "50px 0px 0px 28px" }}
        MenuListProps={{
          onMouseLeave: () => setAnchorElCleaningSupplies(null),
        }}
        getContentAnchorEl={null}
      >
        <MenuItem
          component={NavLink}
          to="/cleaningSupplies"
          onClick={() => setAnchorElCleaningSupplies(null)}
        >
          All
        </MenuItem>
        <MenuItem
          component={NavLink}
          to="/cleaningSupplies/washing-powder"
          onClick={() => setAnchorElCleaningSupplies(null)}
        >
          Washing Powder
        </MenuItem>
        <MenuItem
          component={NavLink}
          to="/cleaningSupplies/floor-cleaning"
          onClick={() => setAnchorElCleaningSupplies(null)}
        >
          Floor Cleaning
        </MenuItem>
      </Menu>
      <Menu
        id="simple-menu"
        anchorEl={anchorElChocolateAndsnacks}
        keepMounted
        open={Boolean(anchorElChocolateAndsnacks)}
        style={{ margin: "50px 0px 0px 60px" }}
        onClose={() => setAnchorElChocolateAndsnacks(null)}
        MenuListProps={{
          onMouseLeave: () => setAnchorElChocolateAndsnacks(null),
        }}
        getContentAnchorEl={null}
      >
        <MenuItem
          component={NavLink}
          to="/chocolateAndsnacks"
          onClick={() => setAnchorElChocolateAndsnacks(null)}
        >
          All
        </MenuItem>
        <MenuItem
          component={NavLink}
          to="/chocolateAndsnacks/chocolate"
          onClick={() => setAnchorElChocolateAndsnacks(null)}
        >
          Chocolate
        </MenuItem>
        <MenuItem
          component={NavLink}
          to="/chocolateAndsnacks/snacks"
          onClick={() => setAnchorElChocolateAndsnacks(null)}
        >
          Snacks
        </MenuItem>
      </Menu>
      <Menu
        id="simple-menu"
        anchorEl={anchorElCanned}
        keepMounted
        open={Boolean(anchorElCanned)}
        style={{ margin: "50px 0px 0px 38px" }}
        onClose={() => setAnchorElCanned(null)}
        MenuListProps={{
          onMouseLeave: () => setAnchorElCanned(null),
        }}
        getContentAnchorEl={null}
      >
        <MenuItem
          component={NavLink}
          to="/canned"
          onClick={() => setAnchorElCanned(null)}
        >
          All
        </MenuItem>
        <MenuItem
          component={NavLink}
          to="/canned/sauce"
          onClick={() => setAnchorElCanned(null)}
        >
          Sauce
        </MenuItem>
        <MenuItem
          component={NavLink}
          to="/canned/canned"
          onClick={() => setAnchorElCanned(null)}
        >
          Canned
        </MenuItem>
      </Menu>
      <Menu
        id="simple-menu"
        anchorEl={anchorElDrinks}
        keepMounted
        open={Boolean(anchorElDrinks)}
        style={{ margin: "50px 0px 0px 30px" }}
        onClose={() => setAnchorElDrinks(null)}
        MenuListProps={{
          onMouseLeave: () => setAnchorElDrinks(null),
        }}
        getContentAnchorEl={null}
      >
        <MenuItem
          component={NavLink}
          to="/drinks"
          onClick={() => setAnchorElDrinks(null)}
        >
          All
        </MenuItem>
        <MenuItem
          component={NavLink}
          to="/drinks/juice"
          onClick={() => setAnchorElDrinks(null)}
        >
          Juice
        </MenuItem>
        <MenuItem
          component={NavLink}
          to="/drinks/soft-drinks"
          onClick={() => setAnchorElDrinks(null)}
        >
          Soft Drinks
        </MenuItem>
        <MenuItem
          component={NavLink}
          to="/drinks/water"
          onClick={() => setAnchorElDrinks(null)}
        >
          water
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavBarDesktop;
