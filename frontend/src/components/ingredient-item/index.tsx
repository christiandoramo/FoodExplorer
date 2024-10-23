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
      <input
        className={!!isnew ? "text-light-500" : "text-light-100"}
        type="text"
        value={value}
        readOnly={!isnew}
        {...rest}
      />

      <button
        type="button"
        onClick={onClick}
        className={
          isnew ? "button-add text-light-500" : "button-delete text-light-100"
        }
      >
        {isnew ? (
          <Plus className="text-light-500" size={16} />
        ) : (
          <X className="text-light-100" size={16} />
        )}
      </button>
    </Container>
  );
};
