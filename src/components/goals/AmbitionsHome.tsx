import {
  Box,
  CircularProgress,
  Fab,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Menu from "../shared/Menu";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import GoalCard from "../shared/GoalCard";
import AmbitionDetails from "../goals/AmbitionDetails";
import { useEffect, useState } from "react";
import FooterMenu from "../shared/FooterMenu";
import { Link } from "react-router-dom";
import axios from "axios";
import { dataType } from "../data/Ambition.data.type";
import { useNavigate } from "react-router-dom";

const AmbitionsHome = () => {
  const [showAmbitionDetails, setShowAmbitionDetails] =
    useState<boolean>(false);
  const [currentGoalId, setCurrentGoalId] = useState<string>("");
  const [goalTypeId, setGoalTypeId] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [data, setData] = useState<dataType>();
  const navigate = useNavigate();
  const localStorageData = localStorage.getItem("userData");
  const TOKEN = localStorageData && JSON.parse(localStorageData ?? "")?.token


  const theme = useTheme();
  const smallerDevice = useMediaQuery(theme?.breakpoints?.down("md"));

  const data1 = data?.data?.map((val) => {
    const ambitions = val.values.filter((ele) =>
      ele?.cardHeading?.toLowerCase()?.includes(searchText?.toLowerCase())
    );
    return {
      goalTypeId: val.goalTypeId,
      goalType: val.goalType,
      values: ambitions
    };
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/ambitionsData", {
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
        navigate('/login')
      });
  }, []);

  return (
    <>
      {smallerDevice ? (
        <div>
          {showAmbitionDetails ? (
            <AmbitionDetails
              goalTypeId={goalTypeId}
              currentGoalId={currentGoalId}
              setShowAmbitionDetails={setShowAmbitionDetails}
            />
          ) : (
            <>
              <Box
                sx={{
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100vh",
                  paddingBottom: '90px'
                }}
              >
                <Menu heading={"Ambitions"} />
                <TextField
                  value={searchText}
                  variant="outlined"
                  placeholder="Search Ambitions"
                  autoComplete="off"
                  onChange={(e) => setSearchText(e.target.value)}
                  sx={{
                    background: "white",
                    width: "90%",
                    marginTop: "15px",
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

                {data === undefined ? (
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
                  data1?.map((element) => (
                    <Box
                      sx={{ marginTop: "15px", marginX: "5px" }}
                      key={element.goalTypeId}
                    >
                      <Box sx={{ textAlign: "left" }}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "600", paddingLeft: "10px" }}
                        >
                          {element.values.length > 0 && element.goalType}
                        </Typography>
                      </Box>
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                          }}
                          key={element.goalTypeId}
                        >
                          {element.values.map((ele) => (
                            <GoalCard
                              currentGoalId={ele.goalId}
                              setCurrentGoalId={setCurrentGoalId}
                              goalTypeId={element.goalTypeId}
                              setGoalTypeId={setGoalTypeId}
                              cardHeading={ele.cardHeading}
                              amount={ele.amount}
                              totalAmount={ele.totalAmount}
                              daystoGo={ele.daystoGo}
                              maturityDate={ele.maturityDate}
                              setShowAmbitionDetails={setShowAmbitionDetails}
                            ></GoalCard>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  ))
                )}
                <Box
                  sx={{
                    position: "fixed",
                    bottom: "75px",
                    width: '96%',
                    textAlign: "right"
                  }}
                >
                  <Link to={"/add"}>
                    <Fab
                      disableRipple
                      aria-label="add"
                      sx={{
                        background: "#6B9080",
                        "&:hover": { background: "#6B9080" },
                      }}
                    >
                      <AddIcon sx={{ fontSize: "50px", color: "white" }} />
                    </Fab>
                  </Link>
                </Box>
              </Box>
              <Box
                sx={{
                  position: "fixed",
                  bottom: "0px",
                  width: '100%'
                }}
              >
                <FooterMenu activeIconName={"ambition"} />
              </Box>
            </>
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1>Open the site on Mobile Device.</h1>
        </div>
      )}
    </>
  );
};

export default AmbitionsHome;
