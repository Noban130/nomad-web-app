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
    <div style={styles.bigContainer}>
      {label && <p style={styles.labelText}>{label}</p>}
      <div style={styles.Container}>
        {content.map((item, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            style={{
              backgroundColor: selectedButton === index ? "#C5A1FF" : "",
              transition: "background-color 0.5s ease",
              ...styles.btn,
            }}
          >
            <p style={styles.text}>{item}</p>
          </button>
        ))}
      </div>
    </div>
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
      gap: "20px", // just test 5 to 20
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
      padding: 6,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 18,
      backgroundColor: "#ffffff20",
      border: "1px solid #a6a6a6",
      borderRadius: 10,
      outline: "none",
      cursor: "pointer",
    },
    btn: {
      padding: 10,
      width: buttonWidth,
      height: "auto",
      borderRadius: "6px",
      color: DarkMode ? "#fff" : "#333333",
    },
    text: {
      fontWeight: "bold",
      fontSize: "1em",
      "@media (maxWidth: 768px)": {
        fontSize: "0.8em",
      },
      "@media (maxWidth: 480px)": {
        fontSize: "0.1em",
      },
    },
  };
};

export default MultiChoiceContainer;