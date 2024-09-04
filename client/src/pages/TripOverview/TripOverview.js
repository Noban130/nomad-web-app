import React, { useEffect, useState } from "react";
import { useContextApi } from "../../api/ContextApi";
import {
  BucketIcon,
  BusIcon,
  DeparatureIcon,
  PlaneArrival,
  PlusIcon,
  ShareIcon2,
  Tent,
  ArrowLeft,
} from "../../api/Icons";
import CustomizedIcon from "./Components/CustomizedIcon";
export default function TripOverview() {
  let state = useContextApi();
  let [Colors] = state.Colors;
  const [WindowWidth, setWindowWidth] = useState(500);
  let styles = style(Colors, WindowWidth);
  let windowSize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener("resize", windowSize);

  useEffect(() => {
    windowSize();
  }, []);
  return (
    <>
      <div style={styles.container}>
        {WindowWidth >= 900 && (
          <div>
            <ArrowLeft Color={Colors.black} width={24} />
          </div>
        )}
        <h2 style={{ color: Colors.black, marginBottom: "1vh" }}>
          trip overview
        </h2>
        <p style={{ color: Colors.black, marginBottom: "1vh" }}>
          canada - paris
        </p>
        <button style={styles.bookTrip}>book trip</button>
        <div style={styles.tripCostContainer}>
          <div style={styles.tripCost}>
            <input
              type="text"
              placeholder="total cost"
              style={styles.tripCostInput}
            />
            <p style={{ color: Colors.black }}>$</p>
          </div>
          <div style={styles.bucket}>
            <BucketIcon Color={Colors.black} width={24} />
          </div>
        </div>
        <div style={styles.plan}>
          <CustomizedIcon
            Content="Depart Toronto"
            Title="January 18th"
            Direction="left"
            Width={50}
            Icon={DeparatureIcon}
          />
          <div style={styles.line} />
          <CustomizedIcon
            Content="depart toronto"
            Title="January 18th"
            Direction="right"
            Width={50}
            Icon={BusIcon}
          />
          <div style={styles.line} />
          <CustomizedIcon
            Content="Balsa surf camp"
            Title="January 18th"
            Direction="left"
            Width={50}
            Icon={Tent}
          />
          <div style={styles.line} />
          <CustomizedIcon
            Content="Arrive in Paris"
            Title="January 18th"
            Direction="right"
            Width={50}
            Icon={PlaneArrival}
          />
        </div>
        <button style={styles.modifyTripButton}>
          modify trip <PlusIcon Color={Colors.black} />
        </button>
        <button style={styles.shareButton}>
          <ShareIcon2 Color={Colors.black} width={40} />
        </button>
      </div>
    </>
  );
}

let style = (Colors, WindowWidth) => {
  return {
    container: {
      paddingLeft: WindowWidth >= 970 ? 270 : 0,
      paddingRight: WindowWidth >= 1300 ? 370 : 0,
      width: "100vw",
      minHeight: "120vh",
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      backgroundColor: Colors.transparentBlack,
      paddingTop: "1rem",
      overflowY: "scroll",
    },
    bookTrip: {
      padding: "1rem",
      width: "70%",
      maxWidth: 500,
      color: Colors.black,
      backgroundColor: "#C5A1FF",
      alignSelf: "center",
      borderRadius: "1rem",
      fontSize: "1rem",
      marginBottom: "1rem",
    },
    line: {
      width: "8px",
      height: WindowWidth >= 500 ? "40px" : "60px",
      backgroundColor: "#C5A1FF",
      alignSelf: "center",
    },
    tripCostContainer: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      alignItems: "center",
    },
    tripCost: {
      width: "30%",
      padding: "10px",
      backgroundColor: Colors.transparentBlack,
      borderRadius: "1rem",
      border: "1px solid #C5A1FF",
      display: "flex",
      gap: "",

      alignItems: "center",
      justifyContent: "center",
    },
    tripCostInput: {
      width: "70%",
      padding: "10px 0px",
      color: Colors.black,
      borderRadius: "1rem",
      backgroundColor: "transparent",
    },
    modifyTripButton: {
      position: "fixed",
      right: WindowWidth >= 1300 ? "370px" : "10px",
      bottom: WindowWidth >= 970 ? "1rem" : "5rem",
      width: WindowWidth >= 970 ? "10%" : "30%",
      backgroundColor: "#C5A1FF",
      color: Colors.black,
      padding: "15px",
      borderRadius: "1rem",
      margin: "10px 10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    shareButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "fixed",
      left: WindowWidth >= 970 ? "270px" : "2rem",
      bottom: WindowWidth >= 970 ? "1rem" : "5rem",
      width: "60px",
      backgroundColor: "#C5A1FF",
      color: Colors.black,
      padding: "15px",
      borderRadius: "50%",
      margin: "0px 8px",
    },
    bucket: {
      backgroundColor: "#C5A1FF",
      cursor: "pointer",
      borderRadius: "50%",
      padding: "10px",
      paddingLeft: "15px",
      paddingRight: "15px",
    },
    plan: {
      display: "flex",
      flexDirection: "column",
      marginTop: "2rem",
      marginBottom: "2rem",
    },
  };
};