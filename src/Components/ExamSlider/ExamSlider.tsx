import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/system';

// Define the Level type
type Level = 'Beginner' | 'Intermediate' | 'Expert';

// Define the Exam interface
interface Exam {
  title: string;
  date: string;
  level: Level;
}

// Function to calculate days until the exam
const calculateDaysUntilExam = (examDate: string) => {
  const today = new Date();
  const exam = new Date(examDate);
  const diffTime = exam.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays < 0) return "Past";
  return `${diffDays} days left`;
};

// Style the card with a dynamic border color based on the level
const LevelCard = styled(Card)<{ level: Level }>(({ level }) => ({
  borderTop: `4px solid ${
    level === 'Beginner' ? 'green' : level === 'Intermediate' ? 'blue' : 'red'
  }`,
  backgroundColor: '#fff',
  minHeight: 180,
  maxWidth: 300,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '8px',
  borderRadius: '8px',
}));

interface ExamSliderProps {
  exams: Exam[];
}

const ExamSlider: React.FC<ExamSliderProps> = ({ exams }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? exams.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === exams.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(handleNext, 3000); // Change slide every 3 seconds

    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, [handleNext]);

  const currentExam = exams[currentIndex];
  const daysLeft = calculateDaysUntilExam(currentExam.date);

  return (
    <Box
      sx={{
        maxWidth: 300,
        m: '2vh',
        backgroundColor: "white",
        padding: "10px",
        paddingBottom: "4vh",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom sx={{ textAlign: "center", fontSize: '1rem' }}>
        Upcoming Exams <span>({exams.length})</span>
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', }}>
        <IconButton onClick={handlePrevious}>
          <ArrowBackIosIcon />
        </IconButton>
        <LevelCard level={currentExam.level} sx={{ flex: 1 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', fontSize: '1.1rem', mb: 1 }}>
              {currentExam.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontWeight: 'bold',
                mb: 1,
                border: '1px solid',
                borderColor: daysLeft === 'Today' ? 'green' : 'text.secondary',
                borderRadius: '4px',
                padding: '4px',
              }}
            >
              {daysLeft}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              {currentExam.date}
            </Typography>
          </CardContent>
        </LevelCard>
        <IconButton onClick={handleNext}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ExamSlider;
