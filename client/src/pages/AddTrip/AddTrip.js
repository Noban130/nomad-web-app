import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useContextApi } from "../../api/ContextApi.js";
import { useState } from "react";
import arrow from "../../assets/imgs/arrow.png";
import ContinentMaps from "../../components/ContinentMaps";
import departPlane from "../../assets/imgs/departPlane.svg";
import arrivePlane from "../../assets/imgs/ArrivePlane.svg";
import MultiChoiceContainer from "../../components/MultiChoiceContainer";
import DropDown from "../../components/DropDownInput";
import AddTripSectionHeader from "../../components/AddTripSectionHeader.js";
const AddTrip = () => {
  let state = useContextApi();
  let [Colors] = state.Colors;
  let [DarkMode] = state.DarkMode;
  const [WindowWidth, setWindowWidth] = useState(500);
  let styles = style(Colors, WindowWidth, DarkMode);
  const [selectedContinent, setSelectedContinent] = useState("");

  const handleContinentSelect = (continent) => {
    setSelectedContinent(continent);
  };
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
        <AddTripSectionHeader step={1} />
        <p style={styles.labelText}>from</p>
        <DropDown
          options={[
            { value: "new york", label: "new york" },
            { value: "spain", label: "spain" },
          ]}
          icon={departPlane}
          placehoder={"departure"}
        />
        <MultiChoiceContainer
          content={["one way ", "road trip", "round trip "]}
        />
        <p style={styles.labelText}>to</p>
        <DropDown
          options={[
            { value: "New york", label: "New york " },
            { value: "spain", label: "spain" },
          ]}
          icon={arrivePlane}
          placehoder={"destination"}
        />
        <div style={styles.Continents}>
          <ContinentMaps
            continent="anywhere"
            onSelect={handleContinentSelect}
            isSelected={selectedContinent === "anywhere"}
          />

          <ContinentMaps
            continent="northamerica"
            onSelect={handleContinentSelect}
            isSelected={selectedContinent === "northamerica"}
          />
          <ContinentMaps
            continent="europe"
            onSelect={handleContinentSelect}
            isSelected={selectedContinent === "europe"}
          />
        </div>

        <div style={styles.AddButton}>
          <p style={styles.AddButtonText}>Add Another destination</p>
        </div>
        <Link style={styles.btn} to={"/addTrip2"}>
          continue <img className={"btnImg"} src={arrow} alt="" />
        </Link>
      </div>
    </div>
  );
};
const style = (Colors, WindowWidth, DarkMode) => {
  return {
    container: {
      position: "relative",
      paddingLeft: WindowWidth >= 970 ? 270 : 0,
      paddingRight: WindowWidth >= 1300 ? 370 : 0,
      width: "100vw",
      minHeight: "90vh",
      flexDirection: "column",
      background: DarkMode
        ? `url(${require("../../assets/imgs/background.png")}`
        : `url(${require("../../assets/imgs/darkModeBackground.png")})`,
      // backgroundSize:
      //   WindowWidth >= 970 ? "contain" : DarkMode ? "cover" : "100% ",
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
      backgroundPositionY: "center",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
    },

    labelText: {
      color: "#fff",
      marginTop: "1rem",
      display: "flex",
      justifyContent: "flex-start",
      width: "100%",
    },
    logoContainer: {
      marginTop: "2rem",
      marginBottom: "1rem",
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
    },
    logoImg: {
      width: "10rem",
      height: "auto",
    },
    btn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      marginTop: "1rem",
      marginBottom: "3rem",
      padding: "10px",
      width: "100%",
      maxWidth: "500px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 12px #00000040",
    },
    Continents: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginTop: "20px",
      width: "100%",
    },
    selectContainer: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 20,
    },
    imgContainer: {
      marginTop: 20,
      padding: 6,
      width: 40,
      height: 40,

      display: "flex",
      alignItems: "center",
      justifyContent: "center",

      backgroundColor: "#ffffff20",
      border: "1px solid #ffffff40",
      borderRadius: 10,
    },
    img: {
      width: "100%",
      height: "100%",
    },
    select: {
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
    option: {
      color: "#000",
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
      backgroundColor: "#ffffff40",
      border: DarkMode ? "1px solid #fff" : " 1px solid #333333",
      borderRadius: 10,
      outline: "none",
      color: "#fff",
      cursor: "pointer",
    },
    AddButtonText: {
      color: DarkMode ? "#fff" : "#333333",
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

export default AddTrip;