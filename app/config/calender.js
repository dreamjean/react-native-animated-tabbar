import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const ICON_SIZE = 30;
const PADDING = 12;
const DURATION = 450;
const DEFAULT_TABBAR_HEIGHT = ICON_SIZE + PADDING * 2;
const TABBAR_COVER_HEIGHT = 42;
const DOT_SIZE = 6;

export default {
  width,
  height,
  DEFAULT_TABBAR_HEIGHT,
  DOT_SIZE,
  DURATION,
  ICON_SIZE,
  PADDING,
  TABBAR_COVER_HEIGHT,
};
