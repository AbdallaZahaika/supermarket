import { Typography } from "@material-ui/core";
import React from "react";
export interface ReadMoreProps {
  text: string;
  maxCharacterCount?: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({
  text,
  maxCharacterCount = 100,
}) => {
  const [open, setOpen] = React.useState(false);
  const resultString = open ? text : text.slice(0, maxCharacterCount);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <Typography component={"div"}>
      {resultString}
      {text.length >= 100 && (
        <Typography
          variant="body1"
          onClick={handleOpen}
          style={{ cursor: "pointer", margin: "8px 0px 5px 0px" }}
          color="primary"
        >
          {open ? "Read Less" : "Read More"}
        </Typography>
      )}
    </Typography>
  );
};

export default ReadMore;
