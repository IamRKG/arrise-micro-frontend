  import React from "react";
  import { tokens } from "./tokens.js";

  const styles = {
    primary: {
      backgroundColor: tokens.colors.primary,
      color: "#fff",
      border: "none",
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      borderRadius: tokens.borderRadius,
      fontSize: tokens.fontSize.md,
      cursor: "pointer",
    },
    secondary: {
      backgroundColor: "transparent",
      color: tokens.colors.primary,
      border: `1px solid ${tokens.colors.primary}`,
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
      borderRadius: tokens.borderRadius,
      fontSize: tokens.fontSize.md,
      cursor: "pointer",
    },
  };

  const Button = ({ variant = "primary", children, onClick }) => {
    return (
      <button style={styles[variant]} onClick={onClick}>
        {children}
      </button>
    );
  };

  export default Button;