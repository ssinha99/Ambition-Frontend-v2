import {
  Box,
  Divider,
  Fab,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Menu from "../shared/Menu";
import CancelButton from "../shared/CancelButton";
import PrimaryButton from "../shared/PrimaryButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CustomProgressBar from "../shared/CustomProgressBar";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import EditUnit from "./EditUnit";
import AddIcon from "@mui/icons-material/Add";
import SelectAssets from "./SelectAssets";
import { detailedData as detailedDataType } from "../data/Ambition.detailedData.type";
interface IAllocatedFunds {
  setShowAmbitionAllocation: React.Dispatch<React.SetStateAction<boolean>>;
  currentGoalId: string;
  setShowEditGoals: React.Dispatch<React.SetStateAction<boolean>>;
  showSelectAssetsFlag?: boolean
  GoalDetailsData?: detailedDataType
}

const AllocatedAssets: React.FC<IAllocatedFunds> = ({
  setShowAmbitionAllocation,
  currentGoalId,
  setShowEditGoals,
  showSelectAssetsFlag,
  GoalDetailsData
}) => {
  // const [data, setData] = useState<detailedDataType>()
  const currentData = GoalDetailsData?.data.find((ele) => ele.goalId === currentGoalId);
  const [showSelectAssets, setShowSelectAssets] = useState<boolean>(showSelectAssetsFlag ?? false);

  const [disableSaveBtn, setDisableSaveBtn] = useState<boolean>(false);

  const handleSaveDisableFn = (val: boolean) => {
    setDisableSaveBtn(val)
  }

  // useEffect(() => {
  //   axios.get('http://localhost:3000/ambitionsDetailedData')
  //   .then((res) => {
  //     setData(res.data)
  //   })
  //   .catch((error) => console.log(error))
  // },[])

  return (
    <>
      <Box sx={{ minHeight: "95vh" }}>
        <Menu
          heading={"Ambition Allocations"}
          setShowAmbitionAllocation={setShowAmbitionAllocation}
          showDeleteIcon={false}
        />
        <Stack spacing={1} sx={{ paddingTop: "10px", paddingX: "15px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "600" }}>
              {currentData?.cardHeading}
            </Typography>
            <IconButton
              sx={{ padding: "1px" }}
              onClick={() => setShowEditGoals(true)}
            >
              <EditOutlinedIcon sx={{ color: "#6B9080" }}></EditOutlinedIcon>
            </IconButton>
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{ fontWeight: "600", marginTop: "-8px" }}
            >
              {currentData?.goalType}
            </Typography>
          </Box>
          <Stack direction={"row"} justifyContent={"space-between"} pt={1}>
            <Stack minWidth={"50%"} pt={0.5}>
              <CustomProgressBar
                variant="determinate"
                value={
                  currentData &&
                  Number(
                    (
                      (currentData?.amount / currentData.totalAmount) *
                      100
                    ).toFixed(0)
                  )
                }
                sx={{ height: "18px" }}
              ></CustomProgressBar>
              <Box
                sx={{ display: "flex", justifyContent: "flex-start" }}
                alignItems={"center"}
                mt={0.2}
              >
                <CurrencyRupeeOutlinedIcon
                  sx={{ color: "#6B9080", fontSize: "12px" }}
                ></CurrencyRupeeOutlinedIcon>
                <Typography
                  sx={{
                    fontWeight: "600",
                    color: "#6B9080",
                    fontSize: "14px",
                  }}
                >
                  {currentData && Intl.NumberFormat('en-In').format(currentData?.amount)} /
                </Typography>

                <CurrencyRupeeOutlinedIcon
                  sx={{ paddingTop: "2px", fontSize: "12px" }}
                ></CurrencyRupeeOutlinedIcon>
                <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                  {currentData && new Intl.NumberFormat('en-IN').format(currentData?.totalAmount)}
                </Typography>
              </Box>
            </Stack>

            <Stack>
              <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                {currentData?.daystoGo} days to go
              </Typography>
              <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                {currentData?.maturityDate}
              </Typography>
            </Stack>
          </Stack>

          <Divider
            variant="fullWidth"
            sx={{ color: "#D9D9D9", height: "20px" }}
          />
          {showSelectAssets ? (
            <SelectAssets currentGoalId={currentGoalId} showSelectAssets={showSelectAssets}/>
          ) : (
            <>
              <Box display={"flex"} alignItems={"center"}>
                <Typography fontSize={"16px"} fontWeight={600}>
                  Allocated Funds
                </Typography>
              </Box>

              

              {currentData?.Mutualfunds.map((fund) => (
                <EditUnit fund={fund} handleSaveDisableFn={handleSaveDisableFn}/>
              ))}
              {currentData?.Stocks.map((stock) => (
                <EditUnit stock={stock} handleSaveDisableFn={handleSaveDisableFn}/>
              ))}
            </>
          )}
        </Stack>
      </Box>

      {!showSelectAssets ? (
        <Box
          sx={{
            textAlign: "right",
            paddingRight: "16px",
            position: "sticky",
            bottom: "50px",
          }}
        >
          <Fab
            disableRipple
            aria-label="add"
            sx={{
              background: "#6B9080",
              "&:hover": { background: "#6B9080" },
            }}
            onClick={() => setShowSelectAssets(true)}
          >
            <AddIcon sx={{ fontSize: "50px", color: "white" }} />
          </Fab>
        </Box>
      ) : (
        ""
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          paddingBottom: "2%",
        }}
      >
        <CancelButton
          variant="outlined"
          sx={{ width: "160px" }}
          //   onClick={() => setShowEditGoals && setShowEditGoals(false)}
          onClick={() => setShowAmbitionAllocation(false)}
        >
          Discard Changes
        </CancelButton>
        <PrimaryButton
          variant="contained"
          sx={{ width: "160px" }}
          disabled={!disableSaveBtn}
          //   onClick={handleSaveBtn}
        >
          {showSelectAssets? "Add Assets": "Save Allocations"}
        </PrimaryButton>
      </Box>
    </>
  );
};

export default AllocatedAssets;
