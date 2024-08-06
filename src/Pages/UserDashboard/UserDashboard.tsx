import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExamSlider from '../../Components/ExamSlider/ExamSlider';

// Define the Level type
type Level = 'Beginner' | 'Intermediate' | 'Expert';

// Define the Exam interface
interface Exam {
  title: string;
  description: string;
  date: string;
  level: Level;
}

const UserDashboard: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get<Exam[]>('http://localhost:5000/exams');
        if (response.data) {
          setExams(response.data); 
        } else {
          setError('Data format is incorrect or empty.');
        }
      } catch (error) {
        setError('Error fetching exam data');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading exams...</p>
      ) : error ? (
        <p>{error}</p>
      ) : exams.length > 0 ? (
        <ExamSlider exams={exams} />
      ) : (
        <p>No exams available</p>
      )}
    </div>
  );
};

export default UserDashboard;
