import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

const LinkedinIcon: React.FC<SvgIconProps> = (props) => {
  const { sx, viewBox = "0 0  24 24", ...rest } = props;
  return (
    <SvgIcon
      sx={{ fill: "none", width: "24px", height: "24px", ...sx }}
      {...rest}
      viewBox={viewBox}
    >
      <g clip-path="url(#clip0_17301_136)">
        <path
          d="M23.994 24L24 23.999V15.197C24 10.891 23.073 7.574 18.039 7.574C15.619 7.574 13.995 8.902 13.332 10.161H13.262V7.976H8.489V23.999H13.459V16.065C13.459 13.976 13.855 11.956 16.442 11.956C18.991 11.956 19.029 14.34 19.029 16.199V24H23.994ZM0.396 7.977H5.372V24H0.396V7.977ZM2.882 0C1.291 0 0 1.291 0 2.882C0 4.473 1.291 5.791 2.882 5.791C4.473 5.791 5.764 4.473 5.764 2.882C5.76347 2.11781 5.45966 1.38507 4.9193 0.844703C4.37893 0.304338 3.64619 0.000529769 2.882 0Z"
          fill="#6B9080"
        />
      </g>
      <defs>
        <clipPath id="clip0_17301_136">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default LinkedinIcon;
