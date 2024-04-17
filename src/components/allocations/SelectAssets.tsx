import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import EditUnit from "./EditUnit";
import allAssets from "../data/AllAssets.json";
import axios from "axios";
import { detailedData } from "../data/Ambition.detailedData.type";

interface ISelectAssets {
  currentGoalId: string;
  showSelectAssets?: boolean;
}

const SelectAssets: React.FC<ISelectAssets> = ({
  currentGoalId,
  showSelectAssets,
}) => {
  const [data, setData] = useState<detailedData>();
  const currentData = data?.data.find((ele) => ele.goalId === currentGoalId);
  const [searchText, setSearchText] = useState<string>("");
  const theme = useTheme();
  const isSmallerDevice = useMediaQuery(theme.breakpoints.down(376));
  const TOKEN = localStorage.getItem("userData");
  
  useEffect(() => {
    axios
      .get("https://ambitions-backend.onrender.com/ambitionsDetailedData", {
        headers: {
          authorization: `Bearer ${JSON.parse(TOKEN ?? "")?.token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Stack
      spacing={1.2}
      sx={{
        background: "#D9D9D9",
        borderRadius: "10px",
        maxHeight: "calc(100vh - 350px)",
        overflow: "auto",
      }}
      justifyContent={"center"}
      textAlign={"center"}
      p={1}
    >
      <Box
        mb={100}
        position={"sticky"}
        top={-11}
        sx={{ background: "#D9D9D9", zIndex: "1100", paddingBottom: "5px" }}
      >
        <Typography py={1.5} sx={{ fontSize: "16px", fontWeight: "600" }}>
          Select Funds for Allocation
        </Typography>
        <TextField
          value={searchText}
          fullWidth
          variant="outlined"
          placeholder="Search Funds"
          autoComplete="off"
          onChange={(e) => setSearchText(e.target.value)}
          sx={{
            background: "white",
            marginTop: "0",
            borderRadius: "10px",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon sx={{ fontSize: "28px" }}></SearchIcon>
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Box>
      {isSmallerDevice ? <Box p={3}> </Box> : ""}
      {currentData?.Mutualfunds.length === 0 &&
      currentData.Stocks.length === 0 ? (
        <>
          {allAssets.Mutualfunds.map((fund) => (
            <EditUnit fund={fund} showSelectAssets={showSelectAssets} />
          ))}
          {allAssets.Stocks.map((stock) => (
            <EditUnit stock={stock} showSelectAssets={showSelectAssets} />
          ))}
        </>
      ) : (
        <>
          {currentData?.Mutualfunds.map((fund) => (
            <EditUnit fund={fund} showSelectAssets={showSelectAssets} />
          ))}
          {currentData?.Stocks.map((stock) => (
            <EditUnit stock={stock} showSelectAssets={showSelectAssets} />
          ))}
        </>
      )}
    </Stack>
  );
};

export default SelectAssets;
