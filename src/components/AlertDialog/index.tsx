import * as React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { AlertDialogType } from "../../utility/types";
import LoadingButton from "@mui/lab/LoadingButton";

const AlertDialog = ({
  open,
  title,
  body,
  okButtonText,
  closeButtonText,
  handleClose,
  handleConfirm,
  loading,
}: AlertDialogType) => {
  const [closeLoading, setCloseLoading] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const handleConfirmClick = async () => {
    setConfirmLoading(true);
    await handleConfirm();
    setConfirmLoading(false);
  };

  const handleCloseClick = async () => {
    setCloseLoading(true);
    await handleClose();
    setCloseLoading(false);
  };

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
          <LoadingButton loading={closeLoading} onClick={handleCloseClick}>
            {closeButtonText}
          </LoadingButton>
          <LoadingButton
            loading={confirmLoading}
            onClick={handleConfirmClick}
            autoFocus
          >
            {okButtonText}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AlertDialog;
