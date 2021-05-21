import {
  Box,
  Typography,
  Button,
  CircularProgress,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import InputFormikMarerialUi from "../common/inputs/InputFormikMarerialUi";
import * as Yup from "yup";
import { Redirect, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../store";
import { restPasswrod } from "../../store/user/userActions";

export interface ResetPasswordProps {}
interface MyFormValues {
  password: string;
  passwordConfirm: string;
}

/////////// Formik initialValues
const initialValues: MyFormValues = {
  password: "",
  passwordConfirm: "",
};

/////////// Schema Reagex Password
const lowerCaseRegExp = /(?=.*[a-z])/;
const upperCaseRegExp = /(?=.*[A-Z])/;
const numericRegExp = /(?=.*[0-9])/;

/////////// Formik Schema
const schema = Yup.object({
  password: Yup.string()
    .matches(lowerCaseRegExp, `one lowerCase Required!`)
    .matches(upperCaseRegExp, `one upperCase Required!`)
    .matches(numericRegExp, `one number Required!`)
    .min(6, `password must be longer than 8 characters`)
    .max(1024, `password must be shorter than 1024 characters`)
    .required(`this required`),

  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], `Password must be the same!`)
    .required(`this required`),
});

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginTop: 25,
    fontFamily: "serif",
    [theme.breakpoints.down("sm")]: {
      fontSize: 45,
    },
  },
  containerForm: {
    width: 400,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const ResetPassword: React.FC<ResetPasswordProps> = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const params: any = useParams();
  let history = useHistory();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { userActive, loding } = useSelector((state: RootStore) => state.user);

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
        Reset Password
      </Typography>

      <Box
        maxWidth="500px"
        display="flex"
        alignItems="center"
        flexDirection="column"
        boxShadow="0px 0px 4px rgba(0,0,0,0.5)"
        borderRadius={7}
        my={9}
        className={classes.containerForm}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={async (values, { setFieldError }) => {
            const res: any = await dispatch(
              restPasswrod(values.password, params.resetLink)
            );
            if (res.response && res.response.status === 400) {
              if (res.response && res.response.data.errors.passwordConfirm) {
                setFieldError(
                  "passwordConfirm",
                  res.response.data.errors.passwordConfirm
                );
              }
              if (res.response && res.response.data.errors.password) {
                setFieldError("password", res.response.data.errors.password);
              }
              return toast.error("errors occurred!");
            }
            toast.success(`password changed`);
            history.replace(`/login`);
          }}
        >
          {({ errors, touched, handleSubmit, dirty, isValid, values }) => {
            return (
              <Form onSubmit={handleSubmit} style={{ width: "80%" }}>
                <InputFormikMarerialUi
                  name="password"
                  label="Password*"
                  variant="outlined"
                  type="password"
                  style={{ margin: "10px 0px 10px 0px" }}
                  error={errors.password && touched.password}
                  disabled={loding}
                />

                <InputFormikMarerialUi
                  name="passwordConfirm"
                  label="Confirm Password*"
                  variant="outlined"
                  type="password"
                  style={{ margin: "10px 0px 10px 0px" }}
                  error={errors.passwordConfirm && touched.passwordConfirm}
                  disabled={loding}
                />
                <Box width="100%" display="flex" justifyContent="center" my={5}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!dirty || !isValid || loding}
                  >
                    {loding ? <CircularProgress /> : "Reset Password"}
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

export default ResetPassword;
