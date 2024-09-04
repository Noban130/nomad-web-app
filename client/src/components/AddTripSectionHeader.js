import React, { useState, useEffect } from "react";
import RangeBar from "./RangeBar";
import nightModeButton from "../assets/imgs/nightMode.svg";
import logo from "../assets/imgs/logo.png";
import lightMode from "../assets/imgs/lightMode.svg";
import { useContextApi } from "../api/ContextApi";

const AddTripSectionHeader = ({ step }) => {
  let state = useContextApi();
  let [Colors] = state.Colors;
  let [DarkMode, setDarkMode] = state.DarkMode;
  const [WindowWidth, setWindowWidth] = useState(500);
  let styles = style(Colors, WindowWidth);
  let windowSize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener("resize", windowSize);

  useEffect(() => {
    windowSize();
  }, []);
  let icon = DarkMode ? lightMode : nightModeButton;
  const toggleDarkMode = () => {
    setDarkMode(!DarkMode);
  };
  return (
    <div style={styles.Container}>
      <div style={styles.darkModeButtonContainer} onClick={toggleDarkMode}>
        <img src={icon} alt="night mode button" />
      </div>
      <div style={styles.logoContainer}>
        <img style={styles.logoImg} src={logo} alt="nomad world logo" />
        <p style={styles.logoText}>travel easy</p>
      </div>
      <RangeBar range={step} />
    </div>
  );
};

let style = (Colors, WindowWidth) => {
  return {
    Container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      marginRight: "30px",
    },
    darkModeButtonContainer: {
      display: WindowWidth >= 970 ? "none" : "flex",
      justifyContent: "flex-end",
      width: "100%",
      cursor: "pointer",
    },
    logoImg: {
      width: "10rem",
      height: "auto",
    },
    logoContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "2rem",
      marginBottom: "1rem",
      gap: "0.5rem",
    },
    logoText: {
      color: "#fff",
      fontSize: "1rem",
      fontFamily: "Poppins",
    },
  };
};
export default AddTripSectionHeader;