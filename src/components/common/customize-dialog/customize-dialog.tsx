import * as React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import "./customize-dialog.scss"

interface ICustomizeDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    content: any;
};

/** Renders customize dialog according to given props.*/
const CustomizeDialog: React.FC<ICustomizeDialogProps> = props => {
  const renderDialog = () => {
      return <Dialog onClose={() => {}} open={props.isOpen} maxWidth="lg">
      <DialogTitle className="customized-dialog-title">
        <span style={{fontWeight: 700, color: "#333333"}}>
          Ask a question
        </span>
      </DialogTitle>
      <DialogContent>
        <div className="customized-dialog-content">
          {props.content}
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.onSubmit} className="customized-dialog-button">
          Post question
        </Button>
      </DialogActions>
    </Dialog>
  }

  return renderDialog();
}

export default CustomizeDialog;