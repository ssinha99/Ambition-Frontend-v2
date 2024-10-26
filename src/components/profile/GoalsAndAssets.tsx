import { Box, Stack, Typography } from "@mui/material";
import TargetIcon from "../../assets/TargetIcon";
import CustomProgressBar from "../shared/CustomProgressBar";
import AssetsIcon from "../../assets/AssetsIcon";

interface IGoalsAndAssetsProps {}
const GoalsAndAssets: React.FC<IGoalsAndAssetsProps> = ({}) => {
  return (
    <>
      <Stack direction="row" gap={1} paddingX={4}>
        <TargetIcon />
        <Stack width={"100%"} gap={1}>
          <Typography variant="h5" fontWeight={600}>
            Goals
          </Typography>
          <CustomProgressBar
            variant="determinate"
            value={90}
            sx={{ height: "18px" }}
          />
          <Stack
            direction={"row"}
            sx={{ justifyContent: "space-between" }}
            width={"100%"}
          >
            <Box>₹ 4.53L / ₹ 19.69L</Box>
            <Box>73%</Box>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" gap={1} padding={4}>
        <AssetsIcon />
        <Stack width={"100%"} gap={1}>
          <Typography variant="h5" fontWeight={600}>
            Assets
          </Typography>
          <CustomProgressBar
            variant="determinate"
            value={90}
            sx={{ height: "24px" }}
          />
          <Stack
            direction={"row"}
            sx={{ justifyContent: "space-between" }}
            width={"100%"}
          >
            <Box>Allocated (89%)</Box>
            <Box>₹ 4.53L</Box>
          </Stack>
          <Stack
            direction={"row"}
            sx={{ justifyContent: "space-between" }}
            width={"100%"}
          >
            <Box>Free Use (11%)</Box>
            <Box>₹ 55.6K</Box>
          </Stack>
          <Stack
            direction={"row"}
            sx={{ justifyContent: "space-between" }}
            width={"100%"}
          >
            <Box>Total (100%)</Box>
            <Box>₹ 5.09L</Box>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default GoalsAndAssets;
