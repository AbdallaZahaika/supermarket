/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Grid,
  CardMedia,
  CircularProgress,
  Box,
} from "@material-ui/core";
import { serverUrl } from "../../../services/serverUrl.json";
import React from "react";
export interface FileHeaderProps {
  file: File | any;
  onDelete: (file: File) => void;
  disabled: boolean;
}

export function FileHeader({ file, onDelete, disabled }: FileHeaderProps) {
  const [loadingImage, setLoadingImage] = React.useState<boolean>(false);
  const [image] = React.useState<string>(
    file.size ? URL.createObjectURL(file) : ""
  );

  React.useEffect(() => {
    setLoadingImage(true);
    if (file.path) {
      const img = new Image();
      img.src = file.size ? image : serverUrl + file.path;
      img.onload = function () {
        return setLoadingImage(false);
      };
    }
  }, [file.path]);
  return (
    <Grid
      container
      justify="space-between"
      alignItems="center"
      style={{ marginTop: 10 }}
    >
      <Grid item>
        {!loadingImage && file.path ? (
          <CardMedia
            style={{ width: 100, height: 100 }}
            image={file.size ? image : serverUrl + file.path}
          />
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            width="100px"
            height="100px"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        )}
      </Grid>
      <Grid item>
        <Button
          size="small"
          onClick={() => onDelete(file)}
          color="secondary"
          disabled={disabled ? disabled : false}
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  );
}
