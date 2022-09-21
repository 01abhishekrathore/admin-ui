
import classes from "./circularButton.module.css";

const CircularButton = (props) => {
  return (
    <div>
      <button
        className={`${classes.actionButton} ${
          props.isSelected ? classes.selected : ""
        }`}
        onClick={props.onClick}
        disabled={props.isDisabled}
      >
        {props.content}
      </button>
    </div>
  );
};
export default CircularButton;