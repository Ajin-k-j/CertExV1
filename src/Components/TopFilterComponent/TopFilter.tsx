import React from "react";
import { TextField, MenuItem, Select, FormControl, SelectChangeEvent, Box, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

// Define types for the filter options
type CertificationLevel = "Beginner" | "Intermediate" | "Expert" | "all";
type SortOption = "latest" | "popular" | "oldest";

interface TopFilterProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedLevel: CertificationLevel;
  setSelectedLevel: React.Dispatch<React.SetStateAction<CertificationLevel>>;
  sortOption: SortOption;
  setSortOption: React.Dispatch<React.SetStateAction<SortOption>>;
  inputHeight?: string; // Optional height property for flexibility
}

const TopFilter: React.FC<TopFilterProps> = ({
  searchQuery,
  setSearchQuery,
  selectedLevel,
  setSelectedLevel,
  sortOption,
  setSortOption,
  inputHeight = '2rem', // Default height if none provided
}) => {
  // Handle change for the level dropdown
  const handleLevelChange = (event: SelectChangeEvent<CertificationLevel>) => {
    setSelectedLevel(event.target.value as CertificationLevel);
  };

  // Handle change for the sort option dropdown
  const handleSortChange = (event: SelectChangeEvent<SortOption>) => {
    setSortOption(event.target.value as SortOption);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      gap={2} // Adjust gap between filters as needed
      sx={{ marginBottom: 1 }}
    >
      <TextField
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size="small"
        sx={{ 
          backgroundColor: "#ffffff", // Set background color to white
          borderRadius: 1, // Add border radius
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: 'none', // Remove the outline
            },
          },
          height: inputHeight, // Set height property
          width: '300px', // Increase width if needed
          justifyContent:"center",
        }}
        placeholder="Search for certifications"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Box display="flex" alignItems="center" gap={1}>
        <span>Level</span>
        <FormControl size="small" sx={{ width: "auto", backgroundColor: "#ffffff" }}>
          <Select
            value={selectedLevel}
            onChange={handleLevelChange}
            sx={{ 
              width: "120px", // Adjust width as needed
              borderRadius: 1, // Add border radius
              height: inputHeight, // Set height property
              // '.MuiOutlinedInput-notchedOutline': { border: 0 },
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Expert">Expert</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <span>Sort By</span>
        <FormControl size="small" sx={{ width: "auto", backgroundColor: "#ffffff" }}>
          <Select
            value={sortOption}
            onChange={handleSortChange}
            sx={{ 
              width: "120px", // Adjust width as needed
              borderRadius: 1, // Add border radius
              height: inputHeight, // Set height property
              // '.MuiOutlinedInput-notchedOutline': { border: 0 },
            }}
          >
            <MenuItem value="latest">Latest</MenuItem>
            <MenuItem value="popular">Popular</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default TopFilter;
