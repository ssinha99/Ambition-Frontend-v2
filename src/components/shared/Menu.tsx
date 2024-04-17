import { Box, CircularProgress, IconButton, Modal, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useState } from "react";
import CancelButton from "./CancelButton";
import PrimaryButton from "./PrimaryButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IMenuProps {
  goalId?: string;
  heading: string;
  setShowAmbitionDetails?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditGoals?: React.Dispatch<React.SetStateAction<boolean>>;
  AmbtionName?: string;
  showDeleteIcon?: boolean;
  setShowAmbitionAllocation?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<IMenuProps> = ({
  goalId,
  heading,
  setShowAmbitionDetails,
  setShowEditGoals,
  AmbtionName,
  showDeleteIcon,
  setShowAmbitionAllocation,
}) => {
  const [deletePopper, setDeletePopper] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const navigate = useNavigate();
  const TOKEN = localStorage.getItem("userData");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    backgroundColor: "background.paper",
    boxShadow: 24,
    pt: 3,
    px: 2,
    pb: 1,
    textAlign: "center",
    borderRadius: "10px",
  };
  const handleBackArrow = () => {
    if (heading === "Ambition Details") {
      setShowAmbitionDetails && setShowAmbitionDetails(false);
    }
    if (heading === "Edit Ambition") {
      setShowEditGoals && setShowEditGoals(false);
    }
    if (heading === "Ambition Allocations") {
      setShowAmbitionAllocation && setShowAmbitionAllocation(false);
    }
    if(heading === 'Profile'){
      navigate('/')
    }
  };

  const handleDeletePopperClose = () => {
    setDeletePopper(false);
  };

  const handleDeletePopperOpen = () => {
    setDeletePopper(true);
  };

  const handleYesBtn = () => {
    const config = {
      data: {
        cardHeading: AmbtionName,
        goalId: goalId,
      },
      headers: {
          authorization: `Bearer ${JSON.parse(TOKEN ?? "")?.token}`,
      }  
    };
    setIsFetching(true);
    axios
      .delete("http://localhost:3000/deleteAmbition", config)
      .then(() => {
        console.log("deleted successfully!");
        location.reload();
        setIsFetching(false);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: heading !== "Ambitions" ? "space-between" : "center",
          position: "sticky",
          top: "0",
          zIndex: "1100",
          height: "50px",
          background: "white",
        }}
      >
        {heading !== "Ambitions" && (
          <IconButton
            onClick={() => handleBackArrow()}
            sx={{ padding: "12px", color: "black" }}
            href={heading === "Add Ambition" ? "/" : ""}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        )}
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "600",
            paddingTop: "12.5px",
            paddingRight: showDeleteIcon
              ? "0px"
              : heading == "Ambitions"
              ? "0px"
              : "40px",
          }}
        >
          {heading}
        </Typography>
        <Box>
          {showDeleteIcon && (
            <IconButton
              sx={{ background: "", paddingTop: "8px" }}
              onClick={handleDeletePopperOpen}
            >
              <DeleteOutlinedIcon sx={{ fontSize: "32px" }} />
            </IconButton>
          )}
        </Box>
        {deletePopper && (
          <Modal open={deletePopper} onClose={handleDeletePopperClose}>
            <Box sx={style}>
              <Typography variant="h6" fontWeight={600}>
                Are you sure you want to delete {AmbtionName} Ambition?
              </Typography>
              <Typography variant="body1" mt={1}>
                The ambition will be deleted and all allocated funds will be
                moved to surplus.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  paddingTop: "10px",
                }}
              >
                <CancelButton
                  variant="outlined"
                  sx={{ width: "45%", color: "black" }}
                  onClick={handleDeletePopperClose}
                >
                  No
                </CancelButton>
                <PrimaryButton
                  disabled={isFetching}
                  variant="contained"
                  sx={{ width: "45%" }}
                  onClick={handleYesBtn}
                >
                  {isFetching ? (
                    <CircularProgress color="inherit" size={"25px"} />
                  ) : (
                    <Typography>Yes</Typography>
                  )}
                </PrimaryButton>
              </Box>
            </Box>
          </Modal>
        )}
      </Box>
    </>
  );
};

export default Menu;
