import React from "react";
import { Button, Alert } from "@mui/material/";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function SimpleSnackbar({ open, setOpen, text, status }) {


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <Button size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      action={action}
    >
      <Alert
        onClose={handleClose}
        severity={status}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
}
