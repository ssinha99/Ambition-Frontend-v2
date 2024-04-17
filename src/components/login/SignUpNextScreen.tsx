import {
  Box,
  CircularProgress,
  // InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PrimaryButton from "../shared/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
// import CancelButton from "../shared/CancelButton";
import axios from "axios";

interface ISignUpNextScreenProps {
  name: string;
  gender?: string;
  age?: number;
}

const SignUpNextScreen: React.FC<ISignUpNextScreenProps> = ({
  name,
  gender,
  age,
}) => {
  const [phone, setPhone] = useState<number>();
  const [password, setPassword] = useState<String>("");
  const [email, setEmail] = useState<String>("");
  const [alertMessage, setAlertMessage] = useState<String>();
  const [isFetching, setIsFetching] = useState<boolean>();
  const navigate = useNavigate()

  const handleSignUpBtn = () => {
    const payload = {
      name: name,
      gender: gender,
      age: age,
      phone: phone,
      password: password,
      email: email.toLowerCase(),
    };
    setIsFetching(true)
    axios
      .post("https://ambitions-backend.onrender.com/signup", payload)
      .then((res) => {
        console.log(res.data);
        setIsFetching(false)
        if (res.data?.message) {
          setAlertMessage(res.data.message);
        } else {
          setAlertMessage("");
          navigate('/login')
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Stack minHeight={"100vh"} spacing={2} textAlign={"center"} padding={2}>
        <Stack pt={4} spacing={4} textAlign={"left"}>
          <Typography variant="h2" fontWeight={600} color={"#6b9080"}>
            Logo
          </Typography>
          <Typography variant="h4" fontWeight={600}>
            Sign Up
          </Typography>
        </Stack>
        <TextField
          sx={{ background: "white" }}
          placeholder="Phone *"
          value={phone}
          onChange={(e) => setPhone(Number(e.target.value))}
          fullWidth
        ></TextField>
        <TextField
          sx={{ background: "white" }}
          placeholder="Password *"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          fullWidth
        ></TextField>
        {/* <TextField
          sx={{ background: "white" }}
          placeholder="OTP"
          autoComplete="none"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <CancelButton variant="text" sx={{ fontWeight: "600" }}>
                  Send
                </CancelButton>
              </InputAdornment>
            ),
          }}
        ></TextField> */}
        <TextField
          sx={{ background: "white" }}
          placeholder="Email ID *"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        ></TextField>
        <TextField
          sx={{ background: "white" }}
          placeholder="Invite Code (Optional)"
          fullWidth
          disabled
        ></TextField>
        <Box>
          <Typography variant="body2">{alertMessage ?? ""}</Typography>
        </Box>
        <PrimaryButton
          variant="contained"
          // href="/"
          onClick={() => handleSignUpBtn()}
          disabled={!phone || !password || !email}
        >
          {isFetching ? (
            <CircularProgress color="inherit" size={"25px"} />
          ) : (
            <Typography>Sign Up</Typography>
          )}
        </PrimaryButton>
      </Stack>
      <Box display={"flex"} justifyContent={"center"} pb={2} sx={{position: 'sticky', bottom: 0}}>
        <Typography variant="body1" fontWeight={600}>
          Already have an account?
        </Typography>
        &nbsp;
        <Link to={"/login"} style={{ textDecoration: "none", color: "black" }}>
          <Typography color={"#6b9080"} variant="body1" fontWeight={600}>
            Log in
          </Typography>
        </Link>
      </Box>
    </>
  );
};

export default SignUpNextScreen;
