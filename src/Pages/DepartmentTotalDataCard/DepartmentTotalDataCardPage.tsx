import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TotalDataCard from '../../Components/TotalDataCard/TotalDataCard';
import { Work, Group, Badge } from '@mui/icons-material';

interface DepartmentTotalData {
  department: string;
  employees: number;
  certifications: number;
}

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DepartmentTotalData>({
    department: '',
    employees: 0,
    certifications: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DepartmentTotalData>(
          '../../../public/Data/DepartmentTotalData.json'
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const icons = {
    department: <Work />,
    employees: <Group />,
    certifications: <Badge />,
  };

  const labels = {
    department: 'Department',
    employees: 'Employees',
    certifications: 'Certifications',
  };

  return <TotalDataCard data={data} icons={icons} labels={labels} />;
};

export default DashboardPage;
