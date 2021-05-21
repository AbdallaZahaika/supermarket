/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  CircularProgress,
} from "@material-ui/core";
import { AddShoppingCart, Edit, Delete, LocalOffer } from "@material-ui/icons";
import { Form, Formik, Field } from "formik";
import { ITEM } from "../../../store/items/itemsTypes";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../../store";
import { new_item_in_cart } from "../../../store/cart/cartActions";
import {
  deleteItem,
  removeImageFromServer,
  setItems,
} from "../../../store/items/itemsActions";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import ReadMore from "../ReadMore";
import { serverUrl } from "../../../services/serverUrl.json";
export interface publicCardProps {
  itemInfo: ITEM;
}

const useStyles = makeStyles({
  card: {
    width: 300,
    minHeight: 370,
    margin: 20,
  },
  media: {
    height: 200,
  },
});
/////////// Formik initialValues
const initialValues = {
  quantity: 1,
};

/////////// Formik validationSchema
const schema = Yup.object({
  quantity: Yup.number().required(""),
});

const PublicCard: React.FC<publicCardProps> = ({ itemInfo }) => {
  const { user } = useSelector((state: RootStore) => state.user);
  const [loadingImage, setLoadingImage] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<string>(
    serverUrl + itemInfo.image.file.path
  );
  const [qutInStore] = React.useState<Array<number>>(
    Array.from(Array(itemInfo.quantityInStore).keys())
  );
  React.useEffect(() => {
    setLoadingImage(true);
    const img = new Image();
    img.src = image;
    img.onload = function () {
      return setLoadingImage(false);
    };
    return () => {
      setImage("");
    };
  }, []);
  const dispatch = useDispatch();
  const classes = useStyles();
  const location = useLocation();

  const handleDeleteItem = async (_id: string) => {
    if (window.confirm(`do you want delet this Item`)) {
      await dispatch(deleteItem(_id));
      await dispatch(removeImageFromServer(itemInfo.image));
      toast.success(`Item is deleted`);
      dispatch(setItems(location.pathname.substring(1), itemInfo.category));
    }
  };

  return (
    <Card className={classes.card}>
      <Box position="relative">
        {!loadingImage ? (
          <CardMedia
            className={classes.media}
            image={image}
            title={itemInfo.name}
          />
        ) : (
          <Box
            className={classes.media}
            display="flex"
            justifyContent="center"
            width="100%"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        )}
        {itemInfo.discount ? (
          <Box
            position="absolute"
            top="5px"
            left="5px"
            textAlign="center"
            borderRadius="50%"
            display="flex"
          >
            <LocalOffer htmlColor="green" fontSize="large" />
            <Typography style={{ color: "green" }} variant="h6">
              {itemInfo.discount}%
            </Typography>
          </Box>
        ) : (
          ""
        )}
      </Box>
      <CardContent style={{ minHeight: 150 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {itemInfo.name}
        </Typography>
        {itemInfo.description ? <ReadMore text={itemInfo.description} /> : ""}
      </CardContent>

      <CardActions
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {itemInfo.quantityInStore ? (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={(values) => {
                dispatch(new_item_in_cart(values.quantity, itemInfo));
                toast.success("item is added to cart");
                return;
              }}
            >
              {({ handleSubmit, values }) => {
                return (
                  <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      width="100%"
                      alignItems="center"
                    >
                      <Box>
                        <IconButton
                          style={{ marginTop: 8, marginRight: 10 }}
                          type="submit"
                        >
                          <AddShoppingCart htmlColor="#000" />
                        </IconButton>
                        <FormControl>
                          <InputLabel
                            style={{
                              color: "#000",
                            }}
                          >
                            quantity
                          </InputLabel>
                          <Field as={Select} name="quantity">
                            {qutInStore.map((i: number) => {
                              if (i < 15) {
                                return (
                                  <MenuItem key={i + 1} value={i + 1}>
                                    {i + 1}
                                  </MenuItem>
                                );
                              }
                              return i;
                            })}
                          </Field>
                        </FormControl>
                      </Box>
                      <Box display="flex">
                        {itemInfo.soldBy === "kg" ? (
                          <Box display="flex">
                            <Typography variant="body1">
                              {1 * values.quantity}Kg
                            </Typography>
                          </Box>
                        ) : (
                          ""
                        )}
                        {itemInfo.discount ? (
                          <Box display="flex">
                            <Typography
                              variant="body1"
                              style={{
                                color: "green",
                                margin: "0px 10px 0px 10px",
                              }}
                            >
                              ₪
                              {(
                                itemInfo.price *
                                values.quantity *
                                ((100 - itemInfo.discount) / 100)
                              ).toFixed(2)}
                            </Typography>
                            <Typography
                              variant="body1"
                              style={{
                                textDecoration: "line-through",
                                color: "red",
                                margin: "0px 10px 0px 10px",
                              }}
                            >
                              ₪{itemInfo.price * values.quantity}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography
                            variant="body1"
                            style={{
                              color: "green",
                              margin: "0px 10px 0px 10px",
                            }}
                          >
                            ₪{itemInfo.price * values.quantity}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        ) : (
          <Typography color="error" align="center">
            item is out of stock
          </Typography>
        )}
        {user && user.admin && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <IconButton component={Link} to={`/edit-item/${itemInfo._id}`}>
              <Edit htmlColor="#000" />
            </IconButton>
            <IconButton onClick={() => handleDeleteItem(itemInfo._id)}>
              <Delete color="error" />
            </IconButton>
          </Box>
        )}
      </CardActions>
    </Card>
  );
};

export default PublicCard;
