/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Theme,
  makeStyles,
  IconButton,
  TextField,
} from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";
import { Check, Close, VpnKey } from "@material-ui/icons";
import { Form, Formik, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store";
import { toast } from "react-toastify";
import InputFormikMarerialUi from "./common/inputs/InputFormikMarerialUi";
import * as Yup from "yup";
import { editUser } from "../store/user/userActions";
import { Link, useHistory } from "react-router-dom";
import { cities } from "../services/addressOption.json";
export interface SettingsProps {}

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
  city: string;
  street: string;
  houseNumber: number | undefined;
  floor: number | undefined;
  ApartmentNumber: number | undefined;
  name: string;
  phone: string;
}

////////// schema reagex Phone
const phoneRegExp = /^0[2-9]\d{7,8}$/;

/////////// Formik validationSchema
const schema = Yup.object({
  name: Yup.string()
    .min(2, `company name must be longer than 2 characters`)
    .max(255, `company  name must be shorter than 255 characters`)
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

const Settings: React.FC<SettingsProps> = () => {
  const dispatch = useDispatch();
  const { user, loding } = useSelector((state: RootStore) => state.user);

  const [initialValues] = React.useState<MyFormValues>({
    ApartmentNumber: user.ApartmentNumber,
    city: user.city,
    floor: user.floor,
    houseNumber: user.houseNumber,
    street: user.street,
    name: user.name,
    phone: user.phone,
  });
  const history = useHistory();
  const [openCities, setOpenCities] = React.useState(false);

  const [citiesOptions] = React.useState<Array<string>>(cities);
  console.log(user.city);
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
        Settings
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
              name: values.name,
              phone: values.phone,
              city: values.city,
              street: values.street,
              houseNumber: values.houseNumber,
              floor: values.floor,
              ApartmentNumber: values.ApartmentNumber,
            };
            console.log(values.city);
            const respons: any = await dispatch(editUser(dataBody));
            //// return errors/////////////////////////////////////
            if (
              (respons.response && respons.response.status === 400) ||
              (respons.response && respons.response === undefined)
            ) {
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

              if (respons.response && respons.response.data.errors.phone) {
                setFieldError("phone", respons.response.data.errors.phone);
              }
              return toast.error("errors occurred!");
            }
            toast.success("Edit successed");
            history.push("/");
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
              <Form onSubmit={handleSubmit} style={{ width: "80%" }}>
                <InputFormikMarerialUi
                  name="name"
                  label="Name*"
                  variant="outlined"
                  style={{ margin: "20px 0px 10px 0px" }}
                  error={errors.name && touched.name}
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
                  defaultValue={user.city}
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
                      value="Acre"
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

                <Box width="100%" display="flex" justifyContent="center" my={5}>
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
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

                    <IconButton component={Link} to="/" disabled={loding}>
                      <Close color="error" fontSize="large" />
                    </IconButton>
                    <IconButton
                      component={Link}
                      to="/settings/change-password"
                      disabled={loding}
                    >
                      <Typography variant="body2">Change Password</Typography>
                      <VpnKey
                        htmlColor="	rgba(255,220,0,0.9)"
                        fontSize="large"
                      />
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

export default Settings;
