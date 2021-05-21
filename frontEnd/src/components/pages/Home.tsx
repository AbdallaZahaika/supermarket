/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  makeStyles,
  Theme,
  Typography,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import React from "react";
import CategoryCard from "../common/cards/categoryCard";
import backGround1 from "../../images/finn-hackshaw-FQgI8AD-BSg-unsplash.jpg";
import backGround2 from "../../images/ja-ma--gOUx23DNks-unsplash.jpg";
import backGround3 from "../../images/nrd-D6Tu_L3chLE-unsplash.jpg";
import { serverUrl } from "../../services/serverUrl.json";
export interface HomeProps {}
const useStyles = makeStyles((theme: Theme) => ({
  backGround: {
    height: 800,
    backgroundSize: "cover",
    backgroundPosition: "center",
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
    [theme.breakpoints.down("md")]: {
      fontSize: 80,
      paddingTop: 0,
    },
  },
  categoriesTitle: {
    [theme.breakpoints.down("md")]: {
      fontSize: 40,
    },
  },
}));
const Home: React.FC<HomeProps> = () => {
  /// this is image array state
  const [image] = React.useState<Array<string>>([
    backGround1,
    backGround2,
    backGround3,
  ]);
  const [loadingImage, setLoadingImage] = React.useState<boolean>(false);

  /// this is  current Image Index  state
  const [currentImgIndex, setCurrentImgIndex] = React.useState<number>(0);

  React.useEffect(() => {
    setLoadingImage(true);
    const img = new Image();
    img.src = image[currentImgIndex];
    img.onload = function () {
      return setLoadingImage(false);
    };
  }, []);

  //// this function move to next image in the gallery
  const next = () => {
    setCurrentImgIndex((index) => {
      if (image.length - 1 === index) {
        return 0;
      }
      return index + 1;
    });
  };
  //// this function back to the previous image in the gallery
  const previous = () => {
    setCurrentImgIndex((index) => {
      if (currentImgIndex === 0) {
        return image.length - 1;
      }
      return index - 1;
    });
  };
  const classes = useStyles();
  return (
    <Box width="100%">
      {/* background */}
      {!loadingImage ? (
        <Box
          className={classes.backGround}
          style={{ backgroundImage: `url(${image[currentImgIndex]})` }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          {image.length > 1 && (
            <>
              {/* next */}
              <IconButton onClick={next}>
                <ArrowBackIos fontSize="large" style={{ color: "#fff" }} />
              </IconButton>
              {/* previous */}
              <IconButton onClick={previous}>
                <ArrowForwardIos fontSize="large" style={{ color: "#fff" }} />
              </IconButton>
            </>
          )}
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
      <Box
        my={15}
        display="flex"
        width="100%"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h3" className={classes.categoriesTitle}>
          Cleaning Supplies
        </Typography>
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
        >
          <CategoryCard
            card={{
              path: "cleaningSupplies/floor-cleaning",
              image: {
                file: {
                  path:
                    "https://images.unsplash.com/photo-1550963295-019d8a8a61c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
                },
              },
            }}
          />

          <CategoryCard
            card={{
              path: "cleaningSupplies/washing-powder",
              image: {
                file: {
                  path: `${
                    serverUrl + "/public/items/IMG_9131-1620637928732.JPG"
                  }`,
                },
              },
            }}
          />
        </Box>
      </Box>
      <Box
        my={15}
        display="flex"
        width="100%"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h3" className={classes.categoriesTitle}>
          Drinks
        </Typography>
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
        >
          <CategoryCard
            card={{
              path: "drinks/soft-drinks",
              image: {
                file: {
                  path:
                    "https://images.unsplash.com/photo-1609857545224-d1246e91588b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
                },
              },
            }}
          />

          <CategoryCard
            card={{
              path: "drinks/juice",
              image: {
                file: {
                  path:
                    "https://images.unsplash.com/photo-1598871270151-656ee613656b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=635&q=80",
                },
              },
            }}
          />

          <CategoryCard
            card={{
              path: "drinks/water",
              image: {
                file: {
                  path:
                    "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1493&q=80",
                },
              },
            }}
          />
        </Box>
      </Box>
      <Box
        my={15}
        display="flex"
        width="100%"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h3" className={classes.categoriesTitle}>
          Chocolate&Snacks
        </Typography>
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
        >
          <CategoryCard
            card={{
              path: "chocolateAndsnacks/chocolate",
              image: {
                file: {
                  path:
                    "https://images.unsplash.com/photo-1566565286951-f81c7ba5619d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
                },
              },
            }}
          />

          <CategoryCard
            card={{
              path: "chocolateAndsnacks/snacks",
              image: {
                file: {
                  path:
                    "https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
                },
              },
            }}
          />
        </Box>
      </Box>
      <Box
        my={15}
        display="flex"
        width="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3" className={classes.categoriesTitle}>
          Canned
        </Typography>
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
        >
          <CategoryCard
            card={{
              path: "canned/sauce",
              image: {
                file: {
                  path:
                    "https://images.unsplash.com/photo-1519666213631-be6e024eac6a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=644&q=80",
                },
              },
            }}
          />

          <CategoryCard
            card={{
              path: "canned/canned",
              image: {
                file: {
                  path:
                    "https://images.unsplash.com/photo-1609607285694-e283bd2ea9a0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
