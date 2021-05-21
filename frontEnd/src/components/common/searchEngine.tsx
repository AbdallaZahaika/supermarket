import React from "react";
import {
  MenuItem,
  Box,
  Grid,
  FormControl,
  Select,
  InputLabel,
  Theme,
  makeStyles,
  Button,
  InputAdornment,
  Collapse,
  useMediaQuery,
  useTheme,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Settings } from "@material-ui/icons";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import InputFormikMarerialUi from "./inputs/InputFormikMarerialUi";
import { useDispatch, useSelector } from "react-redux";
import { search, searchValue } from "../../store/items/itemsActions";
import { RootStore } from "../../store";
export interface SortProps {
  pages: number;
  type: string;
  category?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  sort: {
    minWidth: 120,
    color: "#000",
    marginRight: 25,
  },
  containerInputSearch: {
    [theme.breakpoints.down("sm")]: {
      margin: "10px 0px 10px 0px",
    },
  },
  inputSearch: {
    padding: 10,
    color: "#000",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: 600,
    },
  },
  formControl: {
    margin: "10px 10px 0px 10px",
    minWidth: 120,
    maxWidth: 200,
    borderRadius: 4,
  },
  button: {
    marginTop: 10,
    [theme.breakpoints.down("sm")]: {
      marginBottom: 15,
    },
  },
}));

/////////// Formik initialValues
const initialValues = {
  sort: "All",
  searchInput: "",
  minPrice: "",
  maxPrice: "",
};

/////////// Formik validationSchema
const schema = Yup.object({
  sort: Yup.string().required(""),
  searchInput: Yup.string(),
  minPrice: Yup.string(),
  maxPrice: Yup.string(),
});

const SearchEngine: React.FC<SortProps> = ({ pages, type, category }) => {
  /// this state handle value if Advanced show or hide
  const [isVisible, setIsVisible] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { searchOptions } = useSelector((state: RootStore) => state.items);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleShowAdvanced = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Box mx={3}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          setOpen(false);
          const dataBody = { ...values, type, category };
          dispatch(search(dataBody));
          dispatch(searchValue(dataBody));
        }}
      >
        {({ errors, touched, handleSubmit, setFieldValue, submitForm }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Grid container justify="center" alignItems="center">
                <Grid
                  item
                  xs={12}
                  sm={12}
                  lg="auto"
                  className={classes.containerInputSearch}
                >
                  <Autocomplete
                    id="asynchronous-demo"
                    open={open}
                    onClose={() => {
                      setOpen(false);
                    }}
                    options={searchOptions}
                    onChange={(e, value: any) => {
                      submitForm();
                      setFieldValue("searchInput", value ? value : "");
                      setOpen(false);
                    }}
                    noOptionsText={"There is no result. Try something else"}
                    className={classes.inputSearch}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        placeholder="search....."
                        name="name"
                        variant="outlined"
                        onKeyUp={() => {
                          if (params.inputProps.value !== "") {
                            setOpen(true);
                          } else {
                            setOpen(false);
                          }
                        }}
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: params.InputProps.endAdornment,
                        }}
                      />
                    )}
                  />
                </Grid>
                {matches ? (
                  <Grid item xs="auto" sm="auto" lg="auto">
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={classes.button}
                      onClick={handleShowAdvanced}
                    >
                      <Settings style={{ marginRight: 5 }} /> Advanced
                    </Button>
                  </Grid>
                ) : (
                  ""
                )}

                {matches ? (
                  <Collapse in={isVisible}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      width="100%"
                      alignItems="center"
                    >
                      <Grid item xs={4} sm="auto" lg="auto">
                        <FormControl>
                          <InputLabel
                            style={{
                              color: "#000",
                            }}
                          >
                            Sort
                          </InputLabel>
                          <Field
                            as={Select}
                            name="sort"
                            className={classes.sort}
                          >
                            <MenuItem value="All" onClick={submitForm}>
                              All
                            </MenuItem>
                            <MenuItem value="Cheap" onClick={submitForm}>
                              Cheap
                            </MenuItem>
                            <MenuItem value="Expensive" onClick={submitForm}>
                              Expensive
                            </MenuItem>
                          </Field>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm="auto"
                        lg="auto"
                        style={{ display: "flex", marginTop: 15 }}
                      >
                        <FormControl className={classes.formControl}>
                          <InputFormikMarerialUi
                            name="minPrice"
                            label="Min Price"
                            type="number"
                            variant="outlined"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="end">
                                  ₪
                                </InputAdornment>
                              ),
                            }}
                            error={errors.minPrice && errors.minPrice}
                          />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <InputFormikMarerialUi
                            name="maxPrice"
                            label="Max Price"
                            type="number"
                            variant="outlined"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="end">
                                  ₪
                                </InputAdornment>
                              ),
                            }}
                            error={errors.maxPrice && touched.maxPrice}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs="auto" sm="auto" lg="auto">
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className={classes.button}
                        >
                          Search
                        </Button>
                      </Grid>
                    </Box>
                  </Collapse>
                ) : (
                  <>
                    <Grid item xs={4} sm="auto" lg="auto">
                      <FormControl>
                        <InputLabel
                          style={{
                            color: "#000",
                          }}
                        >
                          Sort
                        </InputLabel>
                        <Field as={Select} name="sort" className={classes.sort}>
                          <MenuItem value="All" onClick={submitForm}>
                            All
                          </MenuItem>
                          <MenuItem value="Cheap" onClick={submitForm}>
                            Cheap
                          </MenuItem>
                          <MenuItem value="Expensive" onClick={submitForm}>
                            Expensive
                          </MenuItem>
                        </Field>
                      </FormControl>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm="auto"
                      lg="auto"
                      style={{ display: "flex", marginTop: 15 }}
                    >
                      <FormControl className={classes.formControl}>
                        <InputFormikMarerialUi
                          name="minPrice"
                          label="Min Price"
                          type="number"
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="end">₪</InputAdornment>
                            ),
                          }}
                          error={errors.minPrice && errors.minPrice}
                        />
                      </FormControl>
                      <FormControl className={classes.formControl}>
                        <InputFormikMarerialUi
                          name="maxPrice"
                          label="Max Price"
                          type="number"
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="end">₪</InputAdornment>
                            ),
                          }}
                          error={errors.maxPrice && touched.maxPrice}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs="auto" sm="auto" lg="auto">
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.button}
                      >
                        Search
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default SearchEngine;
