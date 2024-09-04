import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContextApi } from "../../api/ContextApi";
import { useState } from "react";
import MultiChoiceContainer from "../../components/MultiChoiceContainer";
import Time from "../../components/Time";
import arrow from "../../assets/imgs/arrow.png";

import AddTripSectionHeader from "../../components/AddTripSectionHeader";
const AddTrip2 = () => {
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
        <AddTripSectionHeader step={2} />

        <MultiChoiceContainer
          content={["select dates ", "im flexible"]}
          label={"when"}
        />

        <MultiChoiceContainer
          content={["weekend", "week", "month"]}
          label={"trip length"}
        />

        <Time
          content={[
            "jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ]}
          label={"time of year"}
        />

        <Link style={styles.btn} to={"/addTrip3"}>
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
      // backgroundSize:
      //   WindowWidth >= 970 ? "contain" : DarkMode ? "cover" : "100% ",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPositionY: "center",
      // overflow: "hidden",
    },

    logoContainer: {
      marginTop: "2rem",
      marginBottom: "1rem",
    },
    logoImg: {
      width: "10rem",
      height: "auto",
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
      gap: 23,
    },
    btn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      //marginTop: "5.5rem",
      marginBottom: "3rem",
      padding: "10px",
      width: "100%",
      maxWidth: "500px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 12px #00000040",
    },
    AddButton: {
      marginTop: 20,
      width: "100%",
      maxWidth: 500,
      padding: 10,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 10,
      backgroundColor: "#ffffff20",
      border: "1px solid #ffffff40",
      borderRadius: 10,
      outline: "none",
      color: "#fff",
      cursor: "pointer",
    },
    AddButtonText: {
      fontSize: "1em",
      "@media (max-width: 768px)": {
        fontSize: "1em",
      },
      "@media (max-width: 480px)": {
        fontSize: "0.7em",
      },
    },
  };
};
export default AddTrip2;