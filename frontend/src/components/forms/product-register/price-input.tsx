import React from "react";
import { InputContainer, TextInputElement } from "./styles";
import { useMask } from "@react-input/mask";

export const PriceInput: React.FC<FormSimpleTextProps> = ({
  label,
  name,
  register,
  error,
  registerOptions,
  placeholder,
}) => {
  const inputRef = useMask({ mask: "R$ __,__", replacement: { _: /\d/ } });

  return (
    <InputContainer>
      <label className="text-light-400 roboto small-regular" htmlFor={name}>
        {label}
      </label>
      <TextInputElement
        className={"text-light-100 small-regular bg-dark-900"}
        id={name}
        type={"number"}
        {...register(name, registerOptions)}
        placeholder={placeholder}
        ref={inputRef}
      />
      {error && (
        <span className="text-tints-tomato-400 roboto small-regular">
          {error.message}
        </span>
      )}
    </InputContainer>
  );
};
