import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import styles from "./AllCertifications.module.css";
import TopFilter from "../../Components/TopFilterComponent/TopFilter";
import LeftFilter from "../../Components/LeftFilterComponent/LeftFilter";
import FilterChips from "../../Components/FilterChipComponent/FilterChip";
import CardsDisplay from "../../Components/CardsDisplay/CardsDisplay";

// Define your types
type CertificationLevel = "Beginner" | "Intermediate" | "Expert";
type SortOption = "latest" | "popular" | "oldest";

interface CertificationData {
  id: number;
  provider: string;
  certification_name: string;
  level: CertificationLevel;
  description: string;
  tags: string[];
  official_link: string;
  critical: string;
  views: number; // For sorting
}

const AllCertifications: React.FC = () => {
  const [data, setData] = useState<CertificationData[]>([]);
  const [filteredData, setFilteredData] = useState<CertificationData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<CertificationLevel | "all">("all");
  const [sortOption, setSortOption] = useState<SortOption>("latest");
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CertificationData[]>("http://localhost:5000/certifications");
        setData(response.data);
        setFilteredData(response.data); // Initialize filtered data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedLevel, sortOption, selectedProviders, selectedCategories, data]);

  const applyFilters = useCallback(() => {
    let result = data;

    // Search Filter
    if (searchQuery) {
      result = result.filter(item =>
        item.certification_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Level Filter
    if (selectedLevel !== "all") {
      result = result.filter(item => item.level === selectedLevel);
    }

    // Provider Filter
    if (selectedProviders.length > 0) {
      result = result.filter(item => selectedProviders.includes(item.provider));
    }

    // Category Filter
    if (selectedCategories.length > 0) {
      result = result.filter(item => 
        item.tags.some(tag => selectedCategories.includes(tag))
      );
    }

    // Sorting
    switch (sortOption) {
      case "latest":
        result = result.sort((a, b) => b.id - a.id); // Assuming higher ID is newer
        break;
      case "popular":
        result = result.sort((a, b) => b.views - a.views);
        break;
      case "oldest":
        result = result.sort((a, b) => a.id - b.id); // Assuming lower ID is older
        break;
    }

    setFilteredData(result);
  }, [data, searchQuery, selectedLevel, sortOption, selectedProviders, selectedCategories]);

  const removeFilter = (filterType: string, value: string) => {
    switch (filterType) {
      case "searchQuery":
        setSearchQuery("");
        break;
      case "selectedLevel":
        setSelectedLevel("all");
        break;
      case "sortOption":
        setSortOption("latest");
        break;
      case "selectedProviders":
        setSelectedProviders(prev => prev.filter(provider => provider !== value));
        break;
      case "selectedCategories":
        setSelectedCategories(prev => prev.filter(category => category !== value));
        break;
      default:
        break;
    }
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedLevel("all");
    setSortOption("latest");
    setSelectedProviders([]);
    setSelectedCategories([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.LeftSection}>
      <LeftFilter
          selectedProviders={selectedProviders}
          setSelectedProviders={setSelectedProviders}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          clearAllFilters={clearAllFilters}
        />
      </div>
      <div className={styles.MiddleSection}>
      <TopFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />
      <div className={styles.CardsSection}>
      <FilterChips
            searchQuery={searchQuery}
            selectedLevel={selectedLevel}
            sortOption={sortOption}
            selectedProviders={selectedProviders}
            selectedCategories={selectedCategories}
            removeFilter={removeFilter}
          />
      <CardsDisplay data={filteredData} />
      </div>
      </div>
      
    </div>
  );
};

export default AllCertifications;
