import { Box, Typography } from "@mui/material";
import FooterMenu from "../shared/FooterMenu";
import Menu from "../shared/Menu";
const Funds = () => {
  return (
    <>
      <Menu heading="Funds"/>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={'100vh'}>
        <Typography variant="h5">
          Build in Progress!
        </Typography>
      </Box>
      <Box
        sx={{
          // textAlign: "right",
          position: "fixed",
          bottom: "0px",
          width: '100%'
        }}
      >
        <FooterMenu activeIconName={"Funds"} />
      </Box>
    </>
  );
};

export default Funds;
