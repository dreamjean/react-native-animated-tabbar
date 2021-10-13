import React from "react";

import { ICON_SIZE } from "../constants";

const Icon = ({ IconName }) => {
  return <IconName width={ICON_SIZE} height={ICON_SIZE} />;
};

export default Icon;
