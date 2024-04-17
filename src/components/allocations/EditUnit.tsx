import { Box, Checkbox, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PrimaryButton from "../shared/PrimaryButton";
import CancelButton from "../shared/CancelButton";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import CustomTestBox from "../shared/CustomTextBox";

interface IEditUnit {
  fund?: {
    unitPrice: string;
    quantity: string;
    fundName: string;
    fundId: string;
    fundType: string;
  };
  stock?: {
    stockName: string;
    stockId: string;
    type: string;
    price: string;
    quantity: string;
  };
  showSelectAssets?: boolean;
  handleSaveDisableFn?: (val: boolean) => void;
}

const EditUnit: React.FC<IEditUnit> = ({
  fund,
  stock,
  showSelectAssets,
  handleSaveDisableFn,
}) => {
  const [showEditUnit, setShowEditUnit] = useState<boolean>(false);
  const [fundQantity, setfundQantity] = useState<String | undefined>(
    fund?.quantity || stock?.quantity
  );
  const [check, setCheck] = useState<boolean>(false);

  useEffect(() => {
    if (handleSaveDisableFn) {
      if (fundQantity !== (fund?.quantity || stock?.quantity)) {
        handleSaveDisableFn(true);
      } else {
        handleSaveDisableFn(false);
      }
    }
  }, [fundQantity]);

  const handleCancelOnclick = () => {
    setShowEditUnit(false);
    setfundQantity(fund?.quantity || stock?.quantity);
  };
  return (
    <>
      <Box
        sx={{
          background: "white",
          borderRadius: "5px",
          padding: "6px",
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Stack direction={"row"} justifyContent={"space-between"}>
          {showSelectAssets ? (
            <Stack spacing={0.5} direction={"row"}>
              <Checkbox
                checked={check}
                sx={{
                  // background: "#6b9080",
                  padding: 0,
                  "&.Mui-checked": {
                    color: "#6b9080",
                  },
                }}
                onChange={() => setCheck(!check)}
              ></Checkbox>
              <Typography variant="body1" fontWeight={600}>
                {fund?.fundName || stock?.stockName}
              </Typography>
            </Stack>
          ) : (
            <Typography variant="body1" fontWeight={600}>
              {fund?.fundName || stock?.stockName}
            </Typography>
          )}
          {showSelectAssets ? (
            ""
          ) : showEditUnit ? (
            ""
          ) : (
            <IconButton
              sx={{ padding: "0px" }}
              onClick={() => setShowEditUnit(true)}
            >
              <EditOutlinedIcon
                fontSize="small"
                sx={{ color: "#6B9080" }}
              ></EditOutlinedIcon>
            </IconButton>
          )}
        </Stack>

        {showEditUnit ? (
          <Stack spacing={1}>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <CurrencyRupeeOutlinedIcon
                sx={{
                  fontSize: "22px",
                }}
              />
              <Typography fontSize={"24px"} fontWeight={600}>
                {fund?.unitPrice || stock?.price}
              </Typography>
              <Typography fontSize={"24px"} fontWeight={600} px={1}>
                {"X"}
              </Typography>
              <CustomTestBox
                size="small"
                sx={{ width: "70px" }}
                value={fundQantity}
                onChange={(e) => setfundQantity(e.target.value)}
              ></CustomTestBox>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              color={"#A0A0A0"}
              alignItems={"center"}
            >
              <CurrencyRupeeOutlinedIcon
                sx={{
                  fontSize: "22px",
                  fontWeight: "600",
                }}
              />
              <Typography fontSize={"24px"} fontWeight={600}>
                {"3,60,000"}
              </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"center"}>
              <CancelButton
                sx={{ background: "#D9D9D9", width: "90px" }}
                onClick={() => handleCancelOnclick()}
              >
                <CloseIcon fontSize="medium" sx={{ fill: "black" }} />
              </CancelButton>
              <PrimaryButton sx={{ width: "90px" }}>
                <DoneIcon fontSize="medium" sx={{ fill: "white" }} />
              </PrimaryButton>
            </Stack>
          </Stack>
        ) : (
          <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
            {showSelectAssets ? (
              <Stack direction={"row"} spacing={0.5}>
                <Checkbox sx={{ visibility: "hidden", padding: 0 }}></Checkbox>
                <Typography variant="body2" fontWeight={600} color={"#A0A0A0"}>
                  {fund?.fundType || stock?.type}
                </Typography>
              </Stack>
            ) : (
              <Typography variant="body2" fontWeight={600} color={"#A0A0A0"}>
                {fund?.fundType || stock?.type}
              </Typography>
            )}
            <Box display={"flex"}>
              <CurrencyRupeeOutlinedIcon
                sx={{
                  paddingTop: "4px",
                  fontSize: "12px",
                  color: "#A0A0A0",
                }}
              />
              <Typography variant="body2" fontWeight={600} color={"#A0A0A0"}>
                {fund?.unitPrice || stock?.price} x{" "}
                {fund?.quantity || stock?.quantity} =&nbsp;
              </Typography>
              <CurrencyRupeeOutlinedIcon
                sx={{
                  paddingTop: "4px",
                  fontSize: "12px",
                  color: "#A0A0A0",
                }}
              />
              <Typography variant="body2" fontWeight={600} color={"#A0A0A0"}>
                {"3.6L"}
              </Typography>
            </Box>
          </Stack>
        )}
      </Box>
    </>
  );
};

export default EditUnit;
