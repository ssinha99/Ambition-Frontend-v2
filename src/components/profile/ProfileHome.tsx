import { Box, Modal, Stack, Typography } from "@mui/material";
import FooterMenu from "../shared/FooterMenu";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAvatar from "../shared/CustomAvatar";
import Menu from "../shared/Menu";
import CancelButton from "../shared/CancelButton";
// import { useSelector } from "react-redux";
// import { getUserEmail } from "../../store/profileSlice";
import LogoutIcon from '@mui/icons-material/Logout';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import { styleModal } from "../shared/styleModal";
import PrimaryButton from "../shared/PrimaryButton";

const ProfileHome = () => {
  // const userEmail = useSelector(getUserEmail)
  const userData = localStorage.getItem("userData") || "";
  const userEmail = userData !== '' ? JSON.parse(userData)?.id : '';
  const token = userData !== '' ? JSON.parse(userData)?.token : '';
  const [userProfile, setUserProfile] = useState<profileType[]>();
  const [showLogOutConfirmation, setShowLogOutConfirmation] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://ambitions-backend.onrender.com/getprofile/" + userEmail, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => {
        setUserProfile(res.data);
      })
      .catch((error) => {
        navigate("/login");
        console.log(error);
      });
  }, []);

  const handleLogOutBtn = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <Box minHeight={'100vh'}>
      <Menu heading={"Profile"} />
      <Stack direction={"row"} spacing={3} sx={{alignItems: 'center', padding: '8%'}}>
        <Box>
          <CustomAvatar name={userProfile && userProfile[0]?.name} />
        </Box>
        <Box >
          <Typography variant="h6" fontWeight={'600'}>{userProfile && userProfile[0]?.name}</Typography>
          <Typography variant="body2">{userProfile && userProfile[0]?.phone}</Typography>
        </Box>
      </Stack>
      <Stack spacing={1} width={'60%'} paddingLeft={4} sx={{position: 'fixed', bottom: '80px'}}>
        <CancelButton sx={{display: 'flex', justifyContent: 'left'}} onClick={() => setShowLogOutConfirmation(true)}>
          <LogoutIcon/>
          <Typography variant="h6" color={'#000000'} paddingX={2}>Log out</Typography>
        </CancelButton>
        <CancelButton sx={{display: 'flex', justifyContent: 'left'}}>
          <HeadsetMicIcon/>
          <Typography variant="h6" color={'#000000'} paddingX={2}>Contact us</Typography>
        </CancelButton>
        <CancelButton sx={{display: 'flex', justifyContent: 'left'}}>
          <PersonAddAltSharpIcon/>
          <Typography variant="h6" color={'#000000'} paddingX={2}>Invite Friends</Typography>
        </CancelButton>
      </Stack>
      <Box
        sx={{
          position: "fixed",
          bottom: "0px",
          width: "100%",
        }}
      >
        <FooterMenu activeIconName={"Profile"} />
      </Box>

      <Modal
        open={showLogOutConfirmation}
        onClose={() => setShowLogOutConfirmation(false)}
      >
        <Box sx={styleModal}>
          <Typography variant="h6" fontWeight={600} paddingY={2}>Are you sure you want to logout?</Typography>
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
                  onClick={() => setShowLogOutConfirmation(false)}
                >
                 <Typography variant="body1">No</Typography>
                </CancelButton>
                <PrimaryButton
                  variant="contained"
                  sx={{ width: "120px" }}
                  onClick={handleLogOutBtn}
                >
                    <Typography variant="body1">Yes</Typography>
                </PrimaryButton>
              </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfileHome;
