/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  Panelist,
  PanelistReviewStatus,
  UpdatePanelistInput,
  UserGender,
  useUpdatePanelistMutation,
} from "../../../generated";
import { Collapse, Grid, MenuItem, Select, Typography } from "@mui/material";
import CardComponent from "../../../components/common/CardComponent";
import { capitalizeFirstLetter, renderItem, mapEnums } from "../../../utils";
import { GRAPHQL_QUERY_POLICY } from "../../../constants";
import { useSnackbar } from "notistack";
import { yupResolver } from "@hookform/resolvers/yup";
import { PanelistUpdateSchema } from "../../../validationSchema";
import { updatePanelistHandler } from "../../../utils/project";
import CommonController from "../../../components/common/CommonController";
export type IPanelistInfo = {
  panelist?: Panelist;
  loading: boolean;
  refreshData: Function;
};

const PanelistInfo = ({ panelist, refreshData }: IPanelistInfo) => {
  const [edit, setEdit] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const [updatePanelist] = useUpdatePanelistMutation({
    ...(GRAPHQL_QUERY_POLICY as any),
    onError() {
      return null;
    },

    onCompleted(data) {
      const {
        updatePanelist: { response },
      } = data;
      if (response) {
        const { status, message } = response;
        if (status && status === 200 && message) {
          enqueueSnackbar(message);
          reset();
          refreshData();
          setEdit(false);
        }
      }
    },
  });

  useEffect(() => {
    if (panelist) {
      Object.keys(panelist).map((key) =>
        setValue(key as keyof Panelist, panelist[key as keyof Panelist])
      );
    }
  }, [panelist]);

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(PanelistUpdateSchema),
    defaultValues: panelist,
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
    setValue,
    watch,
  } = methods;

  const panelistReviewStatus = watch("panelistReviewStatus");

  const onSubmit: SubmitHandler<UpdatePanelistInput> = async (data) => {
    if (panelist && isDirty) {
      await updatePanelist({ variables: updatePanelistHandler(data) });
    }
  };

  useEffect(() => {
    if (!edit) {
      reset();
    }
  }, [edit, reset]);

  const handleActionEdit = () => {
    setEdit(!edit);
  };

  const { id, ipAddress, availablePoints } = panelist || {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardComponent
          cardTitle="Panelist Information"
          isEdit={edit}
          onEditClick={handleActionEdit}
          hasEdit
        >
          <Collapse in={edit} mountOnEnter unmountOnExit>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography fontWeight={600}>Birth Date</Typography>
                <CommonController
                  fieldType="text"
                  controllerName="dob"
                  controllerLabel="Birth Date"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography fontWeight={600}>Phone No.</Typography>
                <CommonController
                  fieldType="text"
                  controllerName="phone"
                  controllerLabel="Phone No."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography fontWeight={600}>Gender</Typography>
                <Controller
                  name="gender"
                  render={({ field }) => (
                    <Select {...field} fullWidth sx={{ my: 1 }}>
                      {Object.values(UserGender)?.map((tc, index) => (
                        <MenuItem key={index} value={tc}>
                          {capitalizeFirstLetter(tc)}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography fontWeight={600}>Address</Typography>
                <CommonController
                  fieldType="text"
                  controllerName="address"
                  controllerLabel="Address"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography fontWeight={600}>City</Typography>
                <CommonController
                  fieldType="text"
                  controllerName="city"
                  controllerLabel="City"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography fontWeight={600}>State</Typography>
                <CommonController
                  fieldType="text"
                  controllerName="state"
                  controllerLabel="State"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography fontWeight={600}>Zip Code</Typography>
                <CommonController
                  fieldType="text"
                  controllerName="zipCode"
                  controllerLabel="Zip Code"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography fontWeight={600}>Panelist Review</Typography>
                <Controller
                  name="panelistReviewStatus"
                  render={({ field }) => (
                    <Select {...field} fullWidth sx={{ my: 1 }}>
                      {Object.values(PanelistReviewStatus).map(
                        (status, index) => (
                          <MenuItem key={index} value={status}>
                            {mapEnums(status)}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  )}
                />
              </Grid>
              {(panelistReviewStatus === "BLOCKED" ||
                panelistReviewStatus === "UPDATE_NEEDED") && (
                  <Grid item xs={12} md={12}>
                    <Typography fontWeight={600}>Comment</Typography>
                    <CommonController
                      fieldType="text"
                      controllerName="comment"
                      controllerLabel="Comment"
                      isMultiLine={true}
                    />
                  </Grid>
                )}
            </Grid>
          </Collapse>

          <Collapse in={!edit} mountOnEnter unmountOnExit>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                {renderItem("Panel ID", `${id}`)}
              </Grid>

              <Grid item xs={12} md={6}>
                {renderItem("IP Address", `${ipAddress || "N/A"}`)}
              </Grid>

              <Grid item xs={12} md={6}>
                {renderItem("Available Points", `${availablePoints || "0"}`)}
              </Grid>

              <Grid item xs={12} md={6}>
                {renderItem("Birth Date", `${panelist?.dob}`)}
              </Grid>
              <Grid item xs={12} md={6}>
                {renderItem("Phone No.", `${panelist?.phone}`)}
              </Grid>
              <Grid item xs={12} md={6}>
                {renderItem("Gender", capitalizeFirstLetter(`${panelist?.gender}`))}
              </Grid>
              <Grid item xs={12} md={6}>
                {renderItem("Address", `${panelist?.address}`)}
              </Grid>
              <Grid item xs={12} md={6}>
                {renderItem("City", `${panelist?.city}`)}
              </Grid>
              <Grid item xs={12} md={6}>
                {renderItem("State", `${panelist?.state}`)}
              </Grid>
              <Grid item xs={12} md={6}>
                {renderItem("Zip Code", `${panelist?.zipCode}`)}
              </Grid>
              <Grid item xs={12} md={6}>
                {renderItem(
                  "Panelist Review Status",
                  `${mapEnums(panelist?.panelistReviewStatus || undefined)}`
                )}
              </Grid>
            </Grid>
          </Collapse>
        </CardComponent>
      </form>
    </FormProvider>
  );
};

export default PanelistInfo;
