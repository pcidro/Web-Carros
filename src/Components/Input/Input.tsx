import React from "react";
import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

const Input = ({
  placeholder,
  name,
  type,
  register,
  error,
  rules,
}: InputProps) => {
  return (
    <div>
      <input
        className="w-full border-2 rounded-md h-11 px-2"
        placeholder={placeholder}
        type={type}
        id={name}
        {...register(name, rules)}
      />
      {error && <p className="my-1 text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
