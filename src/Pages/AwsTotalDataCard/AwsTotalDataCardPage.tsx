import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TotalDataCard from '../../Components/TotalDataCard/TotalDataCard';
import { People, Done, Cancel  } from '@mui/icons-material';

interface AwsTotalData {
  totalAccounts: string;
  activeAccounts: number;
  inactiveAccounts: number;
}

const DashboardPage: React.FC = () => {
  const [data, setData] = useState<AwsTotalData>({
    totalAccounts: '',
    activeAccounts: 0,
    inactiveAccounts: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<AwsTotalData>(
          '../../../public/Data/AwsTotalData.json'
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const icons = {
    totalAccounts: <People />,
    activeAccounts: <Done />,
    inactiveAccounts: <Cancel />,
  };
  

  const labels = {
    totalAccounts: 'Total Accounts',
    activeAccounts: 'Active',
    inactiveAccounts: 'Inactive',
  };

  return <TotalDataCard data={data} icons={icons} labels={labels} />;
};

export default DashboardPage;
