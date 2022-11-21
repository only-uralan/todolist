import React from "react";
import c from "./ToDoItem.module.css";

/**
 *
 * @param {*} props
 * @returns
 */
const ToDoItem = (props) => {
  const currentDate = new Date();
  const taskDate = new Date(props.task.date);
  const rootClasses = [c.item];
  if (props.task.checked || taskDate < currentDate) {
    rootClasses.push(c.done);
  }
  return (
    <div
      className={rootClasses.join(" ")}
      id={props.task.id}
      onClick={() => {
        props.onItemSelect(props.task.id);
      }}
    >
      <input
        type="checkbox"
        onClick={(e) => {
          e.stopPropagation();
          props.onChangeCheckbox(props.task.id, e);
        }}
      />
      <strong className={c.title}>{props.task.title}</strong>
      <button
        onClick={(e) => {
          e.stopPropagation();
          props.deleteTask(props.task.id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default ToDoItem;
