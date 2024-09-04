import React, { useState } from "react";
import { useContextApi } from "../api/ContextApi";

const Time = ({ content, label }) => {
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [currentRange, setCurrentRange] = useState(null);
  let state = useContextApi();
  let [DarkMode] = state.DarkMode;
  const handleMouseDown = (index) => {
    setCurrentRange([index, index]);
  };

  const handleMouseUp = () => {
    if (currentRange) {
      setSelectedRanges([...selectedRanges, currentRange]);
      setCurrentRange(null);
    }
  };

  const handleMouseEnter = (index) => {
    if (currentRange) {
      setCurrentRange([currentRange[0], index]);
    }
  };

  const getButtonStyle = (index) => {
    let inRange = false;
    let isStart = false;
    let isEnd = false;

    selectedRanges.forEach(([start, end]) => {
      if (index >= Math.min(start, end) && index <= Math.max(start, end)) {
        inRange = true;
        isStart = index === Math.min(start, end) || isStart;
        isEnd = index === Math.max(start, end) || isEnd;
      }
    });

    if (currentRange) {
      const [currentStart, currentEnd] = currentRange;
      if (
        index >= Math.min(currentStart, currentEnd) &&
        index <= Math.max(currentStart, currentEnd)
      ) {
        inRange = true;
        isStart = index === Math.min(currentStart, currentEnd) || isStart;
        isEnd = index === Math.max(currentStart, currentEnd) || isEnd;
      }
    }

    return {
      backgroundColor: inRange ? "#C5A1FF" : "",
      transition: "background-color 0.5s ease",
      borderTopLeftRadius: isStart ? "6px" : "0",
      borderBottomLeftRadius: isStart ? "6px" : "0",
      borderTopRightRadius: isEnd ? "6px" : "0",
      borderBottomRightRadius: isEnd ? "6px" : "0",
      ...styles.btn,
    };
  };

  let styles = style(content.length, DarkMode);

  return (
    <div style={styles.bigContainer} onMouseUp={handleMouseUp}>
      {label && <p style={styles.labelText}>{label}</p>}
      <div style={styles.Container}>
        {content.map((item, index) => (
          <button
            key={index}
            onMouseDown={() => handleMouseDown(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            style={getButtonStyle(index)}
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
      gap: "20px",
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
      gap: 0,
      backgroundColor: "#ffffff20",
      border: DarkMode ? "1px solid #ffffff40" : " 1px solid #333333",
      borderRadius: 10,
      outline: "none",

      cursor: "pointer",
    },
    btn: {
      padding: 10,
      width: buttonWidth,
      color: DarkMode ? "white" : "#333333",
      borderRadius: 0, // default no border radius
    },
    text: {
      color: DarkMode ? "#fff" : "#333333",
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

export default Time;