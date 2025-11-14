import { useState } from "react";

export const useForm = (initialState) => {
  const [formState, setFormState] = useState(initialState);

  //* FUNCION HANDLECHANGE
  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;

    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  //* FUNCIOIN HANDLERESET
  const handleReset = () => {
    setFormState(initialState);
  };

  //* FUNCION HANDLESUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    handleReset();
  };

  return {
    formState,
    handleChange,
    handleSubmit,
    handleReset,
    setFormState,
  };
};
