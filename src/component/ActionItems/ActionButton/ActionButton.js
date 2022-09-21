import classes from "./ActionButton.module.css";
import CircularButton from "../../UI/CirCularButton";

const ActionButton = (props) => {
  return (
    <div className={classes.actionButton}>
      <button
        className={classes.actionButton_Delete}
        disabled={props.getSelectedCount()}
        onClick={props.onBunchDelete}
      >
        Delete Selected
      </button>

      <CircularButton
        content={`${String.fromCharCode(60)} ${String.fromCharCode(60)}`}
        isSelected={false}
        isDisabled={props.currentPageIndex === 1 ? true : false}
        onClick={props.getToFirstPage}
      />
      <CircularButton
        content={String.fromCharCode(60)}
        isDisabled={props.currentPageIndex === 1 ? true : false}
        isSelected={false}
        onClick={props.getToPreviousPage}
      />
      {props.getPaginationCluster().map((item, idx) => (
        <CircularButton
          key={idx}
          content={item}
          isDisabled={false}
          isSelected={props.currentPageIndex === idx + 1 ? true : false}
          onClick={props.moveToPage}
        />
      ))}

      <CircularButton
        content={String.fromCharCode(62)}
        isSelected={false}
        onClick={props.getToNextPage}
        isDisabled={
          props.currentPageIndex === props.noOfPages || props.noOfPages === 0
            ? true
            : false
        }
      />
      <CircularButton
        content={`${String.fromCharCode(62)} ${String.fromCharCode(62)}`}
        isSelected={false}
        onClick={props.getToLastPage}
        isDisabled={
          props.currentPageIndex === props.noOfPages || props.noOfPages === 0
            ? true
            : false
        }
      />
    </div>
  );
};

export default ActionButton;
