import React from "react";
import ExamCards from "../ExamCards/ExamCards";
import FilterChips from "../FilterChipComponent/FilterChip";

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
        height: "31rem", 
        overflowY: "auto", 
        padding: "10px", 
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
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
        {data.map(cert => (
          <ExamCards key={cert.id} {...cert} />
        ))}
      </div>
    </div>
  );
};

export default CardsDisplay;
