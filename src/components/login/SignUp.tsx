import {
  Box,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PrimaryButton from "../shared/PrimaryButton";
import { Link } from "react-router-dom";
import SignUpNextScreen from "./SignUpNextScreen";

interface ISignUpProps {}
const SignUp: React.FC<ISignUpProps> = ({}) => {
  const [showNextScreen, setShowNextScreen] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<string>()
  const [age, setAge] = useState<number>()
  
  return (
    <>
      {showNextScreen ? (
        <SignUpNextScreen name={name} gender={gender} age={age}/>
      ) : (
        <>
          <Stack
            minHeight={"100vh"}
            spacing={2}
            textAlign={"center"}
            padding={2}
          >
            <Stack pt={4} spacing={4} textAlign={"left"}>
              <Typography variant="h3" fontWeight={600} color={"#6b9080"}>
                Ambitions
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                Sign Up
              </Typography>
            </Stack>
            <TextField
              sx={{ background: "white" }}
              placeholder="Name *"
              autoComplete="none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            ></TextField>
            <Select
              sx={{ background: "white", textAlign: "left" }}
              value={gender ?? "-"}
              onChange={(e) => setGender(e.target.value)}
              placeholder="-"
              required
            >
              <MenuItem value={"-"} disabled>-- select gender --</MenuItem>
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
            <TextField
              sx={{ background: "white" }}
              placeholder="Age *"
              autoComplete="none"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              required
              fullWidth
            ></TextField>

            <PrimaryButton disabled={(name === '' || !gender  || !age)} variant="contained" onClick={() => setShowNextScreen(true)}>
              Next
            </PrimaryButton>
          </Stack>
          <Box display={"flex"} justifyContent={"center"} pb={2} sx={{position: 'sticky', bottom: 0}}>
            <Typography variant="body1" fontWeight={600}>
              Already have an account?
            </Typography>
            &nbsp;
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <Typography color={"#6b9080"} variant="body1" fontWeight={600}>
                Log in
              </Typography>
            </Link>
          </Box>
        </>
      )}
    </>
  );
};

export default SignUp;
