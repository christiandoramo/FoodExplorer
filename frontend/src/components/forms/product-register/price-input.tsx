import React, { useState } from "react";
import { InputContainer, StringInputElement } from "./styles";
import { useMask } from "@react-input/mask";

export const PriceInput: React.FC<FormValueTextProps> = ({
  label,
  name,
  error,
  placeholder,
  setValue,
}) => {
  const inputRef = useMask({ mask: "R$ __,__", replacement: { _: /\d/ } });
  const [price, setPrice] = useState("");

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = cleanPrice(e.target.value);
    setPrice(e.target.value);
    setValue(name, newPrice, { shouldValidate: true });
    console.log(newPrice);
  };
  const cleanPrice = (value: string) => {
    // Remove o prefixo "R$", espaços em branco e caracteres não numéricos, exceto a vírgula
    const cleanedValue = value
      .replace(/R\$\s*/g, "")
      .replace(/\s+/g, "")
      .replace(",", ".");

    // Verifica se a string resultante não está vazia e retorna
    return cleanedValue.length > 0 ? cleanedValue : "";
  };

  // // Armazena o valor atual do input para limpeza
  // const [inputValue, setInputValue] = React.useState("");

  // Efeito para atualizar o valor limpo no registro
  // useEffect(() => {
  //   register(name).onChange({ target: { value: cleanPrice(inputValue) } });
  // }, [inputValue, name, register]);

  return (
    <InputContainer>
      <label className="text-light-400 roboto small-regular" htmlFor={name}>
        {label}
      </label>
      <StringInputElement
        className={"text-light-100 small-regular bg-dark-900"}
        id={name}
        type={"text"}
        placeholder={placeholder}
        ref={inputRef}
        style={{ maxWidth: 251 }}
        name={name}
        value={price} // Controla o valor do input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleValueChange(e);
        }}
      />
      {error && (
        <span className="text-tints-tomato-400 roboto small-regular">
          {error.message}
        </span>
      )}
    </InputContainer>
  );
};
