import React from "react";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import CustomProgressBar from "./CustomProgressBar";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";

interface ICardsProps {
  cardHeading: string;
  amount: number;
  totalAmount: number;
  daystoGo: number;
  maturityDate?: string;
  currentGoalId: string;
  goalTypeId: string;
  setShowAmbitionDetails?: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentGoalId: React.Dispatch<React.SetStateAction<string>>;
  setGoalTypeId: React.Dispatch<React.SetStateAction<string>>;
}

const GoalCard: React.FC<ICardsProps> = ({
  cardHeading,
  amount,
  totalAmount,
  daystoGo,
  currentGoalId,
  goalTypeId,
  setCurrentGoalId,
  setGoalTypeId,
  setShowAmbitionDetails,
  maturityDate
}) => {
  const completionPercentage = ((amount / totalAmount) * 100).toFixed(0);

  const setDetails = () => {
    setCurrentGoalId(currentGoalId);
    setGoalTypeId(goalTypeId);
    setShowAmbitionDetails && setShowAmbitionDetails(true);
  };

  const formatAmount = (amount: number) => {
    if(amount >= 10000000){
      return (amount/10000000) + 'cr'
    }
    else if(amount >= 100000){
      return (amount/100000) + 'L'
    }
    else if(amount >= 1000){
      return (amount/1000) + 'k'
    }
    else 
      return amount
  }
  return (
    <div>
      <IconButton onClick={() => setDetails()} sx={{ padding: "0px" }}>
        <Card
          sx={{
            width: "160px",
            height: "161px",
            margin: "5px",
            borderRadius: "10px",
            textAlign: "left",
          }}
          key={currentGoalId}
        >
          <CardContent>
            <Typography
              variant="body1"
              sx={{ fontWeight: "600", paddingBottom: "5px" }}
            >
              {cardHeading.length > 25 ? cardHeading.slice(0,25) + '...' : cardHeading}
            </Typography>
            <CustomProgressBar
              variant="determinate"
              value={Number(completionPercentage)}
              sx={{ height: "16px" }}
            ></CustomProgressBar>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{display: 'flex'}}>
                <CurrencyRupeeOutlinedIcon sx={{fontSize: '13px', paddingTop: '8px'}}/>
                <Typography variant="body2" sx={{ paddingTop: "5px" }}>
                  {formatAmount(amount)} / {formatAmount(totalAmount)}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ paddingTop: "5px", fontWeight: "600" }}
              >
                {completionPercentage}%
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="body2"
                sx={{ paddingTop: "6px", fontWeight: "600" }}
              >
                {daystoGo} days to go
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: "600"}}>
                {maturityDate}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </IconButton>
    </div>
  );
};

export default GoalCard;
