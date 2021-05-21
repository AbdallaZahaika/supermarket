import {
  createStyles,
  LinearProgress,
  Typography,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { FileError } from "react-dropzone";
import { FileHeader } from "./FileHeader";

export interface UploadErrorProps {
  file: File;
  onDelete: (file: File) => void;
  errors: FileError[];
  disabled: boolean;
}

const ErrorLinearProgress = withStyles((theme) =>
  createStyles({
    bar: {
      backgroundColor: theme.palette.error.main,
    },
  })
)(LinearProgress);

export function UploadError({
  file,
  onDelete,
  errors,
  disabled,
}: UploadErrorProps) {
  return (
    <React.Fragment>
      <FileHeader
        file={file}
        onDelete={onDelete}
        disabled={disabled ? disabled : false}
      />
      <ErrorLinearProgress variant="determinate" value={100} />
      {errors.map((error) => (
        <div key={error.code}>
          <Typography color="error">{error.message}</Typography>
        </div>
      ))}
    </React.Fragment>
  );
}
