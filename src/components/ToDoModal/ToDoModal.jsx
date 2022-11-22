import React from "react";
import c from "./ToDoModal.module.css";

/**
 * Создает компонент модального окна, открывающийся при клике на задачу
 * @param {object} task - объект, с данными выделенной задачи
 * @param {boolean} modal - булевый тип, отвечает за отображение модального окна
 * @param {boolean} setModal - функция, которая устанавливает значение visible, принимает булевые
 * @param {function} onChangeDate - функция, которая отслеживает значение инпута с датой
 * @param {function} onDropFiles - функция, которая отслеживает значение инпута с загрузкой файлов
 *	@returns {React.ReactElement} ToDoModal - модальное окно
 */
const ToDoModal = ({ task, modal, setModal, onChangeDate, onDropFiles }) => {
  if (modal) {
    return (
      <div
        className={[c.myModal, c.active].join(" ")}
        onClick={() => setModal(false)}
      >
        <div className={c.myModalContent} onClick={(e) => e.stopPropagation()}>
          <strong className={c.title}>{task.title}</strong>
          <p>{task.body}</p>
          <div>
            <input
              type="date"
              onChange={(e) => {
                onChangeDate(task.id, e.target.value);
              }}
            ></input>
            <span>Deadline: {task.date}</span>
          </div>
          <input
            type="file"
            multiple
            onChange={(e) => {
              onDropFiles(task.id, e);
            }}
          />
          {task.files.map((elem) => {
            return <p key={elem.name}>{elem.name}</p>;
          })}
        </div>
      </div>
    );
  }
};

export default ToDoModal;
