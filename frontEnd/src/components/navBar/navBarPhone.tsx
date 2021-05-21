/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import {
  AppBar,
  makeStyles,
  Theme,
  Toolbar,
  Box,
  Typography,
  IconButton,
  ListItem,
  ListItemText,
  List,
  Drawer,
  Collapse,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import {
  ShoppingCart,
  ShoppingBasket,
  ChevronRight,
  ChevronLeft,
} from "@material-ui/icons";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootStore } from "../../store";
import {
  logout,
  cheackUser,
  setUserInfo,
  clearUserState,
} from "../../store/user/userActions";
import { refreshRequestToken } from "../../services/http";
export interface NavBarPhoneProps {}

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: "100%",
    flexShrink: 0,
  },
  drawerPaper: {
    width: "100%",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },

  mdToolbar: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
}));

const NavBarPhone: React.FC<NavBarPhoneProps> = () => {
  const { items } = useSelector((state: RootStore) => state.cart);
  const { userActive } = useSelector((state: RootStore) => state.user);
  const [open, setOpen] = React.useState<boolean>(false);
  const [
    openCollapseCleaningSupplies,
    setOpenCollapseCleaningSupplies,
  ] = React.useState<boolean>(false);
  const [openCollapseCanned, setOpenCollapseCanned] = React.useState<boolean>(
    false
  );
  const [
    openCollapseChocolateAndsnacks,
    setOpenChocolateAndsnacks,
  ] = React.useState<boolean>(false);
  const [openCollapseDrinks, setOpenDrinks] = React.useState<boolean>(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  function handleOpen(name: string) {
    if (name === "openCollapseCleaningSupplies") {
      return setOpenCollapseCleaningSupplies(!openCollapseCleaningSupplies);
    } else if (name === "openCollapseChocolateAndsnacks") {
      return setOpenChocolateAndsnacks(!openCollapseChocolateAndsnacks);
    } else if (name === "openCollapseCanned") {
      return setOpenCollapseCanned(!openCollapseCanned);
    } else if (name === "openCollapseDrinks") {
      return setOpenDrinks(!openCollapseDrinks);
    }
  }
  React.useEffect(() => {
    const cheack = async () => {
      await dispatch(cheackUser());
      if (userActive) {
        await dispatch(setUserInfo());
      }
    };
    cheack();
  }, [userActive]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setOpenCollapseCleaningSupplies(false);
    setOpenChocolateAndsnacks(false);
    setOpenCollapseCanned(false);
    setOpenDrinks(false);
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
            <ShoppingBasket style={{ fontSize: 150 }} />
          </IconButton>
        </Box>
        <Toolbar className={classes.mdToolbar}>
          <Box display="flex" alignItems="center">
            <IconButton component={NavLink} to="/cart">
              <ShoppingCart htmlColor="#fff" />
              <Typography variant="body2" style={{ color: "#fff" }}>
                {items && items.length ? items.length : ""}
              </Typography>
            </IconButton>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
        <List>
          <ListItem
            button
            component={NavLink}
            to="/"
            onClick={handleDrawerClose}
          >
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleOpen("openCollapseCleaningSupplies")}
          >
            <ListItemText primary="Cleaning Supplies" />
          </ListItem>
          <Collapse
            in={openCollapseCleaningSupplies}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItem
                button
                component={NavLink}
                to="/cleaningSupplies"
                onClick={handleDrawerClose}
              >
                <ListItemText inset primary="All" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/cleaningSupplies/washing-powder"
                onClick={handleDrawerClose}
              >
                <ListItemText inset primary="Washing Powder" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/cleaningSupplies/floor-cleaning"
                onClick={handleDrawerClose}
              >
                <ListItemText inset primary="Floor Cleaning" />
              </ListItem>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={() => handleOpen("openCollapseChocolateAndsnacks")}
          >
            <ListItemText primary="Chocolate&Snacks" />
          </ListItem>
          <Collapse
            in={openCollapseChocolateAndsnacks}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItem
                button
                component={NavLink}
                to="/chocolateAndsnacks"
                onClick={handleDrawerClose}
              >
                <ListItemText inset primary="All" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/chocolateAndsnacks/chocolate"
                onClick={handleDrawerClose}
              >
                <ListItemText inset primary="Chocolate" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/chocolateAndsnacks/snacks"
                onClick={handleDrawerClose}
              >
                <ListItemText inset primary="Snacks" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={() => handleOpen("openCollapseCanned")}>
            <ListItemText primary="Canned" />
          </ListItem>
          <Collapse in={openCollapseCanned} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={NavLink}
                to="/canned"
                onClick={handleDrawerClose}
              >
                <ListItemText inset primary="All" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/canned/sauce"
                onClick={handleDrawerClose}
              >
                <ListItemText inset primary="Sauce" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/canned/canned"
                onClick={handleDrawerClose}
              >
                <ListItemText inset primary="Canned" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button onClick={() => handleOpen("openCollapseDrinks")}>
            <ListItemText primary="Drinks" />
          </ListItem>
          <Collapse in={openCollapseDrinks} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                component={NavLink}
                to="/drinks"
                onClick={handleDrawerClose}
              >
                <ListItemText inset primary="All" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/drinks/juice"
                onClick={handleDrawerClose}
              >
                <ListItemText inset primary="Juice" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/drinks/soft-drinks"
                onClick={handleDrawerClose}
              >
                <ListItemText inset primary="Soft Drinks" />
              </ListItem>
              <ListItem
                button
                component={NavLink}
                to="/drinks/water"
                onClick={handleDrawerClose}
              >
                <ListItemText inset primary="water" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            button
            component={NavLink}
            to="/oils"
            onClick={handleDrawerClose}
          >
            <ListItemText primary="OIL" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/vegetables"
            onClick={handleDrawerClose}
          >
            <ListItemText primary="Vegetables" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/fruits"
            onClick={handleDrawerClose}
          >
            <ListItemText primary="Fruits" />
          </ListItem>
          {userActive ? (
            <>
              <ListItem
                button
                component={NavLink}
                to="/settings"
                onClick={() => {
                  handleDrawerClose();
                }}
              >
                <ListItemText primary="Settings" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  handleDrawerClose();
                  handleLogout();
                }}
              >
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                button
                component={NavLink}
                to="/login"
                onClick={handleDrawerClose}
              >
                <ListItemText primary="login" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default NavBarPhone;
