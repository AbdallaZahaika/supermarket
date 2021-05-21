/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Paper,
  Grid,
  CardMedia,
  Typography,
  Box,
  IconButton,
  makeStyles,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { AddBox, IndeterminateCheckBox, LocalOffer } from "@material-ui/icons";
import { ITEM_IN_CART } from "../../../store/cart/cartTypes";
import { useDispatch } from "react-redux";
import React from "react";
import {
  changeQuantity,
  remove_item_from_cart,
} from "../../../store/cart/cartActions";
import { serverUrl } from "../../../services/serverUrl.json";
export interface CartCardProps {
  item: ITEM_IN_CART;
}

const useStyles = makeStyles((theme) => ({
  media: {
    width: 100,
    height: 100,
  },
  paper: {
    padding: theme.spacing(2),
    width: "100%",
    marginTop: 15,
    marginBottom: 15,
  },

  containerImage: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
  },
  containerRemove: {
    [theme.breakpoints.down("md")]: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
  },
}));

const CartCard: React.FC<CartCardProps> = ({ item }) => {
  const classes = useStyles();
  const [loadingImage, setLoadingImage] = React.useState<boolean>(false);
  const [image] = React.useState<string>(
    item.image.file ? serverUrl + item.image.file.path : ""
  );
  React.useEffect(() => {
    setLoadingImage(true);
    const img = new Image();
    img.src = image;
    img.onload = function () {
      setLoadingImage(false);
    };
  }, []);
  const dispatch = useDispatch();
  const handleChangeQuantity = (
    _id: string,
    type: "decrement" | "increment"
  ) => {
    dispatch(changeQuantity(_id, type));
  };
  const handleRemoveItem = (_id: string) => {
    dispatch(remove_item_from_cart(_id));
  };
  return (
    <Paper className={classes.paper} key={item._id}>
      <Grid container spacing={2}>
        <Grid item className={classes.containerImage}>
          {!loadingImage ? (
            <CardMedia
              className={classes.media}
              image={image}
              title={item.name}
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
        </Grid>

        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Box display="flex" justifyContent="space-between">
                <Typography gutterBottom variant="subtitle1">
                  {item.discount ? (
                    <Box display="flex">
                      <LocalOffer htmlColor="green" />
                      <Typography style={{ color: "green" }} variant="h6">
                        {item.discount}%
                      </Typography>
                    </Box>
                  ) : (
                    ""
                  )}
                  {item.name}
                </Typography>
                <Box display="flex">
                  {item.soldBy === "kg" ? (
                    <Typography
                      gutterBottom
                      variant="body1"
                      style={{ margin: "0px 10px 0px 10px" }}
                    >
                      {1 * item.quantity}Kg
                    </Typography>
                  ) : (
                    ""
                  )}
                  {item.discount ? (
                    <Box display="flex">
                      <Typography
                        variant="body1"
                        style={{ color: "green", margin: "0px 10px 0px 10px" }}
                      >
                        ₪
                        {(
                          item.price *
                          item.quantity *
                          ((100 - item.discount) / 100)
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
                        ₪{item.price * item.quantity}
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
                      ₪{item.price * item.quantity}
                    </Typography>
                  )}
                </Box>
              </Box>

              <Box display="flex" alignItems="center">
                <IconButton
                  onClick={() => handleChangeQuantity(item._id, "increment")}
                  disabled={item.quantity >= item.quantityInStore}
                >
                  <AddBox
                    color={
                      item.quantity >= item.quantityInStore
                        ? "inherit"
                        : "primary"
                    }
                  />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton
                  onClick={() => handleChangeQuantity(item._id, "decrement")}
                  disabled={item.quantity === 1}
                >
                  <IndeterminateCheckBox
                    color={item.quantity === 1 ? "inherit" : "error"}
                  />
                </IconButton>
              </Box>
            </Grid>
            <Grid item md className={classes.containerRemove}>
              <Button
                style={{ cursor: "pointer", color: "red" }}
                onClick={() => handleRemoveItem(item._id)}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartCard;
