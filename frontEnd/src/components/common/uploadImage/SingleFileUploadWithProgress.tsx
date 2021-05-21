import { Grid, LinearProgress } from "@material-ui/core";
import { FileHeader } from "./FileHeader";

export interface SingleFileUploadWithProgressProps {
  file: File;
  onDelete: (file: File) => void;
  disabled: boolean;
}

export function SingleFileUploadWithProgress({
  file,
  onDelete,
  disabled,
}: SingleFileUploadWithProgressProps) {
  return (
    <Grid item>
      <FileHeader
        file={file}
        onDelete={onDelete}
        disabled={disabled ? disabled : false}
      />
      <LinearProgress variant="determinate" value={100} />
    </Grid>
  );
}
