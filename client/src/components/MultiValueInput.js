import React, { useState } from "react";
import { useContextApi } from "../api/ContextApi";
const MultiChoiceContainer = ({ content, label }) => {
  let state = useContextApi();
  let [DarkMode] = state.DarkMode;
  const [selectedButton, setSelectedButton] = useState(0);

  const handleButtonClick = (index) => {
    setSelectedButton(index);
  };

  let styles = style(content.length, DarkMode);

  return (
    <>
      <style>
        {`
          .inputDarkMode::placeholder {
            color: #ffffff80; /* Light white for dark mode */
            fontWeight: "bold",
          }

          .inputLightMode::placeholder {
            color: #33333380; /* Dark grey for light mode */
            fontWeight: "bold",
          }
        `}
      </style>
      <div style={styles.bigContainer}>
        {label && <p style={styles.labelText}>{label}</p>}
        <div style={styles.Container}>
          {content.map((item, index) => (
            <input
              placeholder={content[index]}
              key={index}
              onClick={() => handleButtonClick(index)}
              style={styles.input}
              className={DarkMode ? "inputDarkMode" : "inputLightMode"}
            />
          ))}
        </div>
      </div>
    </>
  );
};
let style = (numElements, DarkMode) => {
  let buttonWidth = `${100 / numElements}%`;
  return {
    bigContainer: {
      marginTop: "2rem",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "5px",
    },
    labelText: {
      color: DarkMode ? "#fff" : "#333333",
      marginTop: "0.6rem",
      display: "flex",
      justifyContent: "flex-start",
      width: "100%",
      marginLeft: "0.5rem",
    },
    Container: {
      width: "100%",
      maxWidth: 500,
      padding: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 18,
      backgroundColor: "#ffffff20",
      border: DarkMode ? "1px solid #fff" : "1px solid #a6a6a6",
      borderRadius: 10,
      outline: "none",
      color: "#333333",
      cursor: "pointer",
    },
    input: {
      padding: 10,
      width: buttonWidth,
      borderRadius: "6px",
      backgroundColor: "#ffffff20",
      color: DarkMode ? "#ffffff" : "#333333",
      "::placeholder": {
        color: DarkMode ? "#ffffff80" : "#33333380",
      },
    },
    text: {
      fontWeight: "bold",
      fontSize: "1em",
      "@media (max-width: 768px)": {
        fontSize: "0.8em",
      },
      "@media (max-width: 480px)": {
        fontSize: "0.1em",
      },
    },
  };
};

export default MultiChoiceContainer;