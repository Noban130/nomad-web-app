import React, { useState, useEffect } from "react";
import { useContextApi } from "../../api/ContextApi";
import AddTripSectionHeader from "../../components/AddTripSectionHeader";
import MultiChoiceContainer from "../../components/MultiChoiceContainer";
import DropDownInput from "../../components/DropDownInput";
import SearchIcon from "../../assets/imgs/SearchIcon.svg";
import { Link } from "react-router-dom";
import arrow from "../../assets/imgs/arrow.png";
import MultiValueContainer from "../../components/MultiValueInput";
import Counter from "../../components/Counter";
import Calendrie from "../../components/Calendrie";
const AddTrip4 = () => {
  let state = useContextApi();
  let [Colors] = state.Colors;
  let [DarkMode] = state.DarkMode;
  const [WindowWidth, setWindowWidth] = useState(500);
  let styles = style(Colors, WindowWidth, DarkMode);

  let windowSize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener("resize", windowSize);

  useEffect(() => {
    windowSize();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.addTripContainer}>
        <AddTripSectionHeader step={3} />
        <MultiChoiceContainer
          content={["select dates ", "im flexible"]}
          label={"when"}
        />

        <Calendrie />

        <MultiChoiceContainer
          content={["exact dates", "-+ day", "-+ 2days", "-+ 3days"]}
        />

        <Link style={styles.btn} to={"/tripOverview"}>
          continue <img className={"btnImg"} src={arrow} alt="" />
        </Link>
      </div>
    </div>
  );
};

let style = (Colors, WindowWidth, DarkMode) => {
  return {
    container: {
      position: "relative",
      paddingLeft: WindowWidth >= 970 ? 270 : 0,
      paddingRight: WindowWidth >= 1300 ? 370 : 0,
      width: "100vw",
      minHeight: "100vh",
      flexDirection: "column",
      background: DarkMode
        ? `url(${require("../../assets/imgs/background.png")}`
        : `url(${require("../../assets/imgs/darkModeBackground.png")})`,
      backgroundSize: DarkMode ? "100% 100%" : "cover",
      backgroundRepeat: "no-repeat",
      backgroundPositionY: "center",
      overflow: "hidden",
    },
    addTripContainer: {
      margin: "auto",
      position: "relative",
      width: "100vw",
      minHeight: "100vh",
      maxWidth: "500px",
      padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      flexDirection: "column",
      padding: "2rem",
    },
    btn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      marginTop: "1rem",

      padding: "10px",
      width: "100%",
      maxWidth: "500px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 12px #00000040",
    },
  };
};
export default AddTrip4;