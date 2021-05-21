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
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../store";
import { sendEmailForgotPassword } from "../../store/user/userActions";

export interface SendForgotPassowrdEmailProps {}
interface MyFormValues {
  email: string;
}

////////// schema reagex Email
const emailRegExp = /^[a-z0-9._\-+]{2,50}@[a-z\-0-9]+(\.[a-z]{2,10})+$/i;

/////////// Formik initialValues
const initialValues: MyFormValues = {
  email: "",
};

/////////// Formik Schema
const schema = Yup.object({
  email: Yup.string()
    .lowercase()
    .matches(emailRegExp, `email is not valid`)
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

const SendForgotPassowrdEmail: React.FC<SendForgotPassowrdEmailProps> = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
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
        Forgot Password
      </Typography>

      <Typography align="center" style={{ marginTop: 10 }}>
        if you forgot your password, you can create a new one by providing your
        email ,after this you will be accept email to how reset your password
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
              sendEmailForgotPassword(values.email)
            );
            if (
              (res.response && res.response.status === 400) ||
              (res.response && res.response === undefined)
            ) {
              if (res.response && res.response.data.errors) {
                setFieldError("email", res.response.data.errors);
              }
              return toast.error("errors occurred!");
            }
            toast.success(`check your email`);
            history.replace(`/login`);
          }}
        >
          {({ errors, touched, handleSubmit, dirty, isValid, values }) => {
            return (
              <Form onSubmit={handleSubmit} style={{ width: "80%" }}>
                <InputFormikMarerialUi
                  name="email"
                  label="Email*"
                  variant="outlined"
                  error={errors.email && touched.email}
                  style={{ margin: "20px 0px 10px 0px" }}
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
                    {loding ? <CircularProgress /> : "Next"}
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

export default SendForgotPassowrdEmail;
