import { SxProps } from "@mui/material";

export const ContainerStyles: SxProps = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",
    margin: "0 auto",
};

export const MainBoxStyles: SxProps = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

export const ButtonStyles: SxProps = {
    mt: 3,
    mb: 2,
    borderRadius: "20px",
    backgroundColor: "black",
    marginTop: "16px",
    textTransform: "none",
};

export const ErrorFieldStyles: SxProps = {
    marginTop: "10px",
    textAlign: "center",
    backgroundColor: "#DC3545",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "0.875rem",
    border: "1px solid #F5C6CB",
};
