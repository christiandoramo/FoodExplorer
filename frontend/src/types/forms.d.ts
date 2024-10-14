import React from "react";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

export declare global {
  interface FormSimpleTextProps {
    label: string;
    name: string;
    register: UseFormRegister<any>;
    error: any;
    registerOptions?: RegisterOptions;
    placeholder?: string;
  }
  interface FormUploadProps {
    label: string;
    name: string;
    register: UseFormRegister<any>;
    error: any;
    registerOptions?: RegisterOptions;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  interface FormIngredientsProps {
    label: string;
    name: string;
    register: UseFormRegister<any>;
    error: any;
    registerOptions?: RegisterOptions;
    placeholder?: string;
    getValues: UseFormGetValues<any>;
    setValue: UseFormSetValue<any>;
  }
}
