import React from "react";
import {
  InputContainer,
  TextInputElement,
  UploadInputContainer,
} from "./styles";
import { UploadSimple } from "@phosphor-icons/react";

export const UploadInput: React.FC<FormSimpleTextProps> = ({
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
      <UploadInputContainer
        className={"text-light-100 small-regular bg-dark-900"}
      >
        <input
          id={name}
          type={"file"}
          accept="image/jpeg, image/jpg, image/png, image/webp"
          {...register(name, registerOptions)}
          placeholder={placeholder}
        />
        <UploadSimple size={32} />
        Inserir imagem
      </UploadInputContainer>
      <input
        id={name}
        type={"file"}
        accept="image/jpeg, image/jpg, image/png, image/webp"
        {...register(name, registerOptions)}
        placeholder={placeholder}
      >
        <UploadSimple size={32} />
        Inserir imagem
      </input>
      <TextInputElement
        className={"text-light-100 small-regular bg-dark-900"}
        id={name}
        type={"text"}
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
