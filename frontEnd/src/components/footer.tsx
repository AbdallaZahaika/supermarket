import { Box, Typography, makeStyles, Theme } from "@material-ui/core";
import {} from "@material-ui/icons";
export interface FooterProps {}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginTop: 25,
    fontFamily: "serif",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      fontSize: 30,
    },
  },
}));
const Footer: React.FC<FooterProps> = () => {
  const classes = useStyles();
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      bgcolor="#188973"
      height="300px"
    >
      <Typography align="center" variant="h4" className={classes.title}>
        copyright © Abdalla Zahaika
      </Typography>
    </Box>
  );
};

export default Footer;
