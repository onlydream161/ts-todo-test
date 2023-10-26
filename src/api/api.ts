import axios from 'axios'
import { CommentType, TaskType } from '../App';



const istance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const getTasks = () => {
  return istance
    .get<TaskType[]>("posts/")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const addTask = (body:TaskType) => {
  return istance
    .post<TaskType>("posts/", {
      title: body.title,
      body: body.body,
      userId: 1,
      id: body.id,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const deleteTask = (id:number) => {
  return istance
    .delete(`posts/${id}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getComments = (id:number) => {
  return istance
    .get<CommentType[]>(`posts/${id}/comments`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
