import React from "react";
import Anywhere from "../assets/imgs/worldMap.svg";
import northAmerica from "../assets/imgs/northAmerica.svg";
import europe from "../assets/imgs/europe.svg";
import { useContextApi } from "../api/ContextApi";

const ContinentMaps = ({ continent, onSelect, isSelected }) => {
  let styles = style();
  let imageSrc;
  let state = useContextApi();
  let [Colors] = state.Colors;

  if (continent.toLowerCase() === "anywhere") {
    imageSrc = Anywhere;
  } else if (continent.toLowerCase() === "northamerica") {
    imageSrc = northAmerica;
  } else if (continent.toLowerCase() === "europe") {
    imageSrc = europe;
  } else {
    imageSrc = Anywhere;
  }

  const selectedStyle = isSelected
    ? { backgroundColor: "#ffffff", transform: "scale(1.06)" }
    : {};
  return (
    <div
      style={{ ...styles.Container, ...selectedStyle }}
      onClick={() => onSelect(continent)}
    >
      <div style={styles.ContinentContainer}>
        <img style={styles.Img} src={imageSrc} alt="anywhere" />
        <p style={styles.ContinentText}>{continent}</p>
      </div>
    </div>
  );
};

let style = () => {
  return {
    Container: {
      marginTop: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "auto",
      width: "30%",
      backgroundColor: "#F5F4F4",
      borderRadius: "10px",
      padding: "10px",
      cursor: "pointer",
      transition: "transform 0.3s ease",
      boxShadow: "0 4px 12px #00000040",
    },
    ContinentContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      padding: "10px",
    },
    Img: {
      width: "100%",
      height: "auto",
    },
    ContinentText: {
      color: "#666666",
      fontSize: "0.7rem",
      fontWeight: "bold",
    },
  };
};

export default ContinentMaps;