import React from "react";
import { InputContainer, SelectInputElement } from "./styles";

interface SelectCategoriesProps {
  label: string;
  name: string;
  register: any;
  error?: any;
  registerOptions?: any;
  categories: Array<string>;
  placeholder?: string;
}

export const CategorySelect: React.FC<SelectCategoriesProps> = ({
  label,
  name,
  register,
  error,
  registerOptions,
  categories,
  placeholder = "Selecione uma categoria",
}) => {
  return (
    <InputContainer>
      <label className="text-light-400 roboto small-regular" htmlFor={name}>
        {label}
      </label>
      <SelectInputElement
        className={"text-light-100 small-regular bg-dark-900"}
        id={name}
        {...register(name, registerOptions)}
        defaultValue=""
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </SelectInputElement>
      {error && (
        <span className="text-tints-tomato-400 roboto small-regular">
          {error.message}
        </span>
      )}
    </InputContainer>
  );
};
