import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { AlertDialogType } from '../../utility/types';

const AlertDialog = ({
    open,
    title,
    body,
    okButtonText,
    closeButtonText,
    handleClose,
    handleConfirm
}: AlertDialogType) => {

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> { closeButtonText }</Button>
          <Button onClick={handleConfirm} autoFocus>
            { okButtonText }
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AlertDialog;