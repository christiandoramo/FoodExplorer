import React from "react";
import { InputContainer, PasswordInputElement } from "./styles";

export const PasswordInput: React.FC<FormSimpleTextProps> = ({
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
      <PasswordInputElement
        className={"text-light-100 small-regular"}
        id={name}
        type={"password"}
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
