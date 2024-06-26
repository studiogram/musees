import { ButtonType } from "../../types/button.types";
import "./Button.scss";

const Button = ({ className, icon, text, url }: ButtonType) => {
  return (
    <div className={`my-2 ${className}`}>
      <a
        href={url}
        target="_blank"
        className="button | inline-flex items-center text-green ps-3 py-2 pe-5 font-bold"
      >
        {icon && <img src={icon} alt={`icon ${text}`} className="w-6 me-2" />}
        {text}
      </a>
    </div>
  );
};
export default Button;
