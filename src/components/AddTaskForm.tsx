import { FC } from "react";
import { useForm } from "react-hook-form";

interface TaskFormProps {
  onChange: (obj: DataForm) => void;
}

export interface DataForm {
  title: string;
  body: string;
}

const AddTaskForm: FC<TaskFormProps> = ({ onChange }) => {
  const { register, handleSubmit, reset } = useForm<DataForm>({
    defaultValues: {
      title: "",
      body: "",
    },
  });
  const submit = (formData: DataForm) => {
    onChange(formData);
    reset();
  };
  return (
    <div className="tasks-form__container">
      <form className="tasks-form" onSubmit={handleSubmit(submit)}>
        <input type="text" {...register("title")} placeholder="task title" />
        <textarea {...register("body")} placeholder="task text" />
        <button>добавить</button>
      </form>
    </div>
  );
};

export default AddTaskForm;
