import React, { useEffect, useState } from "react";
import { InputContainer, StringInputElement } from "./styles";
import { useMask } from "@react-input/mask";
import { cleanPrice } from "../../../utils/strings";

export const PriceInput: React.FC<FormValueTextProps> = ({
  label,
  name,
  error,
  placeholder,
  setValue,
  defaultValue,
}) => {
  const inputRef = useMask({ mask: "R$ __,__", replacement: { _: /\d/ } });
  const [price, setPrice] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState<boolean>(false); // Estado para rastrear a inicialização

  // Use useEffect para definir o preço inicial
  useEffect(() => {
    if (!isInitialized && defaultValue) {
      updateDefaultValue(defaultValue); // Atualiza o valor padrão
      setIsInitialized(true); // Marca como inicializado
    }
  }, [defaultValue, isInitialized]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = cleanPrice(e.target.value);
    setPrice(e.target.value);
    setValue(name, newPrice, { shouldValidate: true });
  };

  const updateDefaultValue = (newValue: string) => {
    const charsArray = newValue.split(""); // Converte a string em um array de caracteres

    // Simular a digitação
    let updatedPrice = "";
    const typeChar = (char: string) => {
      // Aqui estamos simulando a entrada no campo
      updatedPrice = updatedPrice + char; // Adiciona o caractere atual
      setPrice(updatedPrice); // Atualiza o estado do preço

      // Atualiza o valor do formulário
      const cleanUpdatedPrice = cleanPrice(updatedPrice);
      setValue(name, cleanUpdatedPrice, { shouldValidate: true });
    };

    charsArray.forEach((char, index) => {
      // Usar um pequeno timeout para simular a digitação
      setTimeout(() => typeChar(char), index * 50); // Simula a digitação com um delay
    });
  };

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
        name={name}
        value={price} // Controla o valor do input com o estado `price`
        onChange={handleValueChange} // Mantém a lógica de alteração do preço
      />
      {error && (
        <span className="text-tints-tomato-400 roboto small-regular">
          {error.message}
        </span>
      )}
    </InputContainer>
  );
};
