import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NominationFormModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
  certificationName: string;
}

const NominationFormModal: React.FC<NominationFormModalProps> = ({
  open,
  onClose,
  id,
  certificationName,
}) => {
  const [plannedExamMonth, setPlannedExamMonth] = useState("");
  const [motivation, setMotivation] = useState("");
  const [financialYear, setFinancialYear] = useState<{ from_date: string; to_date: string } | null>(null);

  useEffect(() => {
    const fetchFinancialYear = async () => {
      try {
        const response = await axios.get<{ from_date: string; to_date: string }[]>("http://localhost:5000/financial_years");
        setFinancialYear(response.data[0] || null); // Assuming there's only one record
      } catch (error) {
        console.error("Error fetching financial year:", error);
      }
    };

    fetchFinancialYear();
  }, []);

  const handleSubmit = async () => {
    if (!plannedExamMonth || !motivation) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const getEmployeeId = () => 123; // Replace with actual employee ID fetching logic

      const newNomination = {
        certification_id: id,
        planned_exam_month: plannedExamMonth,
        motivation_description: motivation,
        employee_id: getEmployeeId(),
      };

      await axios.post("http://localhost:5000/nominations", newNomination);
      toast.success("Nomination submitted successfully!");

      onClose();
    } catch (error) {
      toast.error("Failed to submit nomination.");
      console.error("Error submitting nomination:", error);
    }
  };

  const currentDate = new Date();
  const currentMonth = currentDate.toISOString().slice(0, 7); // Format YYYY-MM

  const minDate = financialYear ? new Date(financialYear.from_date).toISOString().slice(0, 7) : currentMonth;
  const maxDate = financialYear ? new Date(financialYear.to_date).toISOString().slice(0, 7) : currentMonth;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            borderRadius: "10px",
            padding: "10px",
            minWidth: "300px",
          },
        }}
      >
        <DialogTitle>Nominate for {certificationName}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            Please fill in the following details to nominate yourself for this
            certification.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Planned Exam Month"
            type="month"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={plannedExamMonth}
            onChange={(e) => setPlannedExamMonth(e.target.value)}
            required
            InputProps={{ 
              inputProps: { 
                min: minDate, 
                max: maxDate 
              } 
            }} // Set the min and max dates based on financial year
          />
          <TextField
            margin="dense"
            label="What motivates you to take this certification?"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            placeholder="This will be reviewed by the Department head and L&D."
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NominationFormModal;
