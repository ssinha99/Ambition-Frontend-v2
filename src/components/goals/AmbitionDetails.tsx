import { Box, CircularProgress, Divider, IconButton, Stack, Typography } from "@mui/material";
import Menu from "../shared/Menu";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CustomProgressBar from "../shared/CustomProgressBar";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import { useEffect, useState } from "react";
import AllocatedFunds from "./AllocatedFunds";
import EditGoal from "./EditGoal";
import FooterMenu from "../shared/FooterMenu";
import AllocatedAssets from "../allocations/AllocatedAssets";
import axios from "axios";
import { detailedData as detailedDataType } from "../data/Ambition.detailedData.type";

interface IAmbitionDetailsProps {
  setShowAmbitionDetails: React.Dispatch<React.SetStateAction<boolean>>;
  currentGoalId: string;
  goalTypeId: string;
}

const AmbitionDetails: React.FC<IAmbitionDetailsProps> = ({
  setShowAmbitionDetails,
  currentGoalId,
}) => {
  const [GoalDetailsData, setGoalDetailsData] = useState<detailedDataType>();
  const [funds, setFunds] = useState<any | undefined>();
  const [flag, setFlag] = useState<boolean>(false);
  const [showEditGoals, setShowEditGoals] = useState<boolean>(false);
  const [showAmbitionAllocation, setShowAmbitionAllocation] =
    useState<boolean>(false);
  const TOKEN = localStorage.getItem("userData");
  
  useEffect(() => {
    axios
      .get("http://localhost:3000/ambitionsDetailedData", {
        headers: {
          authorization: `Bearer ${JSON.parse(TOKEN ?? "")?.token}`,
        },
      })
      .then((res) => {
        setGoalDetailsData(res.data);
      })
      .catch((error) => console.log(error));
  }, [currentGoalId]);

  useEffect(() => {
    GoalDetailsData?.data.forEach((element) => {
      if (element.goalId === currentGoalId) {
        setFunds({
          mutualFunds: element.Mutualfunds,
          stocks: element.Stocks,
        });
        element.Mutualfunds.length === 0 &&
          element.Stocks.length === 0 &&
          setFlag(true);
      }
    });
  }, [GoalDetailsData]);

  return (
    <>
      <>
        {showEditGoals ? (
          <EditGoal
            setShowEditGoals={setShowEditGoals}
            currentGoalId={currentGoalId}
            GoalDetailsData={GoalDetailsData}
          />
        ) : showAmbitionAllocation ? (
          <AllocatedAssets
            setShowAmbitionAllocation={setShowAmbitionAllocation}
            currentGoalId={currentGoalId}
            setShowEditGoals={setShowEditGoals}
            showSelectAssetsFlag={flag}
            GoalDetailsData= {GoalDetailsData}
          />
        ) : (
          <Box sx={{ minHeight: "100vh" }}>
            <Menu
              setShowAmbitionDetails={setShowAmbitionDetails}
              heading={"Ambition Details"}
            />
            {GoalDetailsData === undefined ? (
              <Stack
                sx={{
                  color: "grey.500",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "55vh",
                }}
                spacing={2}
                direction="row"
              >
                <CircularProgress color="inherit" />
              </Stack>
            ) : (
              GoalDetailsData?.data.map((element) => {
                if (element.goalId === currentGoalId) {
                  return (
                    <Stack
                      spacing={1}
                      sx={{ paddingTop: "10px", paddingX: "15px" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="h5" sx={{ fontWeight: "600" }}>
                          {element.cardHeading.slice(0, 18)}
                          {element.cardHeading.length > 18 && <>...</>}
                        </Typography>
                        <IconButton
                          sx={{ padding: "1px" }}
                          onClick={() => setShowEditGoals(true)}
                        >
                          <EditOutlinedIcon
                            sx={{ color: "#6B9080" }}
                          ></EditOutlinedIcon>
                        </IconButton>
                      </Box>
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "600", marginTop: "-8px" }}
                        >
                          {element.goalType}
                        </Typography>
                      </Box>
                      <CustomProgressBar
                        variant="determinate"
                        value={Number(
                          (
                            (element.amount / element.totalAmount) *
                            100
                          ).toFixed(0)
                        )}
                        sx={{ height: "16px" }}
                      ></CustomProgressBar>
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontWeight: "600",
                          color: "#6B9080",
                        }}
                      >
                        {Number(
                          (
                            (element.amount / element.totalAmount) *
                            100
                          ).toFixed(0)
                        )}
                        %
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <CurrencyRupeeOutlinedIcon
                          sx={{
                            paddingTop: "7px",
                            color: "#6B9080",
                            fontSize: "18px",
                          }}
                        ></CurrencyRupeeOutlinedIcon>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: "600", color: "#6B9080" }}
                        >
                          {new Intl.NumberFormat("en-IN").format(
                            element.amount
                          )}{" "}
                          /
                        </Typography>

                        <CurrencyRupeeOutlinedIcon
                          sx={{ paddingTop: "7px", fontSize: "18px" }}
                        ></CurrencyRupeeOutlinedIcon>
                        <Typography variant="h6" sx={{ fontWeight: "600" }}>
                          {new Intl.NumberFormat("en-IN").format(
                            element.totalAmount
                          )}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant="h5" sx={{ fontWeight: "600" }}>
                          {element.daystoGo} days to go
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "600",
                            marginTop: "-5px",
                            textAlign: "center",
                          }}
                        >
                          Maturing on {element.maturityDate}
                        </Typography>
                      </Box>
                      <Divider
                        variant="middle"
                        sx={{ color: "#D9D9D9", height: "20px" }}
                      />

                      <Stack spacing={1}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingTop: "6px",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "600" }}
                          >
                            Funds
                          </Typography>
                          <IconButton
                            sx={{ padding: "0px" }}
                            onClick={() => setShowAmbitionAllocation(true)}
                          >
                            <EditOutlinedIcon
                              fontSize="medium"
                              sx={{ color: "#6B9080" }}
                            ></EditOutlinedIcon>
                          </IconButton>
                        </Box>
                        {!flag && (
                          <CustomProgressBar
                            variant="determinate"
                            value={Number(
                              (
                                (element.amount / element.totalAmount) *
                                100
                              ).toFixed(0)
                            )}
                            sx={{ height: "40px" }}
                          ></CustomProgressBar>
                        )}
                      </Stack>
                    </Stack>
                  );
                }
              })
            )}

            {flag ? (
              <Box
                sx={{
                  marginTop: "40px",
                  paddingX: "15px",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "600" }}>
                  You don't have any funds allocated for this ambition.
                </Typography>
                <Box
                  mt={1}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "600", color: "#6B9080", cursor: "pointer" }}
                    onClick={() => setShowAmbitionAllocation(true)}
                  >
                    Click here
                  </Typography>
                  &nbsp;
                  <Typography variant="h6" sx={{ fontWeight: "600" }}>
                    to start adding funds.
                  </Typography>
                </Box>
              </Box>
            ) : (
              <h1>
                <AllocatedFunds funds={funds} />
              </h1>
            )}
          </Box>
        )}
        {!showEditGoals && !showAmbitionAllocation && (
          <Box
            sx={{
              textAlign: "right",
              position: "sticky",
              bottom: "0px",
            }}
          >
            <FooterMenu activeIconName={"ambition"} />
          </Box>
        )}
      </>
    </>
  );
};

export default AmbitionDetails;
