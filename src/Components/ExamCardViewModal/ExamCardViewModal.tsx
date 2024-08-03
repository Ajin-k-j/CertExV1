import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Define the prop types
interface ExamCardViewModalProps {
  open: boolean;
  onClose: () => void;
  borderColor: string;
  certificationName: string;
  provider: string;
  level: "Beginner" | "Intermediate" | "Expert";
  description: string;
  tags: string[];
  officialLink: string;
  onNominate: () => void;
}

const ExamCardViewModal: React.FC<ExamCardViewModalProps> = ({
  open,
  onClose,
  borderColor,
  certificationName,
  provider,
  level,
  description,
  tags,
  officialLink,
  onNominate,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTop: `4px solid ${borderColor}`,
          borderRadius: "10px",
          padding: "10px",
          minWidth: "300px",
        },
      }}
    >
      <DialogTitle sx={{ borderRadius: "10px 10px 0 0" }}>
        {certificationName}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Provider:</strong> {provider}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Level:</strong>{" "}
            <span style={{ color: borderColor }}>{level}</span>
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Description:</strong> {description}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Tags:</strong> {tags.join(", ")}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <a href={officialLink} target="_blank" rel="noopener noreferrer">
              Want to learn more about the certification?
            </a>
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={onNominate} color="primary" variant="contained">
          Nominate for Certification
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExamCardViewModal;
