/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  makeStyles,
  Theme,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import {} from "@material-ui/icons";
import PublicCard from "../common/cards/publicCard";
import SearchEngine from "../common/searchEngine";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../store";
import {
  setItems,
  clearItemsState,
  search,
  searchOptions,
} from "../../store/items/itemsActions";
import { Link, useParams } from "react-router-dom";
import React from "react";
export interface DrinksProps {}
const useStyles = makeStyles((theme: Theme) => ({
  backGround: {
    width: "100%",
    height: 800,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1589380370659-41c53425a885?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1351&q=80)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      height: 250,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  },
  title: {
    color: "green",
    paddingTop: 50,
    fontSize: 180,
    fontFamily: "serif",
    [theme.breakpoints.down("sm")]: {
      fontSize: 80,
      paddingTop: 0,
    },
  },
  msgNoItems: {
    fontFamily: "serif",
    [theme.breakpoints.down("sm")]: {
      fontSize: 30,
    },
  },
}));
const Drinks: React.FC<DrinksProps> = () => {
  const dispatch = useDispatch();
  const { items, pages, searchVal, loading } = useSelector(
    (state: RootStore) => state.items
  );
  const { user } = useSelector((state: RootStore) => state.user);
  const classes = useStyles();
  const { category } = useParams<{ category: string }>();
  React.useEffect(() => {
    dispatch(setItems("drinks", category));
    dispatch(searchOptions("drinks", category));
    window.scrollTo(0, 0);
    return () => {
      dispatch(clearItemsState());
    };
  }, [category]);
  /// handle Pages
  const handlePages = async (e: any, currentPage: number) => {
    const dataBody = { ...searchVal, type: "drinks" };
    dispatch(search(dataBody, currentPage - 1));
    const pageHeight = window.innerHeight;
    window.scrollTo(0, pageHeight);
  };

  return (
    <Box width="100%">
      {/* background */}
      <Box className={classes.backGround}>
        <Typography variant="h1" align="center" className={classes.title}>
          Drinks
        </Typography>
      </Box>
      {/* header bar */}
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        boxShadow="0px 0px 6px rgba(0,0,0,0.8)"
        minHeight="100px"
        alignItems="center"
      >
        <SearchEngine pages={pages} category={category} type={"drinks"} />
      </Box>
      {loading ? (
        <Box width="100%" display="flex" justifyContent="center" my={10}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {user.admin && (
            <Box display="flex" width="100%" justifyContent="center" mt={3}>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/create-item"
              >
                create new item
              </Button>
            </Box>
          )}
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            my={10}
            flexWrap="wrap"
          >
            {items.length ? (
              items.map((item) => <PublicCard key={item._id} itemInfo={item} />)
            ) : (
              <Paper elevation={3} style={{ padding: 10 }}>
                <Typography variant="h3" className={classes.msgNoItems}>
                  sorry we don't have any item
                </Typography>
              </Paper>
            )}
          </Box>
          <Box display="flex" justifyContent="center" mt={20} mb={5}>
            {items.length > 9 || pages > 1 ? (
              <Pagination
                count={pages}
                color="primary"
                onChange={handlePages}
              />
            ) : (
              ""
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Drinks;
