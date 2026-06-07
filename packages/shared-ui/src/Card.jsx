  import React from "react";
  import { tokens } from "./tokens.js";

  const style = {
    border: `1px solid ${tokens.colors.border}`,
    borderRadius: tokens.borderRadius,
    padding: tokens.spacing.md,
    margin: tokens.spacing.md,
    backgroundColor: tokens.colors.background,
  };

  const Card = ({ title, children }) => {
    return (
      <div style={style}>
        {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
        {children}
      </div>
    );
  };

  export default Card;