import { useEffect, useState } from "react";
import "./App.css";
import { Task } from "./components/Task";
import { addTask, deleteTask, getComments, getTasks } from "./api/api";
import AddTaskForm, { DataForm } from "./components/AddTaskForm";
import CommentsPopup from "./components/CommentsPopup";

export interface TaskType {
  userId: Number;
  id: number;
  title: string;
  body: string;
}
export interface CommentType {
  id: number;
  name: string;
  email: string;
  body: string;
}

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [localTasks, setLocalTask] = useState<TaskType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isActivePopup, setIsActivePopup] = useState(false);

  useEffect(() => {
    getTasks().then((data) => {
      setTasks(data as TaskType[]);
    });
  }, []);

  const handleAddTask = (body: DataForm) => {
    const newTask: TaskType = {
      userId: 1,
      id: tasks.length + 1 + localTasks.length,
      title: body.title,
      body: body.body,
    };
    addTask(newTask).then((res) => {
      console.log("запрос на добавление отправлен", res);
    });
    let newTasks = [newTask, ...localTasks];
    setLocalTask(newTasks);
  };

  const handleDeleteTask = (id: number) => {
    deleteTask(id).then((res) => {
      console.log("task delete", res);
    });
  };

  const handleDeleteLocalTask = (id: Number) => {
    const newLocalTasks = localTasks.filter((task: TaskType) => task.id !== id);
    setLocalTask(newLocalTasks);
  };

  const handleIdComments = (id: number, isActivePopup: boolean) => {
    getComments(id).then((data) => {
      setComments(data as CommentType[]);
    });
    setIsActivePopup(isActivePopup);
  };

  const handleClosePopup = () => {
    setIsActivePopup(false);
    setComments([]);
  };
  return (
    <div className="App">
      <AddTaskForm onChange={handleAddTask} />
      <div className="tasks-container">
        {localTasks.map((item: TaskType) => (
          <Task
            key={item.id}
            data={item}
            handleDeleteTask={handleDeleteLocalTask}
            handleIdComments={handleIdComments}
          />
        ))}

        {tasks.map((item) => (
          <Task
            key={item.id}
            data={item}
            handleDeleteTask={handleDeleteTask}
            handleIdComments={handleIdComments}
          />
        ))}
      </div>
      <CommentsPopup
        data={comments}
        isActivePopup={isActivePopup}
        handleClosePopup={handleClosePopup}
      />
    </div>
  );
}

export default App;
