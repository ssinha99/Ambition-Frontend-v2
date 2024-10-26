import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

const TargetIcon: React.FC<SvgIconProps> = (props) => {
  const { sx, viewBox = "0 0 32 32", ...rest } = props;
  return (
    <div>
      <SvgIcon
        sx={{ fill: "none", height: "32px", width: "32px", ...sx }}
        {...rest}
        viewBox={viewBox}
      >
        <g clip-path="url(#clip0_129_7693)">
          <path
            d="M16.9339 11.3041C16.6263 11.2429 16.3134 11.212 15.9998 11.2119C13.3592 11.2119 11.2109 13.3602 11.2109 16.0008C11.2109 18.6414 13.3592 20.7896 15.9998 20.7896C18.6404 20.7896 20.7886 18.6414 20.7886 16.0008C20.7886 15.6812 20.7565 15.3689 20.6965 15.0666L17.8811 17.882C17.3785 18.3845 16.7104 18.6612 15.9998 18.6612C15.2891 18.6612 14.6211 18.3845 14.1185 17.882C13.616 17.3795 13.3393 16.7114 13.3393 16.0008C13.3393 15.2901 13.616 14.622 14.1185 14.1195L16.9339 11.3041Z"
            fill="#66897A"
          />
          <path
            d="M29.7805 9.74459L27.8724 11.6526C27.6844 11.8411 27.4692 12.0002 27.2339 12.1249C27.6542 13.3404 27.8833 14.6441 27.8833 16.0004C27.8833 22.5529 22.5524 27.8838 15.9999 27.8838C9.44731 27.8838 4.11644 22.5529 4.11644 16.0004C4.11644 9.4478 9.44731 4.11692 15.9999 4.11692C17.3567 4.11692 18.6611 4.34626 19.8767 4.76679C20.0009 4.53136 20.1597 4.31588 20.3479 4.12757L22.2557 2.21971C20.3479 1.35021 18.2296 0.865234 15.9999 0.865234C7.65427 0.865234 0.864746 7.65476 0.864746 16.0004C0.864746 24.346 7.65427 31.1355 15.9999 31.1355C24.3455 31.1355 31.135 24.346 31.135 16.0004C31.135 13.7706 30.65 11.6524 29.7805 9.74453V9.74459Z"
            fill="#66897A"
          />
          <path
            d="M19.7666 8.47117L19.605 6.55527C18.4846 6.12593 17.2695 5.89062 15.9999 5.89062C10.4254 5.89062 5.89014 10.4258 5.89014 16.0004C5.89014 21.575 10.4254 26.1102 15.9999 26.1102C21.5745 26.1102 26.1097 21.575 26.1097 16.0004C26.1097 14.7309 25.8744 13.5157 25.4451 12.3954L23.5292 12.2337L22.1229 13.6397C22.4065 14.3728 22.5624 15.1686 22.5624 16.0004C22.5624 19.6191 19.6186 22.5629 15.9999 22.5629C12.3813 22.5629 9.43743 19.6191 9.43743 16.0004C9.43743 12.3818 12.3813 9.43792 15.9999 9.43792C16.8318 9.43792 17.6276 9.59383 18.3607 9.87743L19.7666 8.47117Z"
            fill="#66897A"
          />
          <path
            d="M21.3453 6.08322L21.6035 9.14276L15.3731 15.3732C15.0267 15.7193 15.0267 16.281 15.3731 16.6271C15.5461 16.8004 15.7731 16.887 16.0001 16.887C16.2271 16.887 16.4542 16.8004 16.6271 16.6271L22.8575 10.3968L25.917 10.6547C26.0456 10.6656 26.175 10.6482 26.2962 10.6039C26.4174 10.5596 26.5274 10.4894 26.6186 10.3982L30.381 6.63565C30.5005 6.51616 30.5835 6.36497 30.62 6.19991C30.6565 6.03485 30.645 5.86279 30.587 5.70401C30.5289 5.54524 30.4267 5.40638 30.2923 5.3038C30.1579 5.20122 29.997 5.1392 29.8285 5.12504L27.1048 4.89523L26.8752 2.17173C26.861 2.00328 26.799 1.8424 26.6964 1.70804C26.5938 1.57367 26.4549 1.47143 26.2962 1.41336C26.1374 1.35528 25.9654 1.34379 25.8003 1.38023C25.6352 1.41668 25.484 1.49954 25.3644 1.61906L21.6021 5.38156C21.5108 5.47279 21.4406 5.58283 21.3962 5.70402C21.3518 5.82521 21.3345 5.95462 21.3453 6.08322Z"
            fill="#66897A"
          />
        </g>
        <defs>
          <clipPath id="clip0_129_7693">
            <rect width="32" height="32" fill="white" />
          </clipPath>
        </defs>
      </SvgIcon>
    </div>
  );
};

export default TargetIcon;