import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Box,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Modal,
  Button,
  IconButton,
  Typography,
  Paper
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';


// Define the interface for the data
interface Row {
  id: number;
  employeeName: string;
  email: string;
  department: string;
  provider: string;
  certificationName: string;
  criticality: string;
  plannedMonthOfExam: string;
  nomination_id: number;
  employee_id: number;
}

export default function UserCertificationPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [filteredRows, setFilteredRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [selectedCriticality, setSelectedCriticality] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);

  useEffect(() => {
    axios.get<Row[]>('../../../public/Data/LDNominationData.json') // Adjust path if needed
      .then(response => {
        const dataWithIds = response.data.map((item, index) => ({ id: index + 1, ...item }));
        setRows(dataWithIds);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError('Error fetching data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = rows.filter(row =>
      (selectedProvider === '' || row.provider === selectedProvider) &&
      (selectedCriticality === '' || row.criticality === selectedCriticality) &&
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(lowercasedQuery)
      )
    );

    setFilteredRows(filtered);
  }, [searchQuery, selectedProvider, selectedCriticality, rows]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleProviderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedProvider(event.target.value as string);
  };

  const handleCriticalityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCriticality(event.target.value as string);
  };

  const handleActionClick = (row: Row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getModalBorderColor = (criticality: string) => {
    switch (criticality.toLowerCase()) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'transparent';
    }
  };

  const columns: GridColDef[] = [
    { field: 'employeeName', headerName: 'Employee Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 180 },
    { field: 'department', headerName: 'Department', width: 100 },
    { field: 'provider', headerName: 'Provider', width: 80 },
    { field: 'certificationName', headerName: 'Certification Name', width: 300 },
    { field: 'criticality', headerName: 'Criticality', width: 100 },
    { field: 'plannedMonthOfExam', headerName: 'Planned Month of Exam', width: 160 },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Paper sx={{ padding: 2, marginBottom: 2, display: 'flex', flexDirection: 'column', gap: 2, width: '90vw' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">All Nominations Data</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              size="small"
              variant="outlined"
              label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ width: 200 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl size="small" sx={{ width: 200 }}>
              <InputLabel>Provider</InputLabel>
              <Select
                value={selectedProvider}
                onChange={handleProviderChange}
                label="Provider"
              >
                <MenuItem value="">All</MenuItem>
                {Array.from(new Set(rows.map(row => row.provider))).map(provider => (
                  <MenuItem key={provider} value={provider}>
                    {provider}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ width: 200 }}>
              <InputLabel>Criticality</InputLabel>
              <Select
                value={selectedCriticality}
                onChange={handleCriticalityChange}
                label="Criticality"
              >
                <MenuItem value="">All</MenuItem>
                {Array.from(new Set(rows.map(row => row.criticality))).map(criticality => (
                  <MenuItem key={criticality} value={criticality}>
                    {criticality}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <div style={{ height: 200, width: '100%' }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 15]}
            rowHeight={40}
            onRowClick={(params) => handleActionClick(params.row as Row)}
          />
        </div>
      </Paper>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          maxWidth: '90vw',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          borderTop: `8px solid ${selectedRow ? getModalBorderColor(selectedRow.criticality) : 'transparent'}`
        }}>
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'text.secondary'
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ mb: 2 }}>Certification Details</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Employee Name:</strong> {selectedRow?.employeeName}<br />
            <strong>Email:</strong> {selectedRow?.email}<br />
            <strong>Department:</strong> {selectedRow?.department}<br />
            <strong>Provider:</strong> {selectedRow?.provider}<br />
            <strong>Certification Name:</strong> {selectedRow?.certificationName}<br />
            <strong>Criticality:</strong> {selectedRow?.criticality}<br />
            <strong>Planned Month of Exam:</strong> {selectedRow?.plannedMonthOfExam}<br />
          </Typography>
          <Button variant="contained" onClick={handleCloseModal}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
}
