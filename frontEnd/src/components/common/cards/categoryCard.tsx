/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  CardActionArea,
  CardMedia,
  makeStyles,
  Box,
  CircularProgress,
} from "@material-ui/core";
// import { serverUrl } from "../../../services/serverUrl.json";
import React from "react";
import { useHistory } from "react-router-dom";
export interface CategoryCardProps {
  card: { path: string; image: { file: { path: string } } };
}

const useStyles = makeStyles({
  media: {
    width: 200,
    height: 200,
  },
});

const CategoryCard: React.FC<CategoryCardProps> = ({ card }) => {
  const [loadingImage, setLoadingImage] = React.useState<boolean>(false);
  // const [image] = React.useState<string>(serverUrl + card.image.file.path);
  const [image] = React.useState<string>(card.image.file.path);
  const history = useHistory();
  React.useEffect(() => {
    setLoadingImage(true);
    const img = new Image();
    img.src = image;
    img.onload = function () {
      setLoadingImage(false);
    };
  }, []);

  const classes = useStyles();
  return (
    <Card style={{ margin: 20 }}>
      <CardActionArea onClick={() => history.push("/" + card.path)}>
        {!loadingImage ? (
          <CardMedia
            className={classes.media}
            image={image}
            title={card.path}
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
      </CardActionArea>
    </Card>
  );
};

export default CategoryCard;
