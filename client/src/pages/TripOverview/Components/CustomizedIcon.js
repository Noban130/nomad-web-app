import React, { useEffect, useState } from "react";
import { DeparatureIcon } from "../../../api/Icons";
import { useContextApi } from "../../../api/ContextApi";

function CustomizedIcon({ Content, Direction, Width, Icon, Title }) {
  let state = useContextApi();
  let [Colors] = state.Colors;

  let styles = style(Colors, Width, Direction);

  return (
    <div style={styles.container}>
      {Direction === "left" && (
        <div style={styles.text}>
          <p>{Title}</p>
          {Content}
        </div>
      )}
      <div style={styles.iconContainer}>
        <Icon Color={Colors.black} width={Width}></Icon>
      </div>
      {Direction === "right" && (
        <div style={styles.text}>
          <p>{Title}</p>
          {Content}
        </div>
      )}
    </div>
  );
}

let style = (Colors, Width, Direction) => {
  return {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: Direction === "right" ? "flex-start" : "flex-end",
      position: "relative",
      height: Width + 30,
    },
    iconContainer: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid #C5A1FF",
      borderRadius: "50%",
      width: Width + 30,
      height: Width + 30,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      paddingLeft: Direction === "right" && Width >= 700 ? Width + 100 : 30,
      paddingRight: Direction === "left" && Width >= 700 ? Width + 100 : 30,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: Colors.black,
    },
  };
};

export default CustomizedIcon;