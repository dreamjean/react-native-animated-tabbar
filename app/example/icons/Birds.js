import * as React from "react";

import colors from "../colors";
import { ICON_SIZE } from "../constants";

function SvgComponent({ active }) {
  return (
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      fill={active ? colors.pink : "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
        stroke={active ? colors.white : colors.black}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SvgComponent;
