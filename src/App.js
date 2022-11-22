import c from "./App.module.css";
import ToDoItem from "./components/ToDoItem/ToDoItem";
import ToDoModal from "./components/ToDoModal/ToDoModal";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Task 1 Title",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, magnam corporis minus alias, molestiae assumenda",
      checked: false,
      date: "2022-11-31",
      files: [],
    },
    {
      id: 2,
      title: "Task 2 Title",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, magnam corporis minus alias, molestiae assumenda",
      checked: false,
      date: "2022-11-31",
      files: [],
    },
    {
      id: 3,
      title: "Task 3 Title",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, magnam corporis minus alias, molestiae assumenda",
      checked: false,
      date: "2022-11-31",
      files: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedTask, setSelectedTask] = useState({});
  const [modal, setModal] = useState(false);

  /**
   * Функция которая добавляет новую задачу в todolist
   * @param {object} e - объект event
   */
  const addNewTask = (e) => {
    e.preventDefault();
    if (input) {
      const newTask = {
        id: Date.now(),
        title: input,
        body: "Item Body Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        checked: false,
        date: "2022-11-25",
        files: [],
      };
      setTasks([...tasks, newTask]);
    } else {
      alert("Title is required");
    }
  };

  /**
   * Функция, которая показывает какая из задач выбрана из списка
   * @param {string} taskId - id выбранной задачи
   * @returns возвращает данные задачи, выбранной из списка
   */
  const onItemSelect = (taskId) => {
    setModal(true);
    return setSelectedTask(tasks.find((task) => task.id === taskId));
  };

  /**
   * Функция, которая удаляет задачу из списка
   * @param {string} taskId - id выбранной задачи
   * @returns возвращает данные всех задач, кроме выбранной из списка
   */
  const deleteTask = (taskId) => {
    return setTasks(tasks.filter((task) => task.id !== taskId));
  };

  /**
   * Функция, которая отслеживает изменения чекбокса в задаче
   * @param {string} taskId - id выбранной задачи
   * @param {object} e - объект event
   * @returns возвращает данные задач c изменениями в свойстве checked
   */
  const onChangeCheckbox = (taskId, e) => {
    if (e.target.checked) {
      setTasks(
        tasks.map((task) => {
          task.id === taskId && (task.checked = true);
          return task;
        })
      );
    } else {
      setTasks(
        tasks.map((task) => {
          task.id === taskId && (task.checked = false);
          return task;
        })
      );
    }
  };

  /**
   * Функция, которая отслеживает значение инпута с датой
   * @param {string} taskId - id выбранной задачи
   * @param {string} inputDate - дата выбранная в календаре
   * @returns возвращает данные задач c изменениями в свойстве date
   */
  const onChangeDate = (taskId, inputDate) => {
    setTasks(
      tasks.map((task) => {
        task.id === taskId && (task.date = inputDate);
        return task;
      })
    );
  };

  /**
   * Функция, которая отслеживает значение инпута с загрузкой файлов
   * @param {string} taskId - id выбранной задачи
   * @param {object} e - объект event
   * @returns возвращает данные задач c изменениями в свойстве files
   */
  const onDropFiles = (taskId, e) => {
    e.preventDefault();
    setTasks(
      tasks.map((task) => {
        task.id === taskId && (task.files = [...e.target.files]);
        return task;
      })
    );
  };
  return (
    <div className={c.wrapper}>
      <ToDoModal
        task={selectedTask}
        modal={modal}
        setModal={setModal}
        onChangeDate={onChangeDate}
        onDropFiles={onDropFiles}
      />
      <h1>TO DO APP</h1>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Add new todo"
          className={c.addTaskInput}
        />
        <button className={c.addTaskButton} onClick={addNewTask}>
          +
        </button>
      </form>
      {tasks.map((task) => (
        <ToDoItem
          key={task.id}
          task={task}
          onItemSelect={onItemSelect}
          deleteTask={deleteTask}
          onChangeCheckbox={onChangeCheckbox}
        />
      ))}
    </div>
  );
}

export default App;
