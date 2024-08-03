import React, { useState, ChangeEvent } from "react";
import { Checkbox, FormControlLabel, TextField, FormGroup, Box } from "@mui/material";

interface CheckboxFilterProps {
  items: string[];
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder: string;
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  items,
  selectedItems,
  setSelectedItems,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (item: string) => {
    setSelectedItems(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TextField
        label={placeholder}
        variant="outlined"
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        fullWidth
      />
      <Box
        sx={{
          maxHeight: "120px",
          overflowY: "auto",
          borderRadius: "4px",
          marginTop: "8px",
        }}
      >
        <FormGroup>
          {filteredItems.map(item => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={selectedItems.includes(item)}
                  onChange={() => handleChange(item)}
                />
              }
              label={item}
            />
          ))}
        </FormGroup>
      </Box>
    </div>
  );
};

export default CheckboxFilter;
