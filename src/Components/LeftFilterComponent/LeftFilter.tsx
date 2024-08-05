import React, { useEffect, useState } from "react";
import axios from "axios";
import CheckboxFilter from "../CheckboxFilter/CheckboxFilter";
import { Typography, Box } from "@mui/material";

interface LeftFilterProps {
  selectedProviders: string[];
  setSelectedProviders: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  clearAllFilters: () => void;
}

const LeftFilter: React.FC<LeftFilterProps> = ({
  selectedProviders,
  setSelectedProviders,
  selectedCategories,
  setSelectedCategories,
  clearAllFilters,
}) => {
  const [providers, setProviders] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get<string[]>("http://localhost:5000/providers");
        setProviders(response.data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get<string[]>("http://localhost:5000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProviders();
    fetchCategories();
  }, []);

  const handleClearAll = () => {
    setSelectedProviders([]);
    setSelectedCategories([]);
    clearAllFilters(); // Clear top filters
  };

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff", // Set background color to white
        padding: 3, // Optional: Add padding for better appearance
        borderRadius: 1, // Optional: Add rounded corners
        height: "auto", // Ensure it takes full height of the parent container
      }}
    >
      <div>
        <Typography variant="h5" component="div" style={{ display: "inline" }}>
          Filters
        </Typography>
        <Typography
          variant="body2"
          component="span"
          style={{
            color: "blue",
            marginLeft: "8px",
            cursor: "pointer",
            paddingLeft:"2rem"
          }}
          onClick={handleClearAll}
        >
          Clear All
        </Typography>
      </div>
      <div>
        <h3>Providers</h3>
        <CheckboxFilter
          items={providers}
          selectedItems={selectedProviders}
          setSelectedItems={setSelectedProviders}
          placeholder="Search Providers"
        />
      </div>
      <div>
        <h3>Categories</h3>
        <CheckboxFilter
          items={categories}
          selectedItems={selectedCategories}
          setSelectedItems={setSelectedCategories}
          placeholder="Search Categories"
        />
      </div>
    </Box>
  );
};

export default LeftFilter;
