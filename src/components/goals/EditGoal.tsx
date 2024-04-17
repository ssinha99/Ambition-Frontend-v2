import React, { useEffect, useState } from "react";
import Menu from "../shared/Menu";
import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import CurrencyRupeeTwoToneIcon from "@mui/icons-material/CurrencyRupeeTwoTone";
import CancelButton from "../shared/CancelButton";
import PrimaryButton from "../shared/PrimaryButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import { detailedData as detailedDataType } from "../data/Ambition.detailedData.type";
// import { useUpdateEffect } from 'usehooks-ts'
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { styleModal } from "../shared/StyleModal";


interface IEditGoalProps {
  setShowEditGoals?: React.Dispatch<React.SetStateAction<boolean>>;
  currentGoalId: string;
  GoalDetailsData?: detailedDataType;
}

const EditGoal: React.FC<IEditGoalProps> = ({
  setShowEditGoals,
  currentGoalId,
  GoalDetailsData,
}) => {
  const [ambitionName, setAmbitionName] = useState<string>();
  const [ambitionType, setAmbitionType] = useState<string>();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  // const [date, setDate] = useState<Date | null>(new Date("03-02-2024"));
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [previousData, setPreviousData] = useState<any>();
  const [showSaveConfirmation, setShowSaveConfirmation] =
    useState<boolean>(false);
  const [disableSaveBtn, setDisableSaveBtn] = useState<boolean>(true);
  // const [data, setData] = useState<detailedDataType>();
  const ambitionTypeArr = ["Gadgets", "Travel Goals", "LifeStyle"];
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState<boolean>();
  const TOKEN = localStorage.getItem("userData");

  
  useEffect(() => {
    GoalDetailsData?.data.map((element) => {
      if (element.goalId === currentGoalId) {
        setPreviousData(element);
        setAmbitionName(element?.cardHeading);
        setAmbitionType(element?.goalType);
        setTotalAmount(element?.totalAmount);
        setDate(dayjs(element?.maturityDate));
      }
    });
  }, [currentGoalId, GoalDetailsData]);

  useEffect(() => {
    if (
      previousData?.cardHeading != ambitionName ||
      previousData?.totalAmount != totalAmount ||
      previousData?.goalType !== ambitionType ||
      previousData?.maturityDate !== date?.toString().slice(8,11) + " " +date?.date() + ", " + date?.year()
    ) {
      setDisableSaveBtn(false);
    } else {
      setDisableSaveBtn(true);
    }
  }, [ambitionName, totalAmount, ambitionType, date]);

  const handleConfirmationOverlaySaveBtn = () => {
    const payload = {
      goalId: currentGoalId,
      goalType: ambitionType,
      cardHeading: ambitionName,
      amount: previousData.amount,
      totalAmount: totalAmount,
      daystoGo: 27,
      maturityDate: date?.toString().slice(8,11) + " " +date?.date() + ", " + date?.year(),
      prevGoalType: previousData?.goalType
      // id: previousData._id this will not work because it is coming from ambitiondetaileddata.
    };
    setIsFetching(true);
    axios
      .post("https://ambitions-backend.onrender.com/updateAmbition", payload, {
        headers: {
          authorization: `Bearer ${JSON.parse(TOKEN ?? "")?.token}`,
        },
      })
      .then(() => {
        location.reload();
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const handleTargetAmountTextField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // console.log(typeof(Number(e.target.value))+ " " + Number(e.target.value))
    // console.log(new Intl.NumberFormat('en-IN').formatToParts(Number(e.target.value)))
    setTotalAmount(Number(e.target.value));
  };

  return (
    <>
      <Box sx={{ height: "95vh" }}>
        <Menu
          goalId={currentGoalId}
          heading={"Edit Ambition"}
          setShowEditGoals={setShowEditGoals}
          showDeleteIcon={true}
          AmbtionName={ambitionName}
        />

        <Stack spacing={2} sx={{ padding: "12px" }}>
          <Box>
            <Typography variant="body2">Ambition Name</Typography>
            <TextField
              sx={{
                background: "white",
                borderRadius: "20px",
                fontWeight: "600",
                paddingTop: "2px",
              }}
              fullWidth
              value={ambitionName}
              onChange={(e) => setAmbitionName(e.target.value)}
              placeholder="Ambition Name"
            ></TextField>
          </Box>
          <Box>
            <Typography variant="body2">Ambition Type</Typography>
            <Select
              sx={{ background: "white", border: "none", paddingTop: "2px" }}
              value={ambitionType}
              onChange={(e) => setAmbitionType(e.target.value)}
              fullWidth
            >
              {ambitionTypeArr.map((type) => (
                <MenuItem key={type} value={type} selected={type == ambitionType}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Typography variant="body2">Target amount</Typography>
            <TextField
              sx={{
                background: "white",
                borderRadius: "20px",
                paddingTop: "2px",
              }}
              value={totalAmount}
              onChange={(e) => handleTargetAmountTextField(e)}
              placeholder="Target amount"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      disableRipple
                      disableFocusRipple
                      disableTouchRipple
                    >
                      <CurrencyRupeeTwoToneIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Box>
          <Box>
            <Typography variant="body2">Maturity Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                sx={{ background: "white", width: "100%", paddingTop: "2px" }}
                value={date}
                onChange={(newValue) => setDate(newValue)}
                disablePast
                slots={{
                  openPickerIcon: CalendarMonthTwoToneIcon,
                }}
              />
            </LocalizationProvider>
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          paddingBottom: "1%",
          position: 'stikcy',
          bottom: 0
        }}
      >
        <CancelButton
          variant="outlined"
          sx={{ width: "160px" }}
          onClick={() => setShowEditGoals && setShowEditGoals(false)}
        >
          Cancel Changes
        </CancelButton>
        <PrimaryButton
          variant="contained"
          sx={{ width: "160px" }}
          onClick={() => setShowSaveConfirmation(true)}
          disabled={disableSaveBtn}
        >
          Save Changes
        </PrimaryButton>
      </Box>

      {showSaveConfirmation && (
        <Modal
          open={showSaveConfirmation}
          onClose={() => setShowSaveConfirmation(false)}
        >
          <Box sx={styleModal}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <IconButton onClick={() => setShowSaveConfirmation(false)}>
                <CloseIcon></CloseIcon>
              </IconButton>
            </Box>
            <Stack spacing={2}>
              <Typography variant="body1" fontWeight={600}>
                Please confirm the changes:
              </Typography>
              {previousData.cardHeading !== ambitionName && (
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    Name:
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body1" fontWeight={600}>
                      {previousData.cardHeading}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      paddingX={1}
                      mt={0.45}
                    >
                      <ArrowForwardIcon fontSize="small" />
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {ambitionName}
                    </Typography>
                  </Box>
                </Box>
              )}
              {previousData.totalAmount !== totalAmount && (
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    Target Value:
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CurrencyRupeeTwoToneIcon
                      sx={{ fontSize: "18px", paddingBottom: "2px" }}
                    />
                    <Typography variant="body1" fontWeight={600}>
                      {previousData.totalAmount}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      paddingX={1}
                      mt={0.45}
                    >
                      <ArrowForwardIcon fontSize="small" />
                    </Typography>
                    <CurrencyRupeeTwoToneIcon
                      sx={{ fontSize: "18px", paddingBottom: "2px" }}
                    />
                    <Typography variant="body1" fontWeight={600}>
                      {totalAmount}
                    </Typography>
                  </Box>
                </Box>
              )}
              {previousData.goalType !== ambitionType && (
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    Ambition Type:
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body1" fontWeight={600}>
                      {previousData.goalType}{" "}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      paddingX={1}
                      mt={0.45}
                    >
                      <ArrowForwardIcon fontSize="small" />
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {ambitionType}
                    </Typography>
                  </Box>
                </Box>
              )}
              {previousData?.maturityDate !== date?.toString().slice(8,11) + " " +date?.date() + ", " + date?.year() && (
                <Box>
                  <Typography variant="body1" fontWeight={600}>
                    Maturity Date:
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body1" fontWeight={600}>
                      {previousData?.maturityDate}{" "}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={600}
                      paddingX={1}
                      mt={0.45}
                    >
                      <ArrowForwardIcon fontSize="small" />
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {date?.toString().slice(8,11) + " " +date?.date() + ", " + date?.year()}
                    </Typography>
                  </Box>
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  paddingBottom: "1%",
                }}
              >
                <CancelButton
                  variant="outlined"
                  sx={{ width: "120px" }}
                  onClick={() => setShowSaveConfirmation(false)}
                >
                  Discard
                </CancelButton>
                <PrimaryButton
                  variant="contained"
                  sx={{ width: "120px" }}
                  onClick={handleConfirmationOverlaySaveBtn}
                >
                  {isFetching ? (
                    <CircularProgress color="inherit" size={"25px"} />
                  ) : (
                    <Typography>Save</Typography>
                  )}
                </PrimaryButton>
              </Box>
            </Stack>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default EditGoal;
