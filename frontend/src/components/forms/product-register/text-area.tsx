import React from "react";
import { InputContainer, TextAreaInputElement } from "./styles";

export const TextAreaInput: React.FC<FormSimpleTextProps> = ({
  label,
  name,
  register,
  error,
  registerOptions,
  placeholder,
}) => {
  return (
    <InputContainer>
      <label className="text-light-400 roboto small-regular" htmlFor={name}>
        {label}
      </label>
      <TextAreaInputElement
        className={"text-light-100 small-regular bg-dark-900"}
        id={name}
        // type={"text"}
        {...register(name, registerOptions)}
        placeholder={placeholder}
      />
      {error && (
        <span className="text-tints-tomato-400 roboto small-regular">
          {error.message}
        </span>
      )}
    </InputContainer>
  );
};
