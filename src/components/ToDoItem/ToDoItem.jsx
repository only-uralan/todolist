import React from "react";
import c from "./ToDoItem.module.css";

/**
 * Создает компонент задачи в Todolist
 * @typedef {object} Props
 * @property {object} task - объект, с данными выделенной задачи
 * @property {function} onItemSelect - функция, которая показывает какая из задач выбрана из списка
 * @property {function} deleteTask - функция, которая удаляет задачу из списка
 * @property {function} onChangeCheckbox - функция, которая отслеживает изменения чекбокса в задаче
 * @returns {React.ReactElement} ToDoItem - задача в списке todolist
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
