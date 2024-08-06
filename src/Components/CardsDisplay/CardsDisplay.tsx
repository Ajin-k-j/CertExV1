import React from "react";
import ExamCards from "../ExamCards/ExamCards";
import FilterChips from "../FilterChipComponent/FilterChip";
import { InfoOutlined } from "@mui/icons-material"; // Import the icon
import { Box, Typography } from "@mui/material";

// Define types for filter chips
type CertificationLevel = "Beginner" | "Intermediate" | "Expert";
interface CardsDisplayProps {
  data: {
    id: number;
    provider: string;
    certification_name: string;
    level: CertificationLevel;
    description: string;
    tags: string[];
    official_link: string;
    critical: string;
    views: number; // For sorting
  }[];
  searchQuery: string;
  selectedLevel: CertificationLevel | "all";
  sortOption: "latest" | "popular" | "oldest";
  selectedProviders: string[];
  selectedCategories: string[];
  removeFilter: (filterType: string, value: string) => void;
}

const CardsDisplay: React.FC<CardsDisplayProps> = ({
  data,
  searchQuery,
  selectedLevel,
  sortOption,
  selectedProviders,
  selectedCategories,
  removeFilter,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "76vh",
        overflowY: "auto",
        padding: "10px",
        paddingTop:"1px",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <FilterChips
        searchQuery={searchQuery}
        selectedLevel={selectedLevel}
        sortOption={sortOption}
        selectedProviders={selectedProviders}
        selectedCategories={selectedCategories}
        removeFilter={removeFilter}
      />
      {data.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          textAlign="center"
        >
          <InfoOutlined
            sx={{
              fontSize: 30,
              color: "#888",
              marginBottom: 2,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontSize: "15px",
              color: "#888",
            }}
          >
            No certifications available
          </Typography>
        </Box>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
          {data.map((cert) => (
            <ExamCards key={cert.id} {...cert} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CardsDisplay;
