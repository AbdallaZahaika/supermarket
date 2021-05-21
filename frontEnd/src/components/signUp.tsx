import React from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Theme,
  makeStyles,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Form, Formik, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import InputFormikMarerialUi from "./common/inputs/InputFormikMarerialUi";
import * as Yup from "yup";
import { signUp } from "../store/user/userActions";
import { SIGNUP_INTERFACE } from "../store/user/userTypes";
import { Redirect, useHistory, Link } from "react-router-dom";
import { RootStore } from "../store";

import { cities } from "../services/addressOption.json";
export interface SignUpProps {}

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
  passwordConfirm: string;
  city: string;
  street: string;
  houseNumber: number | undefined;
  floor: number | undefined;
  ApartmentNumber: number | undefined;
  name: string;
  phone: string;
}

/////////// Formik initialValues
const initialValues: MyFormValues = {
  email: "",
  password: "",
  ApartmentNumber: undefined,
  city: "",
  floor: undefined,
  houseNumber: undefined,
  street: "",
  name: "",
  passwordConfirm: "",
  phone: "",
};

/////////// Schema Reagex Password
const lowerCaseRegExp = /(?=.*[a-z])/;
const upperCaseRegExp = /(?=.*[A-Z])/;
const numericRegExp = /(?=.*[0-9])/;

////////// schema reagex Email
const emailRegExp = /^[a-z0-9._\-+]{2,50}@[a-z\-0-9]+(\.[a-z]{2,10})+$/i;

////////// schema reagex Phone
const phoneRegExp = /^0[2-9]\d{7,8}$/;

/////////// Formik validationSchema
const schema = Yup.object({
  name: Yup.string()
    .min(2, `company name must be longer than 2 characters`)
    .max(255, `company  name must be shorter than 255 characters`)
    .required(`this required`),
  email: Yup.string()
    .lowercase()
    .matches(emailRegExp, `email is not valid`)
    .required(`this required`),
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
  city: Yup.string().required(`this required`),
  street: Yup.string().required(`this required`),
  houseNumber: Yup.number().required(`this required`),
  floor: Yup.number().required(`this required`),
  ApartmentNumber: Yup.number().required(`this required`),
  phone: Yup.string()
    .min(9, `Phone must be longer than 9 characters`)
    .max(10, `Phone must be shorter than 10 characters`)
    .matches(phoneRegExp, `Phone number is not valid`)
    .required(`this required`),
});

const SignUp: React.FC<SignUpProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userActive, loding } = useSelector((state: RootStore) => state.user);
  const [openCities, setOpenCities] = React.useState(false);

  const [citiesOptions] = React.useState<Array<string>>(cities);

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
        SignUp
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
            const dataBody: SIGNUP_INTERFACE = {
              name: values.name,
              email: values.email,
              password: values.password,
              phone: values.phone,
              city: values.city,
              street: values.street,
              houseNumber: values.houseNumber,
              floor: values.floor,
              ApartmentNumber: values.ApartmentNumber,
            };

            const respons: any = await dispatch(signUp(dataBody));
            //// return errors/////////////////////////////////////

            if (
              (respons.response && respons.response.status === 400) ||
              (respons.response && respons.response === undefined)
            ) {
              if (respons.response && respons.response.data.errors.email) {
                setFieldError("email", respons.response.data.errors.email);
              }
              if (respons.response && respons.response.data.errors.password) {
                setFieldError(
                  "password",
                  respons.response.data.errors.password
                );
              }
              if (
                respons.response &&
                respons.response.data.errors.ApartmentNumber
              ) {
                setFieldError(
                  "ApartmentNumber",
                  respons.response.data.errors.ApartmentNumber
                );
              }
              if (respons.response && respons.response.data.errors.city) {
                setFieldError("city", respons.response.data.errors.city);
              }
              if (respons.response && respons.response.data.errors.floor) {
                setFieldError("floor", respons.response.data.errors.floor);
              }
              if (
                respons.response &&
                respons.response.data.errors.houseNumber
              ) {
                setFieldError(
                  "houseNumber",
                  respons.response.data.errors.houseNumber
                );
              }
              if (respons.response && respons.response.data.errors.street) {
                setFieldError("street", respons.response.data.errors.street);
              }
              if (respons.response && respons.response.data.errors.name) {
                setFieldError("name", respons.response.data.errors.name);
              }
              if (
                respons.response &&
                respons.response.data.errors.passwordConfirm
              ) {
                setFieldError(
                  "passwordConfirm",
                  respons.response.data.errors.passwordConfirm
                );
              }
              if (respons.response && respons.response.data.errors.phone) {
                setFieldError("phone", respons.response.data.errors.phone);
              }

              return toast.error("errors occurred!");
            }

            toast.success("Check Your Email");
            history.replace("/login");
            return;
          }}
        >
          {({
            errors,
            touched,
            handleSubmit,
            dirty,
            isValid,
            setFieldValue,
          }) => {
            return (
              <Form onSubmit={handleSubmit} style={{ maxWidth: "80%" }}>
                <InputFormikMarerialUi
                  name="name"
                  label="Name*"
                  variant="outlined"
                  style={{ margin: "20px 0px 10px 0px" }}
                  error={errors.name && touched.name}
                  disabled={loding}
                />
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

                <InputFormikMarerialUi
                  name="passwordConfirm"
                  label="Confirm Password*"
                  variant="outlined"
                  type="password"
                  style={{ margin: "10px 0px 10px 0px" }}
                  error={errors.passwordConfirm && touched.passwordConfirm}
                  disabled={loding}
                />
                <InputFormikMarerialUi
                  name="phone"
                  label="Phone*"
                  variant="outlined"
                  style={{ margin: "10px 0px 10px 0px" }}
                  error={errors.phone && touched.phone}
                  disabled={loding}
                />
                <Autocomplete
                  id="asynchronous-demo"
                  open={openCities}
                  onClose={() => {
                    setOpenCities(false);
                  }}
                  options={citiesOptions}
                  onChange={(e, value: any) => {
                    setFieldValue("city", value ? value : "");
                    setOpenCities(false);
                  }}
                  noOptionsText={"There is no result. Try something else"}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      label="city*"
                      variant="outlined"
                      name="city"
                      helperText={<ErrorMessage name="city" />}
                      error={errors.city && touched.city}
                      onKeyUp={() => {
                        if (params.inputProps.value !== "") {
                          setOpenCities(true);
                        } else {
                          setOpenCities(false);
                        }
                      }}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: params.InputProps.endAdornment,
                      }}
                    />
                  )}
                />

                <InputFormikMarerialUi
                  name="street"
                  label="Street*"
                  variant="outlined"
                  style={{ margin: "20px 0px 10px 0px" }}
                  error={errors.street && touched.street}
                  disabled={loding}
                />
                <Box display="flex">
                  <InputFormikMarerialUi
                    name="houseNumber"
                    label="House Number*"
                    variant="outlined"
                    style={{ margin: "20px 10px 10px 0px" }}
                    error={errors.houseNumber && touched.houseNumber}
                    disabled={loding}
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <InputFormikMarerialUi
                    name="floor"
                    label="Floor*"
                    variant="outlined"
                    style={{ margin: "20px 10px 10px 10px" }}
                    error={errors.floor && touched.floor}
                    disabled={loding}
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <InputFormikMarerialUi
                    name="ApartmentNumber"
                    label="Apartment number*"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="number"
                    variant="outlined"
                    style={{ margin: "20px 0px 10px 10px" }}
                    error={errors.ApartmentNumber && touched.ApartmentNumber}
                    disabled={loding}
                  />
                </Box>

                <Box
                  width="100%"
                  display="flex"
                  justifyContent="space-around"
                  my={5}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!dirty || !isValid || loding}
                  >
                    {loding ? <CircularProgress /> : "SignUp"}
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loding}
                    component={Link}
                    to="/login"
                  >
                    Back
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

export default SignUp;
