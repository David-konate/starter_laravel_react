import Button from "@mui/material/Button";

const WhiteButton = ({ children, onClick, isActive = false }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: "white",
        color: isActive ? "var(--primary-color)" : "var(--black-color)",
        width: "fit-content",
        "&:hover": {
          color: "white",
          background: "var(--light-dark-color)",
        },
      }}
    >
      {children}
    </Button>
  );
};

export default WhiteButton;
