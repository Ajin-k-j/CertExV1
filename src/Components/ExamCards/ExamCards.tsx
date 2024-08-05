import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import styles from "./ExamCards.module.css";
import ExamCardViewModal from "../ExamCardViewModal/ExamCardViewModal";
import NominationFormModal from "../NominationFormModal/NominationFormModal";

// Define the prop types
type CertificationLevel = "Beginner" | "Intermediate" | "Expert";

interface ExamCardsProps {
  id: number;
  provider: string;
  certification_name: string;
  level: CertificationLevel;
  description: string;
  tags: string[];
  official_link: string;
}

const ExamCards: React.FC<ExamCardsProps> = ({
  id,
  provider,
  certification_name,
  level,
  description,
  tags,
  official_link,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [nominationOpen, setNominationOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNominationOpen = () => {
    setNominationOpen(true);
  };

  const handleNominationClose = () => {
    setNominationOpen(false);
  };

  // Determine border color based on level
  const borderColor =
    level === "Beginner" ? "green" :
    level === "Intermediate" ? "blue" : "red";

  // Truncate description to first 15 words
  const truncateDescription = (text: string, limit: number) => {
    const words = text.split(' ');
    if (words.length <= limit) return text;
    return `${words.slice(0, limit).join(' ')}...`;
  };

  return (
    <div>
      <Card
        className={styles.card}
        sx={{
          height: "12.5rem", // Fixed height for uniformity
          width: "14.1rem",
          borderTop: `4px solid ${borderColor}`,
          borderLeft: "1px solid rgb(146, 145, 145)",
          borderRight: "1px solid rgb(146, 145, 145)",
          borderBottom: "1px solid rgb(146, 145, 145)",
          borderRadius: "10px",
          margin: "5px",
          cursor: "pointer",
          transition: "transform 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={handleClickOpen}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent:"center"
          }}
        >
          <Typography sx={{ fontSize: 11 }} color="text.secondary" gutterBottom>
            {provider}
          </Typography>
          <Typography sx={{ fontSize: 15 }} variant="h5" component="div">
            {certification_name}
          </Typography>
          <Typography
            sx={{ mb: 0.5, mt: 0.5, fontSize: 12, color: borderColor }}
            gutterBottom
          >
            {level}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: 13, color: "grey", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
          >
            {truncateDescription(description, 15)}
          </Typography>
          <div className={styles.chipContainer}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                sx={{
                  fontSize: 10,
                  height: "1.1rem",
                  margin: ".11rem",
                  backgroundColor: `hsl(${index * 40}, 70%, 80%)`,
                }}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal for more information */}
      <ExamCardViewModal
        open={open}
        onClose={handleClose}
        borderColor={borderColor}
        certificationName={certification_name}
        provider={provider}
        level={level}
        description={description}
        tags={tags}
        officialLink={official_link}
        onNominate={handleNominationOpen}
      />

      {/* Nomination Form Modal */}
      <NominationFormModal
        open={nominationOpen}
        onClose={handleNominationClose}
        id={id}
        certificationName={certification_name}
      />
    </div>
  );
};

export default ExamCards;
