/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, makeStyles } from "@material-ui/core";
import { useField } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import { SingleFileUploadWithProgress } from "./SingleFileUploadWithProgress";
import { UploadError } from "./UploadError";

let currentId = 0;

function getNewId() {
  // we could use a fancier solution instead of a sequential ID :)
  return ++currentId;
}

export interface UploadableFile {
  id: number;
  file: File;
  errors: FileError[];
  url?: string;
}

const useStyles = makeStyles((theme) => ({
  dropzone: {
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.background.default,
    height: theme.spacing(10),
    outline: "none",
  },
}));

const MultipleFileUploadField = ({
  name,
  disabled,
  preImages,
}: {
  name: string;
  disabled: boolean;
  preImages?: any;
}) => {
  const [_, __, helpers] = useField(name);
  const classes = useStyles();
  const [files, setFiles] = useState<UploadableFile[]>([]);

  useEffect(() => {
    if (preImages && preImages[0].file) {
      setFiles(preImages);
    }
  }, [preImages]);

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({
      file,
      errors: [],
      id: getNewId(),
    }));
    const mappedRej = rejFiles.map((r) => ({ ...r, id: getNewId() }));
    setFiles((curr) => [...curr, ...mappedAcc, ...mappedRej]);
  }, []);

  useEffect(() => {
    helpers.setValue(files);
    // helpers.setTouched(true);
  }, [files]);

  function onDelete(file: File) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
  }
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/psd"],
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  });

  return (
    <React.Fragment>
      <Grid item>
        <div {...getRootProps({ className: classes.dropzone })}>
          <input {...getInputProps()} disabled={disabled ? disabled : false} />

          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </Grid>

      {files.map((fileWrapper, idx) => (
        <Grid item key={idx}>
          {fileWrapper.errors && fileWrapper.errors.length ? (
            <UploadError
              file={fileWrapper.file}
              errors={fileWrapper.errors}
              onDelete={onDelete}
              disabled={disabled ? disabled : false}
            />
          ) : (
            <SingleFileUploadWithProgress
              onDelete={onDelete}
              file={fileWrapper.file}
              disabled={disabled ? disabled : false}
            />
          )}
        </Grid>
      ))}
    </React.Fragment>
  );
};

export default MultipleFileUploadField;
