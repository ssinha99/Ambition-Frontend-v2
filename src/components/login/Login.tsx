import {
  Box,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PrimaryButton from "../shared/PrimaryButton";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserEmail } from "../../store/profileSlice";

const Login = () => {
  const [phoneOrMail, setPhoneOrMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginBtnClick = () => {
    if (!phoneOrMail || !password) {
      setAlertMessage("Please enter all mandatory fields !!");
    } else {
      setIsFetching(true);
      const payload = {
        phoneOrMail: phoneOrMail.toLowerCase(),
        password,
      };
      axios
        .post("https://ambitions-backend.onrender.com/login", payload)
        .then((res) => {
          if (res.data.message) setAlertMessage(res.data.message);
          else {
            localStorage.setItem(
              "userData",
              JSON.stringify({ id: res.data?.email, token: res.data?.token })
            ); // localstorage store data in the form of string.
            dispatch(setUserEmail(res.data.email));
            navigate("/");
          }
          setIsFetching(false);
        })
        .catch((error) => {
          console.log({ Error: error });
        });
    }
  };
  const handlePhoneOrEmailField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (alertMessage !== "") setAlertMessage("");
    setPhoneOrMail(e.target.value);
  };

  const handlePasswordField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (alertMessage !== "") setAlertMessage("");
    setPassword(e.target.value);
  };

  return (
    <>
      <Stack minHeight={"100vh"} spacing={2} textAlign={"center"} padding={2}>
        <Stack pt={4} spacing={4} textAlign={"left"}>
          <Typography variant="h3" fontWeight={600} color={"#6b9080"}>
            Ambitions
          </Typography>
          <Typography variant="h5" fontWeight={600}>
            Login
          </Typography>
        </Stack>
        <TextField
          value={phoneOrMail}
          onChange={(e) => handlePhoneOrEmailField(e)}
          sx={{ background: "white" }}
          placeholder="Phone or Email *"
          autoComplete="none"
          fullWidth
        ></TextField>
        <TextField
          value={password}
          onChange={(e) => handlePasswordField(e)}
          sx={{ background: "white" }}
          type="password"
          placeholder="Password *"
          autoComplete="none"
          fullWidth
        ></TextField>
        <Box>
          <Typography variant="body2">{alertMessage}</Typography>
        </Box>
        <Box textAlign={"right"}>
          <Link to={"#"} style={{ textDecoration: "none", color: "black" }}>
            <Typography variant="body2" fontWeight={600}>
              Forgot Password?
            </Typography>
          </Link>
        </Box>
        <PrimaryButton
          variant="contained"
          onClick={() => handleLoginBtnClick()}
          disabled={isFetching}
        >
          {isFetching ? (
            <CircularProgress color="inherit" size={"25px"} />
          ) : (
            <Typography variant="body1">Login</Typography>
          )}
        </PrimaryButton>
      </Stack>
      <Box
        display={"flex"}
        justifyContent={"center"}
        pb={2}
        sx={{ position: "sticky", bottom: 0 }}
      >
        <Typography variant="body1" fontWeight={600}>
          Don't have an account?
        </Typography>
        &nbsp;
        <Link to={"/signup"} style={{ textDecoration: "none", color: "black" }}>
          <Typography color={"#6b9080"} variant="body1" fontWeight={600}>
            Sign up
          </Typography>
        </Link>
      </Box>
    </>
  );
};

export default Login;
