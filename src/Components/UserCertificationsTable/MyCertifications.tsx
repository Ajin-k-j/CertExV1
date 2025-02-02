import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { TextField, Box, InputAdornment, Select, MenuItem, FormControl, InputLabel, Modal, Button, IconButton, Typography, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseIcon from '@mui/icons-material/Close';


interface Certification {
  certification_id: number;
  "Certification Name": string;
  Provider: string;
  Level: string;
  Category: string;
  "From Date": string;
  "Expiry Date": string;
}

interface Row {
  id: number;
  certificationName: string;
  provider: string;
  level: string;
  category: string;
  fromDate: string;
  expiryDate: string;
}

const UserCertificationsPage: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [filteredRows, setFilteredRows] = useState<Row[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    axios.get<{ user_id: number; certifications: Certification[] }>('../../../public/Data/User1_CertificationTable.json')
      .then(response => {
        const data = response.data.certifications;
        const mappedData: Row[] = data.map(item => ({
          id: item.certification_id,
          certificationName: item["Certification Name"],
          provider: item.Provider,
          level: item.Level,
          category: item.Category,
          fromDate: item["From Date"],
          expiryDate: item["Expiry Date"]
        }));
        setRows(mappedData);
        setFilteredRows(mappedData);
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
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(lowercasedQuery)
      )
    );
    setFilteredRows(filtered);
  }, [searchQuery, selectedProvider, rows]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleProviderChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedProvider(event.target.value as string);
  };

  const handleActionClick = (row: Row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleViewCertificate = () => {
    if (selectedRow) {
      console.log('View certificate clicked for:', selectedRow.certificationName);
      // Implement logic to view the certificate here
    }
  };

  const getModalBorderColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'green';
      case 'intermediate':
        return 'blue';
      case 'expert':
        return 'red';
      default:
        return 'transparent';
    }
  };

  const columns: GridColDef[] = [
    { field: 'certificationName', headerName: 'Certification Name', width: 220 },
    { field: 'provider', headerName: 'Provider', width: 140 },
    { field: 'level', headerName: 'Level', width: 140 },
    { field: 'category', headerName: 'Category', width: 160 },
    { field: 'fromDate', headerName: 'From Date', width: 140 },
    { field: 'expiryDate', headerName: 'Expiry Date', width: 140 },
    {
      field: 'action',
      headerName: 'Action',
      width: 140,
      renderCell: (params) => (
        <Button onClick={() => handleActionClick(params.row as Row)} variant="outlined" color="primary">
          View
        </Button>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ overflow: 'hidden' }}>
        <Paper sx={{ padding: 2, marginBottom: 2, display: 'flex', flexDirection: 'column', gap: 2, width: '90vw' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">My Certifications</Typography>
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
            </Box>
          </Box>
          <div style={{ height: 200, width: '100%' }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 15]}
              rowHeight={40}
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
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            borderTop: `8px solid ${selectedRow ? getModalBorderColor(selectedRow.level) : 'transparent'}`
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
              <strong>Certification Name:</strong> {selectedRow?.certificationName}<br />
              <strong>Provider:</strong> {selectedRow?.provider}<br />
              <strong>Level:</strong> {selectedRow?.level}<br />
              <strong>Category:</strong> {selectedRow?.category}<br />
              <strong>From Date:</strong> {selectedRow?.fromDate}<br />
              <strong>Expiry Date:</strong> {selectedRow?.expiryDate}<br />
            </Typography>
            <Button variant="contained" onClick={handleViewCertificate}>View Certificate</Button>
          </Box>
        </Modal>
      </Box>
    </LocalizationProvider>
  );
}

export default UserCertificationsPage;
