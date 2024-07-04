import { Box, Divider, Stack, Typography } from "@mui/material";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";

interface IAllocatedFunds {
  funds: any;
}
const AllocatedFunds: React.FC<IAllocatedFunds> = ({ funds }) => {
  return (
    <>
      <Stack spacing={1.5} paddingX={1.25}>
        {funds && (
          <>
            <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Mutual Funds
              </Typography>
              <Stack direction={"row"} spacing={3}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {"80%"}
                </Typography>
                <Box display={"flex"}>
                  <CurrencyRupeeOutlinedIcon
                    sx={{ paddingTop: "6px", fontSize: "14px" }}
                  />
                  <Typography variant="subtitle1" fontWeight={600}>
                    {"32,260"}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
            <Divider variant="fullWidth" sx={{ color: "#D9D9D9" }} />
          </>
        )}

        {funds?.mutualFunds?.map((element: any) => (
          <Box
            sx={{
              background: "white",
              borderRadius: "5px",
              padding: "6px",
              boxShadow:
                "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            }}
          >
            <Typography variant="body1" fontWeight={600}>
              {element.fundName}
            </Typography>
            <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
              <Typography variant="body2" fontWeight={600} color={"#A0A0A0"}>
                {"Equity"}
              </Typography>
              <Box display={"flex"}>
                <CurrencyRupeeOutlinedIcon
                  sx={{ paddingTop: "4px", fontSize: "12px", color: "#A0A0A0" }}
                />
                <Typography variant="body2" fontWeight={600} color={"#A0A0A0"}>
                  {element.unitPrice} x {element.quantity} =&nbsp;
                </Typography>
                <CurrencyRupeeOutlinedIcon
                  sx={{ paddingTop: "4px", fontSize: "12px", color: "#A0A0A0" }}
                />
                <Typography variant="body2" fontWeight={600} color={"#A0A0A0"}>
                  {"3.6L"}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ))}

        {funds && (
          <>
            <Stack
              direction={"row"}
              sx={{ justifyContent: "space-between", paddingTop: "10px" }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                Stocks
              </Typography>
              <Stack direction={"row"} spacing={3}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {"20%"}
                </Typography>
                <Box display={"flex"}>
                  <CurrencyRupeeOutlinedIcon
                    sx={{ paddingTop: "6px", fontSize: "14px" }}
                  />
                  <Typography variant="subtitle1" fontWeight={600}>
                    {"8,065"}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
            <Divider variant="fullWidth" sx={{ color: "#D9D9D9" }} />
          </>
        )}

        {funds?.stocks?.map((element: any) => (
          <Box
            sx={{
              background: "white",
              borderRadius: "5px",
              padding: "6px",
              boxShadow:
                "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
            }}
          >
            <Typography variant="body1" fontWeight={600}>
              {element.stockName}
            </Typography>
            <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
              <Typography variant="body2" fontWeight={600} color={"#A0A0A0"}>
                {element.type}
              </Typography>
              <Box display={"flex"}>
                <CurrencyRupeeOutlinedIcon
                  sx={{ paddingTop: "4px", fontSize: "12px", color: "#A0A0A0" }}
                />
                <Typography variant="body2" fontWeight={600} color={"#A0A0A0"}>
                  {element.price} x {element.quantity} =&nbsp;
                </Typography>
                <CurrencyRupeeOutlinedIcon
                  sx={{ paddingTop: "4px", fontSize: "12px", color: "#A0A0A0" }}
                />
                <Typography variant="body2" fontWeight={600} color={"#A0A0A0"}>
                  {"3.6L"}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ))}
        <Box sx={{ paddingBottom: "10%" }}> </Box>
      </Stack>
    </>
  );
};

export default AllocatedFunds;
