import React from "react";
import {
  Box,
  Typography,
  InputAdornment,
  Button,
  CircularProgress,
  Theme,
  makeStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store";
import { toast } from "react-toastify";
import InputFormikMarerialUi from "./common/inputs/InputFormikMarerialUi";
import * as Yup from "yup";
import SingleFileUploadField from "./common/uploadImage/SingleFileUploadField";
import { createItem, setImageFromServer } from "../store/items/itemsActions";
import { useHistory } from "react-router-dom";
import { NEW_ITEM_INTERFACE } from "../store/items/itemsTypes";
export interface CreateItemProps {}

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
  name: string;
  description: string;
  image: Array<{ file: object; errors: object }>;
  price: number;
  quantity: number;
  type: string;
  discount: number;
  soldBy: string;
  category: string;
}

/////////// Formik initialValues
const initialValues: MyFormValues = {
  name: "",
  price: 1,
  description: "",
  image: [{ file: {}, errors: {} }],
  quantity: 1,
  type: "chocolateAndsnacks",
  discount: 0,
  soldBy: "byOne",
  category: "",
};

/////////// Formik validationSchema
const schema = Yup.object({
  name: Yup.string()
    .min(2, `name must be longer than 2 characters`)
    .max(300, `name must be shorter than 300 characters`)
    .required(`this required`),

  image: Yup.array()
    .of(
      Yup.object().shape({
        file: Yup.mixed(),
        errors: Yup.array().max(0),
      })
    )
    .min(1, `you can upload one image only`)
    .max(1, `you can upload one image only`)
    .required(`this required`),

  description: Yup.string()
    .min(2, `description must be longer than 2 characters`)
    .max(1000, `description must be shorter than 1000 characters`),
  price: Yup.number()
    .min(0.1, `the minimum price 0.1`)
    .required(`this required`),
  quantity: Yup.number()
    .min(1, `the minimum quantity 1`)
    .required(`this required`),
  type: Yup.string().required(`this required`),
  soldBy: Yup.string().required(`this required`),
  category: Yup.string().required(`this required`),
  discount: Yup.number()
    .min(0, `the minimum discount 0%`)
    .max(100, `the maximum discount 100%`),
});

const CreateItem: React.FC<CreateItemProps> = () => {
  const { loading } = useSelector((state: RootStore) => state.items);
  const dispatch = useDispatch();
  const history = useHistory();
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
        Create New Item
      </Typography>
      <Box
        maxWidth="500px"
        display="flex"
        alignItems="center"
        flexDirection="column"
        boxShadow="0px 0px 4px rgba(0,0,0,0.5)"
        minHeight="40vh"
        borderRadius={7}
        my={9}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={async (values, { setFieldError, resetForm }) => {
            let dataBody: NEW_ITEM_INTERFACE = {
              name: values.name,
              price: values.price,
              type: values.type,
              quantityInStore: values.quantity,
              discount: values.discount,
              image: {
                file: {
                  path: "",
                },
              },
              soldBy: values.soldBy,
              category: values.category,
            };

            if (values.description) {
              dataBody.description = values.description;
            }

            let formData = new FormData();
            const img: any = values.image[0].file;
            formData.append("image", img);

            // image code////////////
            const res: any = await dispatch(setImageFromServer(formData));
            if (res.response && res.response.status === 400) {
              if (res.response.data.errors) {
                setFieldError("image", res.response.data.errors);
              }
              return toast.error("errors occurred!");
            }
            dataBody.image = res;

            // return errors/////////////////////////////////////
            const respons: any = await dispatch(createItem(dataBody));
            if (
              (respons.response && respons.response.status === 400) ||
              (respons.response && respons.response === undefined)
            ) {
              if (respons.response && respons.response.data.errors.name) {
                setFieldError("name", respons.response.data.errors.name);
              }
              if (
                respons.response &&
                respons.response.data.errors.description
              ) {
                setFieldError(
                  "description",
                  respons.response.data.errors.description
                );
              }
              if (respons.response && respons.response.data.errors.price) {
                setFieldError("price", respons.response.data.errors.price);
              }
              if (respons.response && respons.response.data.errors.type) {
                setFieldError("type", respons.response.data.errors.type);
              }
              if (respons.response && respons.response.data.errors.quantity) {
                setFieldError(
                  "quantity",
                  respons.response.data.errors.quantity
                );
              }
              if (respons.response && respons.response.data.errors.discount) {
                setFieldError(
                  "discount",
                  respons.response.data.errors.discount
                );
              }

              if (respons.response && respons.response.data.errors.soldBy) {
                setFieldError("soldBy", respons.response.data.errors.soldBy);
              }
              if (respons.response && respons.response.data.errors.image) {
                setFieldError("image", respons.response.data.errors.image);
              }
              if (respons.response && respons.response.data.errors.category) {
                setFieldError(
                  "category",
                  respons.response.data.errors.category
                );
              }
              return toast.error("errors occurred!");
            }

            toast.success("create Item successed");
            resetForm();
            history.push("/" + values.type);
            return;
          }}
        >
          {({ errors, touched, handleSubmit, dirty, isValid, values }) => {
            return (
              <Form onSubmit={handleSubmit} style={{ maxWidth: "80%" }}>
                <InputFormikMarerialUi
                  name="name"
                  label="Name*"
                  variant="outlined"
                  style={{ margin: "20px 0px 10px 0px" }}
                  error={errors.name && touched.name}
                  disabled={loading}
                />
                <InputFormikMarerialUi
                  name="description"
                  label="Description"
                  variant="outlined"
                  style={{ margin: "10px 0px 10px 0px" }}
                  error={errors.description && touched.description}
                  disabled={loading}
                />
                <FormControl
                  style={{ width: "100%", margin: "10px 0px 10px 0px" }}
                >
                  <InputLabel
                    style={{
                      color: "#000",
                    }}
                  >
                    Type*
                  </InputLabel>
                  <Field as={Select} name="type" disabled={loading}>
                    <MenuItem value="chocolateAndsnacks">
                      chocolate&snacks
                    </MenuItem>
                    <MenuItem value="canned">canned</MenuItem>
                    <MenuItem value="cleaningSupplies">
                      cleaningSupplies
                    </MenuItem>
                    <MenuItem value="drinks">drinks</MenuItem>
                    <MenuItem value="fruits">fruits</MenuItem>
                    <MenuItem value="oils">oils</MenuItem>
                    <MenuItem value="vegetables">vegetables</MenuItem>
                  </Field>
                </FormControl>
                <FormControl
                  style={{ width: "100%", margin: "10px 0px 10px 0px" }}
                >
                  <InputLabel
                    style={{
                      color: "#000",
                    }}
                  >
                    Category*
                  </InputLabel>
                  {values.type === "chocolateAndsnacks" ? (
                    <Field as={Select} name="category" disabled={loading}>
                      <MenuItem value="chocolate">Chocolate</MenuItem>
                      <MenuItem value="snacks">Snacks</MenuItem>
                    </Field>
                  ) : values.type === "canned" ? (
                    <Field as={Select} name="category" disabled={loading}>
                      <MenuItem value="Sauce">Sauce</MenuItem>
                      <MenuItem value="canned">Canned</MenuItem>
                    </Field>
                  ) : values.type === "cleaningSupplies" ? (
                    <Field as={Select} name="category" disabled={loading}>
                      <MenuItem value="washing-powder">Washing Powder</MenuItem>
                      <MenuItem value="floor-cleaning">Floor Cleaning</MenuItem>
                    </Field>
                  ) : values.type === "drinks" ? (
                    <Field as={Select} name="category" disabled={loading}>
                      <MenuItem value="juice">Juice</MenuItem>
                      <MenuItem value="soft-drinks">Soft Drinks</MenuItem>
                      <MenuItem value="water">water</MenuItem>
                    </Field>
                  ) : values.type === "fruits" ? (
                    <Field as={Select} name="category" disabled={loading}>
                      <MenuItem value="fruits">fruits</MenuItem>
                    </Field>
                  ) : values.type === "oils" ? (
                    <Field as={Select} name="category" disabled={loading}>
                      <MenuItem value="oils">oils</MenuItem>
                    </Field>
                  ) : values.type === "vegetables" ? (
                    <Field as={Select} name="category" disabled={loading}>
                      <MenuItem value="vegetables">vegetables</MenuItem>
                    </Field>
                  ) : (
                    <Field as={Select} name="category" disabled={true}>
                      <MenuItem value="no category exist">
                        no category exist
                      </MenuItem>
                    </Field>
                  )}
                </FormControl>

                <FormControl
                  style={{ width: "100%", margin: "10px 0px 10px 0px" }}
                >
                  <InputLabel
                    style={{
                      color: "#000",
                    }}
                  >
                    Sold by*
                  </InputLabel>
                  <Field as={Select} name="soldBy" disabled={loading}>
                    <MenuItem value="byOne">One</MenuItem>
                    <MenuItem value="kg">kg</MenuItem>
                  </Field>
                </FormControl>

                <InputFormikMarerialUi
                  name="quantity"
                  label="Quantity*"
                  variant="outlined"
                  type="number"
                  style={{ margin: "10px 0px 10px 0px" }}
                  error={errors.quantity && touched.quantity}
                  disabled={loading}
                />
                <InputFormikMarerialUi
                  name="price"
                  label="Price*"
                  type="number"
                  variant="outlined"
                  error={errors.price && touched.price}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">₪</InputAdornment>
                    ),
                  }}
                  disabled={loading}
                  style={{ margin: "10px 0px 10px 0px" }}
                />
                <InputFormikMarerialUi
                  name="discount"
                  label="Discount"
                  type="number"
                  variant="outlined"
                  error={errors.discount && touched.discount}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                  disabled={loading}
                  style={{ margin: "10px 0px 10px 0px" }}
                />
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                >
                  <Typography variant="body1">Price After Discount</Typography>
                  <Typography variant="body1" style={{ color: "green" }}>
                    ₪
                    {(values.price * ((100 - values.discount) / 100)).toFixed(
                      2
                    )}
                  </Typography>
                </Box>
                <Box my={2}>
                  <Typography variant="h5" align="center">
                    upload Item image*
                  </Typography>
                  <Typography variant="body2" align="center">
                    you can upload one image only
                  </Typography>
                </Box>
                <SingleFileUploadField name="image" disabled={loading} />
                <Box display="flex" justifyContent="center">
                  {errors.image && values.image.length >= 1 && (
                    <Typography color="error" style={{ marginBottom: 10 }}>
                      {typeof errors.image !== "object" && errors.image}
                    </Typography>
                  )}
                </Box>
                <Box width="100%" display="flex" justifyContent="center" my={5}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!dirty || !isValid || loading}
                  >
                    {loading ? <CircularProgress /> : "Create"}
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

export default CreateItem;
