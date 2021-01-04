import React from "react";

import { calender } from "../config";

const { ICON_SIZE } = calender;

const Icon = ({ IconName }) => {
  return <IconName width={ICON_SIZE} height={ICON_SIZE} />;
};

export default Icon;
