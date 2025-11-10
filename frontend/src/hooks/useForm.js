import { useState } from "react";

export const useForm = (initialState) => {
  const [formState, setFormState] = useState(initialState);

  //* FUNCION HANDLECHANGE
  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //* FUNCIOIN HANDLERESET
  const handleReset = () => {
    setFormState(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleReset();
  };

  return {
    formState,
    handleChange,
    handleSubmit,
    handleReset,
  };
};
