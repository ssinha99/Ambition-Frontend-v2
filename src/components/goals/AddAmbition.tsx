import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Menu from "../shared/Menu";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import CancelButton from "../shared/CancelButton";
import PrimaryButton from "../shared/PrimaryButton";
import CurrencyRupeeTwoToneIcon from "@mui/icons-material/CurrencyRupeeTwoTone";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthTwoToneIcon from "@mui/icons-material/CalendarMonthTwoTone";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";

const AddAmbition = () => {
  const [ambitionName, setAmbitionName] = useState<string>("");
  const [ambitionType, setAmbitionType] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const ambitionTypeArr = ["Gadgets", "Travel Goals", "LifeStyle"];
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState<boolean>();
  const TOKEN = localStorage.getItem("userData");

  const handleSaveBtn = () => {
    const len = ambitionType.length;
    const GoalId =
      ambitionType[0] +
      ambitionType[len - 1] +
      Math.floor(Math.random() * 10000 + 1);
    const payload = {
      goalId: GoalId,
      cardHeading: ambitionName,
      goalType: ambitionType,
      amount: 0,
      totalAmount: amount,
      daystoGo: 0,
      maturityDate:
        date?.toString().slice(8, 11) +
        " " +
        date?.date() +
        ", " +
        date?.year(),
    };
    setIsFetching(true);
    axios
      .post("http://localhost:3000/addAmbition", payload, {
        headers: {
          authorization: `Bearer ${JSON.parse(TOKEN ?? "")?.token}`,
        },
      })
      .then(() => {
        navigate("/");
        setIsFetching(false);
      })
      .catch((error) => console.log(error));
  };

  // console.log(date?.toString().slice(8,11) + " " +date?.date() + ", " + date?.year())
  // console.log(date?.year())
  return (
    <>
      <Box sx={{ height: "95vh" }}>
        <Menu
          heading={"Add Ambition"}
          //   setShowEditGoals={setShowEditGoals}
          showDeleteIcon={false}
          //   AmbtionName={ambitionName}
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
              onChange={(e) => setAmbitionType(e.target.value as string)}
              fullWidth
            >
              {ambitionTypeArr.map((type) => (
                <MenuItem value={type}>{type}</MenuItem>
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
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
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
          paddingBottom: "2%",
          position: 'sticky',
          bottom: 0
        }}
      >
        <CancelButton
          variant="outlined"
          sx={{ width: "160px" }}
          //   onClick={() => setShowEditGoals && setShowEditGoals(false)}
          href="/"
        >
          Cancel Changes
        </CancelButton>
        <PrimaryButton
          variant="contained"
          sx={{ width: "160px" }}
          onClick={() => handleSaveBtn()}
          disabled={
            ambitionName === "" ||
            ambitionType === "" ||
            amount === 0 ||
            isFetching
          }
        >
          <Stack direction={"row"} spacing={1}>
            {isFetching ? (
              <CircularProgress color="inherit" size={"25px"} />
            ) : (
              <Typography>Save Changes</Typography>
            )}
          </Stack>
        </PrimaryButton>
      </Box>
    </>
  );
};

export default AddAmbition;
