import React, { useState } from "react";
import { useContextApi } from "../api/ContextApi";
import Select from "react-select";

// This component renders a customizable select dropdown with an icon, using react-select and context API for styles.
// Props:
// - options: Array of options for the dropdown
// - icon: Image source URL for the icon displayed beside the dropdown
// - placehoder: Placeholder text for the dropdown
const ContinentMaps = ({ options, icon, placehoder }) => {
  let imageSrc;
  let state = useContextApi();
  let [Colors] = state.Colors;
  let [DarkMode] = state.DarkMode;
  const [selectedOption, setSelectedOption] = useState(null);
  let styles = style(DarkMode);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };
  // customStyles object for overriding default styles of react-select components
  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: "100%",
      maxWidth: 500,
      color: "#fff",
      outline: "none",
    }),
    control: (provided) => ({
      ...provided,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 10,
      border: "none",
      backgroundColor: "ffffff40",
      borderRadius: 10,
      color: "#fff",
      outline: "none",
    }),
    option: (provided) => ({
      ...provided,
      color: "#000",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#fff", // Adjust placeholder text style here
      fontSize: "16px", // Example to change font size
    }),
  };

  return (
    <div style={styles.selectContainer}>
      <div style={styles.imgContainer}>
        <img
          style={styles.img}
          className={"locationImg"}
          src={icon}
          alt="departure"
        />
      </div>
      <Select
        styles={customStyles}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isClearable={true}
        isSearchable={true}
        placeholder={placehoder}
      />
    </div>
  );
};

let style = (DarkMode) => {
  return {
    selectContainer: {
      marginTop: 20,
      width: "100%",
      maxWidth: 500,
      padding: 7,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 10,
      backgroundColor: "#ffffff20",
      border: DarkMode ? "1px solid #ffffff40" : "1px solid #a6a6a6",
      borderRadius: 10,
      outline: "none",
      color: "#fff",
      cursor: "pointer",
    },
    imgContainer: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      padding: 6,
    },
    img: {
      width: "100%",
      height: "100%",
    },
  };
};

export default ContinentMaps;