import { LinearProgress, linearProgressClasses } from "@mui/material";
import styled from "styled-components";

const CustomProgressBar = styled(LinearProgress)(() => ({
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#D9D9D9",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#6B9080",
  }
}));

export default CustomProgressBar;
