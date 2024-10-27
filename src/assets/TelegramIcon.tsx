import React from "react";
import { SvgIcon, SvgIconProps } from "@mui/material";
const TelegramIcon: React.FC<SvgIconProps> = (props) => {
  const { sx, viewBox = "0 0 24 24", ...rest } = props;
  return (
    <SvgIcon
      sx={{ fill: "none", height: "24px", weight: "24px", ...sx }}
      {...rest}
      viewBox={viewBox}
    >
      <g clip-path="url(#clip0_17301_130)">
        <path
          d="M9.41718 15.181L9.02018 20.765C9.58818 20.765 9.83418 20.521 10.1292 20.228L12.7922 17.683L18.3102 21.724C19.3222 22.288 20.0352 21.991 20.3082 20.793L23.9302 3.82098L23.9312 3.81998C24.2522 2.32398 23.3902 1.73898 22.4042 2.10598L1.11418 10.257C-0.338822 10.821 -0.316822 11.631 0.867178 11.998L6.31018 13.691L18.9532 5.77998C19.5482 5.38598 20.0892 5.60398 19.6442 5.99798L9.41718 15.181Z"
          fill="#6B9080"
        />
      </g>
      <defs>
        <clipPath id="clip0_17301_130">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default TelegramIcon;
