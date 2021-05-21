import {
  makeStyles,
  Box,
  Typography,
  Grid,
  Container,
  Button,
  Paper,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootStore } from "../store";
import React from "react";
import CartCard from "./common/cards/cartCard";
import { toast } from "react-toastify";
export interface CartProps {}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: "100%",
    marginTop: 15,
    marginBottom: 15,
  },
}));

const Cart: React.FC<CartProps> = () => {
  const { items } = useSelector((state: RootStore) => state.cart);
  const [total, setTotal] = React.useState<number>(0);
  React.useEffect(() => {
    const reducer = (accumulator: number, currentValue: number) =>
      accumulator + currentValue;

    if (items && items.length) {
      let priceArr = items.map((item: any) => item.price * item.quantity);
      setTotal(priceArr.reduce(reducer));
    } else {
      setTotal(0);
    }
  }, [items]);
  const classes = useStyles();

  return (
    <Container maxWidth="lg" style={{ minHeight: "100vh" }}>
      <Grid
        container
        justify="center"
        spacing={2}
        style={{ marginTop: 50, marginBottom: 50 }}
      >
        {items && items.length ? (
          <Grid
            item
            xs={12}
            sm={12}
            lg={8}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {items.map((item) => (
              <CartCard item={item} key={item._id} />
            ))}
          </Grid>
        ) : (
          <Grid item xs={12} sm={12} lg={8}>
            <Paper className={classes.paper}>
              <Typography variant="h6" align="center">
                you don't have any item in cart go to add any item
              </Typography>
            </Paper>
          </Grid>
        )}
        <Grid item xs={12} sm={12} lg={4}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            bgcolor="#F3F3F3"
            height="200px"
            boxShadow="0px 0px 5px rgba(0,0,0,0.5)"
            borderRadius={5}
          >
            <Typography variant="h6" align="center" style={{ marginTop: 20 }}>
              CART TOTALS
            </Typography>
            <Box display="flex" mb={3}>
              <Typography variant="h6" style={{ marginTop: 20 }}>
                Total:
              </Typography>
              <Typography
                variant="h6"
                style={{ marginTop: 20, marginLeft: 10, color: "green" }}
              >
                ₪{total}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={!Boolean(items && items.length)}
              onClick={() =>
                toast.success(
                  "for now you can't buy but so soon you will be can buy"
                )
              }
            >
              Next
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
