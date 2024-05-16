import React from "react";

export const PasswordInput: React.FC<FormSimpleTextProps> = ({
  label,
  name,
  register,
  error,
  registerOptions,
  placeholder,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}:</label>
      <input
        id={name}
        type={"password"}
        {...register(name, registerOptions)}
        placeholder={placeholder}
      />
      {error && <span>{error.message}</span>}
    </div>
  );
};
