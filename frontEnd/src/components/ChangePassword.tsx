import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Theme,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import InputFormikMarerialUi from "./common/inputs/InputFormikMarerialUi";
import * as Yup from "yup";
import { chagnePassword } from "../store/user/userActions";
import { Link, useHistory } from "react-router-dom";
import { RootStore } from "../store";
export interface ChangePasswordProps {}

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
  password: string;
  newPassword: string;
  passwordConfirm: string;
}

/////////// Formik initialValues
const initialValues: MyFormValues = {
  password: "",
  newPassword: "",
  passwordConfirm: "",
};

/////////// Schema Reagex Password
const lowerCaseRegExp = /(?=.*[a-z])/;
const upperCaseRegExp = /(?=.*[A-Z])/;
const numericRegExp = /(?=.*[0-9])/;

/////////// Formik Schema
const schema = Yup.object({
  password: Yup.string()
    .max(1024, `password must be shorter than 1024 characters`)
    .required(),
  newPassword: Yup.string()
    .matches(lowerCaseRegExp, `one lowerCase Required!`)
    .matches(upperCaseRegExp, `one upperCase Required!`)
    .matches(numericRegExp, `one number Required!`)
    .min(6, `password must be longer than 8 characters`)
    .max(1024, `password must be shorter than 1024 characters`)
    .required(`this required`),

  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("newPassword")], `Password must be the same!`)
    .required(`this required`),
});

const ChangePassword: React.FC<ChangePasswordProps> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loding } = useSelector((state: RootStore) => state.user);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const classes = useStyles();
  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      flexDirection="column"
      minHeight="100vh"
    >
      <Typography variant="h2" className={classes.title}>
        ChangePassword
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
              newPassword: values.newPassword,
            };

            const respons: any = await dispatch(chagnePassword(dataBody));
            //// return errors/////////////////////////////////////
            if (
              (respons.response && respons.response.status === 400) ||
              (respons.response && respons.response === undefined)
            ) {
              if (respons.response && respons.response.data.errors.password) {
                setFieldError(
                  "password",
                  respons.response.data.errors.password
                );
              }
              if (
                respons.response &&
                respons.response.data.errors.newPassword
              ) {
                setFieldError(
                  "newPassword",
                  respons.response.data.errors.newPassword
                );
              }
              return toast.error("errors occurred!");
            }
            history.replace("/");
            toast.success("welcome supermarket");

            return;
          }}
        >
          {({ errors, touched, handleSubmit, dirty, isValid }) => {
            return (
              <Form onSubmit={handleSubmit} style={{ width: "80%" }}>
                <InputFormikMarerialUi
                  name="password"
                  label="password*"
                  type="password"
                  variant="outlined"
                  style={{ margin: "20px 0px 10px 0px" }}
                  error={errors.password && touched.password}
                  disabled={loding}
                />
                <InputFormikMarerialUi
                  name="newPassword"
                  label="New Password*"
                  type="password"
                  variant="outlined"
                  style={{ margin: "20px 0px 10px 0px" }}
                  error={errors.newPassword && touched.newPassword}
                  disabled={loding}
                />
                <InputFormikMarerialUi
                  name="passwordConfirm"
                  label="confirm  New Password*"
                  type="password"
                  variant="outlined"
                  style={{ margin: "20px 0px 10px 0px" }}
                  error={errors.passwordConfirm && touched.passwordConfirm}
                  disabled={loding}
                />

                <Box width="100%" display="flex" justifyContent="center" my={5}>
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="space-around"
                  >
                    {loding ? (
                      <CircularProgress />
                    ) : (
                      <IconButton
                        type="submit"
                        disabled={!isValid || !dirty || loding}
                      >
                        <Check
                          htmlColor={!isValid || !dirty ? "black" : "green"}
                          fontSize="large"
                        />
                      </IconButton>
                    )}
                    <IconButton
                      component={Link}
                      to="/settings"
                      disabled={loding}
                    >
                      <Close color="error" fontSize="large" />
                    </IconButton>
                  </Box>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default ChangePassword;
