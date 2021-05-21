/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  makeStyles,
  Theme,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import {} from "@material-ui/icons";
import PublicCard from "../common/cards/publicCard";
import SearchEngine from "../common/searchEngine";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../store";
import backGround from "../../images/bath-oil-2510783_1920.jpg";
import {
  setItems,
  clearItemsState,
  search,
  searchOptions,
} from "../../store/items/itemsActions";
import { Link, useLocation } from "react-router-dom";
import React from "react";
export interface OilsProps {}
const useStyles = makeStyles((theme: Theme) => ({
  backGround: {
    width: "100%",
    height: 800,
    backgroundSize: "cover",
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
const Oils: React.FC<OilsProps> = () => {
  const dispatch = useDispatch();
  const { items, pages, searchVal, loading } = useSelector(
    (state: RootStore) => state.items
  );
  const { user } = useSelector((state: RootStore) => state.user);
  const classes = useStyles();
  const location = useLocation();
  const [loadingImage, setLoadingImage] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(setItems(location.pathname.substring(1)));
    dispatch(searchOptions(location.pathname.substring(1)));
    window.scrollTo(0, 0);
    return () => {
      dispatch(clearItemsState());
    };
  }, []);

  React.useEffect(() => {
    setLoadingImage(true);
    const img = new Image();
    img.src = backGround;
    img.onload = function () {
      return setLoadingImage(false);
    };
  }, []);

  /// handle Pages
  const handlePages = async (e: any, currentPage: number) => {
    const dataBody = { ...searchVal, type: location.pathname.substring(1) };
    dispatch(search(dataBody, currentPage - 1));
    const pageHeight = window.innerHeight;
    window.scrollTo(0, pageHeight);
  };

  return (
    <Box width="100%">
      {/* background */}

      {!loadingImage ? (
        <Box
          className={classes.backGround}
          style={{ backgroundImage: `url(${backGround})` }}
        >
          <Typography variant="h1" align="center" className={classes.title}>
            OIL
          </Typography>
        </Box>
      ) : (
        <Box
          className={classes.backGround}
          display="flex"
          justifyContent="center"
          width="100%"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      )}
      {/* header bar */}
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        boxShadow="0px 0px 6px rgba(0,0,0,0.8)"
        minHeight="100px"
        alignItems="center"
      >
        <SearchEngine pages={pages} type={location.pathname.substring(1)} />
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

export default Oils;
