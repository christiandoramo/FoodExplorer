import React, { useState } from "react";
import { InputContainer, SelectInputElement } from "./styles";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

interface SelectCategoriesProps {
  label: string;
  name: string;
  register: any;
  error?: any;
  registerOptions?: any;
  categories: Array<string>;
  placeholder?: string;
  setValue: UseFormSetValue<any>;
  getValues?: UseFormGetValues<any>;
}

export const CategorySelect: React.FC<SelectCategoriesProps> = ({
  label,
  name,
  register,
  error,
  registerOptions,
  categories,
  setValue,
  getValues,
  placeholder = "Selecione uma categoria",
}) => {
  const [selectedCategory, setSelectedCategory] = useState(
    !!getValues ? getValues(name) : ""
  );

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(e.target.value);
    setValue(name, category, { shouldValidate: true });
  };

  return (
    <InputContainer>
      <label className="text-light-400 roboto small-regular" htmlFor={name}>
        {label}
      </label>
      <SelectInputElement
        className={"text-light-100 small-regular bg-dark-900"}
        id={name}
        {...register(name, registerOptions)}
        defaultValue={!!getValues ? getValues(name) : ""}
        onChange={(e) => {
          handleCategoryChange(e); // Atualiza o estado com a categoria selecionada
        }}
        name={name}
        value={selectedCategory}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {categories.map((category) => (
          <option
            className={"text-light-100 small-regular"}
            style={{ maxWidth: 463 }}
            key={category}
            value={category}
          >
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
