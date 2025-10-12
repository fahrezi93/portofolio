import { IconType } from "react-icons";

export const CapCutIcon: IconType = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={props.className}
    style={props.style}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
    <path
      d="M12 7L8 11h3v6h2v-6h3l-4-4z"
      fill="white"
    />
  </svg>
);