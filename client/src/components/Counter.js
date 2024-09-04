import React from "react";
import { useContextApi } from "../api/ContextApi";
const Counter = ({ label }) => {
  let state = useContextApi();
  let [DarkMode] = state.DarkMode;
  let styles = style(DarkMode);

  return (
    <div style={styles.container}>
      <p style={styles.text}>{label}</p>
      <div style={styles.counterContainer}>
        <button style={styles.counterButton}>-</button>
        <p style={styles.counterText}>0</p>
        <button style={styles.counterButton}>+</button>
      </div>
    </div>
  );
};

let style = (DarkMode) => {
  return {
    container: {
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
      borderRadius: 12,
      outline: "none",

      cursor: "pointer",
    },
    counterContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },
    counterButton: {
      width: "100%",
      maxWidth: 50,
      padding: 9,
      paddingLeft: 17,
      paddingRight: 17,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: "#ffffff20",
      border: "1px solid #ffffff40",
      borderRadius: 5,
      outline: "none",
      color: "#fff",
      cursor: "pointer",
    },
    counterText: {
      color: DarkMode ? "#fff" : "#333333",
    },
    text: {
      fontWeight: "bold",
      color: DarkMode ? "#fff" : "#333333",
      display: "flex",
      justifyContent: "flex-start",
      width: "100%",
      marginLeft: "0.5rem",
    },
  };
};

export default Counter;