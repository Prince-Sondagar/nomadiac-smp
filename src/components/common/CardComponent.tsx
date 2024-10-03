// packages block
import { FC } from "react";
import { Edit, Save, ArrowBack } from "@mui/icons-material";
import { Card, CardContent, CardHeader, colors, IconButton, Box } from "@mui/material";
// interfaces/types block
import { CardComponentType } from "../../interfaceTypes";

const CardComponent: FC<CardComponentType> = ({ children, cardTitle, isEdit, hasEdit, onEditClick, disableEditIcon, disableSaveIcon, hideSaveIcon, }): JSX.Element => {

  return (
    <Box pb={4}>
      <Card className="overflow-visible">
        <Box borderBottom={`1px solid ${colors.grey[300]}`} mb={2}>
          <CardHeader
            action={
              hasEdit && (
                <Box display="flex" alignItems="center">

                  {(isEdit ? (
                    <Box>
                      {!hideSaveIcon && (
                        <IconButton disabled={disableSaveIcon} type="submit" color="primary" aria-label="settings">
                          <Save />
                        </IconButton>
                      )}

                      <IconButton onClick={onEditClick} aria-label="settings">
                        <ArrowBack />
                      </IconButton>
                    </Box>
                  ) : (
                    <IconButton disabled={disableEditIcon} onClick={onEditClick} aria-label="settings">
                      <Edit />
                    </IconButton>
                  ))}
                </Box>
              )
            }

            title={
              <Box display="flex" alignItems="center">
                {cardTitle}
              </Box>
            }
          />
        </Box>

        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
};

export default CardComponent;
