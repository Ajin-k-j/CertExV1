import React, { useState } from 'react';
import './Slider.css'; // Import CSS file for styling

type Level = 'Beginner' | 'Intermediate' | 'Expert';

interface Exam {
  title: string;
  description: string;
  date: string;
  level: Level;
}

interface SliderProps {
  exams: Exam[];
}

const Slider: React.FC<SliderProps> = ({ exams }) => {
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

  const getBorderColor = (level: Level): string => {
    switch (level) {
      case 'Beginner':
        return 'green';
      case 'Intermediate':
        return 'blue';
      case 'Expert':
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <div className="slider-container">
      <h2>Upcoming Exams</h2>
      <div className="slider">
        <button onClick={handlePrevious} className="nav-button">
          &lt;
        </button>
        <div className="card" style={{ borderColor: getBorderColor(exams[currentIndex].level) }}>
          <h3>{exams[currentIndex].title}</h3>
          <p>{exams[currentIndex].description}</p>
          <p>Date: {exams[currentIndex].date}</p>
          <p className="level">{exams[currentIndex].level}</p>
        </div>
        <button onClick={handleNext} className="nav-button">
          &gt;
        </button>
      </div>
      <div className="indicator">
        {currentIndex + 1} / {exams.length}
      </div>
    </div>
  );
};

export default Slider;
