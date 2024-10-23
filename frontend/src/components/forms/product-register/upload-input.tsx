import React from "react";
import { InputContainer, UploadInputContainer } from "./styles";
import { UploadSimple } from "@phosphor-icons/react";

export const UploadInput: React.FC<FormUploadProps> = ({
  label,
  name,
  register,
  error,
  registerOptions,
  placeholder,
  onChange,
}) => {
  return (
    <InputContainer>
      <label className="text-light-400 roboto small-regular" htmlFor={name}>
        {label}
      </label>
      <label
        className="text-light-400 roboto small-regular upload-label"
        htmlFor={name}
      >
        <UploadInputContainer
          className={"text-light-100 small-regular bg-dark-900"}
        >
          <input
            id={name}
            type={"file"}
            accept="image/jpeg, image/jpg, image/png, image/webp"
            {...register(name, registerOptions)}
            placeholder={placeholder}
            style={{ display: "none" }}
            onChange={onChange}
          />
          <div>
            <UploadSimple size={30} />
          </div>
          <div>Inserir imagem</div>
        </UploadInputContainer>
      </label>
      {error && (
        <span className="text-tints-tomato-400 roboto small-regular">
          {error.message}
        </span>
      )}
    </InputContainer>
  );
};
