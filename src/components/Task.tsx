import { FC } from "react";
import { TaskType } from "../App";

interface TaskProps {
  data: TaskType;
  handleDeleteTask: (num: number) => void;
  handleIdComments: (num: number, bool: boolean) => void;
}

export const Task: FC<TaskProps> = ({
  data,
  handleDeleteTask,
  handleIdComments,
}) => {
  const task = data;

  const deleteTask = () => {
    handleDeleteTask(task.id);
  };

  const openComments = () => {
    handleIdComments(task.id, true);
  };
  return (
    <div className="task-container">
      <h1>{task.title}</h1>
      <p>{task.body}</p>
      <button onClick={deleteTask}>удалить</button>
      <button onClick={openComments}>коментарии</button>
    </div>
  );
};
