import React from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Theme,
  makeStyles,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import InputFormikMarerialUi from "./common/inputs/InputFormikMarerialUi";
import * as Yup from "yup";
import { login, cheackUser } from "../store/user/userActions";
import { Redirect, useHistory, Link } from "react-router-dom";
import { RootStore } from "../store";
import { refreshRequestToken } from "../services/http";
export interface LOGINProps {}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginTop: 25,
    fontFamily: "serif",
    [theme.breakpoints.down("sm")]: {
      fontSize: 45,
    },
  },
}));

interface MyFormValues {
  email: string;
  password: string;
}

/////////// Formik initialValues
const initialValues: MyFormValues = {
  email: "",
  password: "",
};

/////////// Formik validationSchema
const schema = Yup.object({
  email: Yup.string().required(`this required`),
  password: Yup.string().required(`this required`),
});

const LOGIN: React.FC<LOGINProps> = () => {
  const { userActive, loding } = useSelector((state: RootStore) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const classes = useStyles();

  if (userActive) {
    return <Redirect to="/" />;
  }
  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
    >
      <Typography variant="h2" className={classes.title}>
        Login
      </Typography>
      <Box
        maxWidth="500px"
        display="flex"
        alignItems="center"
        flexDirection="column"
        boxShadow="0px 0px 4px rgba(0,0,0,0.5)"
        minHeight="300px"
        borderRadius={7}
        my={9}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={async (values, { setFieldError }) => {
            const dataBody = {
              password: values.password,
              email: values.email,
            };

            //// return errors/////////////////////////////////////
            const respons: any = await dispatch(login(dataBody));

            if (
              (respons.response && respons.response.status === 400) ||
              (respons.response && respons.response === undefined)
            ) {
              if (respons.response && respons.response.data.error) {
                setFieldError("email", respons.response.data.error);
                setFieldError("password", respons.response.data.error);
              }
              if (respons.response && respons.response.data.errors.email) {
                setFieldError("email", respons.response.data.errors.email);
              }
              if (respons.response && respons.response.data.errors.password) {
                setFieldError(
                  "password",
                  respons.response.data.errors.password
                );
              }
              return toast.error("errors occurred!");
            }
            refreshRequestToken();
            dispatch(cheackUser());

            toast.success("welcome supermarket");
            history.replace("/");
            return;
          }}
        >
          {({ errors, touched, handleSubmit, dirty, isValid, values }) => {
            return (
              <Form onSubmit={handleSubmit} style={{ maxWidth: "80%" }}>
                <InputFormikMarerialUi
                  name="email"
                  label="Email*"
                  variant="outlined"
                  style={{ margin: "20px 0px 10px 0px" }}
                  error={errors.email && touched.email}
                  disabled={loding}
                />

                <InputFormikMarerialUi
                  name="password"
                  label="Password*"
                  variant="outlined"
                  type="password"
                  style={{ margin: "10px 0px 10px 0px" }}
                  error={errors.password && touched.password}
                  disabled={loding}
                />
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    variant="body1"
                    component={Link}
                    to="/sign-up"
                    style={{ textDecoration: "none", color: "#0000EE" }}
                  >
                    Sign Up
                  </Typography>
                  <Typography
                    variant="body1"
                    component={Link}
                    to="/send-forgot-passowrd-email"
                    style={{ textDecoration: "none", color: "#0000EE" }}
                  >
                    Forgot Password
                  </Typography>
                </Box>
                <Box width="100%" display="flex" justifyContent="center" my={5}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!dirty || !isValid || loding}
                  >
                    {loding ? <CircularProgress /> : "Login"}
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default LOGIN;
