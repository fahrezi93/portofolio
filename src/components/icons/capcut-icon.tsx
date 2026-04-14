import { IconType } from "react-icons";

export const CapCutIcon: IconType = (props) => (
  <img
    src="/image.png"
    alt="CapCut"
    className={props.className}
    style={{ ...props.style, filter: "brightness(0) invert(1)", objectFit: "contain" }}
  />
);