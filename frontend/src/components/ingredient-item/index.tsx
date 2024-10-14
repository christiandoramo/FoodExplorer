import { Plus, X } from "@phosphor-icons/react";
import { Container } from "./styles";
import React from "react";

interface IngredientItemProps {
  isnew: boolean;
  value: string;
  onClick: () => void;
  rest?: any;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const IngredientItem: React.FC<IngredientItemProps> = ({
  isnew,
  value,
  onClick,
  ...rest
}) => {
  return (
    <Container isnew={isnew}>
      <input type="text" value={value} readOnly={!isnew} {...rest} />

      <button
        type="button"
        onClick={onClick}
        className={isnew ? "button-add" : "button-delete"}
      >
        {isnew ? <Plus size={16} /> : <X size={16} />}
      </button>
    </Container>
  );
};
