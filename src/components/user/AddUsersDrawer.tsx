//packages block
import { FC, forwardRef } from 'react';
import { Box, Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import UserForm from './UserForm';
import { UserFormPropsType } from '../../interfaceTypes';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const AddUserDialog: FC<UserFormPropsType> = ({ open, setOpen, refreshList, name }): JSX.Element => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => { }}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box p={3}>
        <UserForm
          setOpen={setOpen}
          open={open}
          refreshList={refreshList}
          name={name}
        />
      </Box>
    </Dialog>
  );
}

export default AddUserDialog;