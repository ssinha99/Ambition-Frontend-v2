import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import AmbitionsIcon from "../../assets/AmbitionsIcon";
import FundsIcon from "../../assets/FundsIcon";
import ProfileIcon from "../../assets/ProfileIcon";
import { Link } from "react-router-dom";
interface IFooterMenuProps {
  activeIconName: string;
}

const FooterMenu: React.FC<IFooterMenuProps> = ({ activeIconName }) => {
  return (
    <div>
      <AppBar
        sx={{
          position: "sticky",
          background: "white",
          height: "7%",
          bottom: "0px",
          transition: "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-around", alignItems: "center" }}>
          <IconButton
            aria-label="menu"
            sx={{ paddingX: "20px", display: "inline" }}
            href="/"
          >
            <AmbitionsIcon
              sx={{
                fill: activeIconName === "ambition" ? "#66897A" : "#9E9E9E",
                fontSize: "22px",
              }}
            ></AmbitionsIcon>
            <Typography
              sx={{
                fontSize: "10px",
                color: activeIconName === "ambition" ? "#66897A" : "#9E9E9E",
              }}
            >
              Ambitions
            </Typography>
          </IconButton>

          <IconButton
            aria-label="menu"
            sx={{ paddingX: "20px", display: "inline" }}
          >
            <Link to={"/funds"}>
              <FundsIcon
                sx={{
                  fill: activeIconName === "Funds" ? "#66897A" : "#9E9E9E",
                  fontSize: "22px",
                }}
              ></FundsIcon>
            </Link>
            <Typography
              sx={{
                fontSize: "10px",
                color: activeIconName === "Funds" ? "#66897A" : "#9E9E9E",
              }}
            >
              Funds
            </Typography>
          </IconButton>

          <IconButton
            aria-label="menu"
            sx={{ paddingX: "20px", display: "inline" }}
            href="/profile"
          >
            <Link to={'/profile'}>
              <ProfileIcon
                sx={{ fill: activeIconName === "Profile" ? "#66897A" : "#9E9E9E", fontSize: "22px" }}
              ></ProfileIcon>
            </Link>
            <Typography sx={{ fontSize: "10px", color: activeIconName === "Profile" ? "#66897A" : "#9E9E9E"}}>Profile</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default FooterMenu;
