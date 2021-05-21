/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useDispatch } from "react-redux";
import { get_cart_items } from "./store/cart/cartActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@material-ui/core";
import NavBar from "./components/navBar/navBar";
import { Route, Switch } from "react-router-dom";
import Oils from "./components/pages/oils";
import Footer from "./components/footer";
import Drinks from "./components/pages/Drinks";
import Candy from "./components/pages/ChocolateAndsnacks";
import Vegetables from "./components/pages/Vegetables";
import Fruits from "./components/pages/fruits";
import Canned from "./components/pages/Canned";
import CleaningSupplies from "./components/pages/CleaningSupplies";
import Home from "./components/pages/Home";
import Cart from "./components/Cart";
import CreateItem from "./components/CreateItem";
import EditItem from "./components/editItem";
import LOGIN from "./components/login";
import Settings from "./components/Settings";
import ChangePassword from "./components/ChangePassword";

import ProtectedRouter from "./components/common/protectedRouter";
import SignUp from "./components/signUp";
import ConfirmEmail from "./components/ConfirmEmail";
import SendForgotPassowrdEmail from "./components/forgotPassword/SendForgotPassowrdEmail";
import ResetPassword from "./components/forgotPassword/ResetPassword";
const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(get_cart_items());
  }, []);
  return (
    <Box style={{ padding: 0, margin: "0px 0px 0px 0px" }}>
      <ToastContainer />
      <NavBar />
      {/* !!!!!!! don't chage the path name  */}
      {/* !!!!!!! if you chage the path name it well be not have any item type equal to path name */}
      {/* !!!!!!! and you will be get error or null not items  */}
      <Switch>
        <Route path="/login" component={LOGIN} />
        <Route path="/sign-up" component={SignUp} />
        <ProtectedRouter
          path="/settings/change-password"
          component={ChangePassword}
        />
        <ProtectedRouter path="/settings" component={Settings} />
        <Route
          path="/send-forgot-passowrd-email"
          component={SendForgotPassowrdEmail}
        />
        <Route path="/reset-password/:resetLink" component={ResetPassword} />
        <Route path="/confirm-email/:token" component={ConfirmEmail} />
        <Route path="/oils" component={Oils} />
        <Route path="/drinks/:category" component={Drinks} />
        <Route path="/drinks" component={Drinks} />
        <Route path="/canned/:category" component={Canned} />
        <Route path="/canned" component={Canned} />
        <Route
          path="/cleaningSupplies/:category"
          component={CleaningSupplies}
        />
        <Route path="/cleaningSupplies" component={CleaningSupplies} />
        <Route path="/chocolateAndsnacks/:category" component={Candy} />
        <Route path="/chocolateAndsnacks" component={Candy} />
        <Route path="/vegetables" component={Vegetables} />
        <Route path="/fruits" component={Fruits} />
        <Route path="/cart" component={Cart} />
        <ProtectedRouter
          admin={true}
          path="/create-item"
          component={CreateItem}
        />
        <ProtectedRouter
          admin={true}
          path="/edit-item/:_id"
          component={EditItem}
        />

        <Route path="/" exact component={Home} />
      </Switch>
      <Footer />
    </Box>
  );
};

export default App;
