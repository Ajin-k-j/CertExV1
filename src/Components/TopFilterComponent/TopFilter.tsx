import React from "react";
import { TextField, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent, Box } from "@mui/material";

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
}

const TopFilter: React.FC<TopFilterProps> = ({
  searchQuery,
  setSearchQuery,
  selectedLevel,
  setSelectedLevel,
  sortOption,
  setSortOption,
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
      gap={1} // Adjust gap between filters as needed
      sx={{ marginBottom: 1 }}
    >
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size="small"
        sx={{ flex: 1, width:"100%"}}
      />
      <FormControl size="small" sx={{ flex: 1 }}>
        <InputLabel>Level</InputLabel>
        <Select
          value={selectedLevel}
          onChange={handleLevelChange}
          label="Level"
          sx={{ width: "100%" }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Beginner">Beginner</MenuItem>
          <MenuItem value="Intermediate">Intermediate</MenuItem>
          <MenuItem value="Expert">Expert</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ flex: 1 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortOption}
          onChange={handleSortChange}
          label="Sort By"
          sx={{ width: "100%" }}
        >
          <MenuItem value="latest">Latest</MenuItem>
          <MenuItem value="popular">Popular</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TopFilter;
