import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PasswordInput } from "../../components/forms/user-register/password-input";
import { SimpleTextInput } from "../../components/forms/user-register/simple-text-input";
import {
  Container,
  RegisterAccountButton,
  RegisterContainer,
  LogoContainer,
} from "./styles";
import { Logo } from "../../components/logo";
import { userService } from "../../services/users";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const registerUserSchema = z.object({
  name: z.string(),
  email: z.string().email("Insira um email válido"),
  password: z
    .string()
    .min(5, "Pelo menos 5 caracteres")
    .regex(/[A-Z]/, "Pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "Pelo menos um número"),
});

type RegisterUserSchema = z.infer<typeof registerUserSchema>;

export const UserRegister: React.FC<any> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
  });
  const navigate = useNavigate();

  const registerUser = async (data: RegisterUserSchema) => {
    toast.loading(`Criando sua conta 🤗`, { position: "top-right" });
    console.log("Dados para registro", data);
    const registerResponse = await userService.registerUser(data);
    if (registerResponse) {
      if (registerResponse.status === 200 || registerResponse.status === 201) {
        toast.success("🍔 Conta criada com sucesso 🚀");
        console.log(registerResponse);
        navigate("login");
      } else {
        toast.error(
          `Ocorreu um erro: ${
            registerResponse?.message || registerResponse?.response?.message
          }`
        );
        console.error(registerResponse);
      }
    }
  };

  return (
    <>
      <Container className="bg-dark-400">
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <RegisterContainer className="bg-dark-700">
          <form onSubmit={handleSubmit(registerUser)}>
            <h1 className="text-light-100 medium-400">Crie sua conta</h1>
            <SimpleTextInput
              label="Seu nome"
              name="name"
              placeholder="Exemplo: Maria da Silva"
              register={register}
              error={errors.name}
              registerOptions={{ required: true }}
            />
            <SimpleTextInput
              label="Email"
              name="email"
              placeholder="Exemplo: exemplo@exemplo.com.br"
              register={register}
              error={errors.email}
              registerOptions={{ required: true }}
            />
            <PasswordInput
              label="Senha"
              name="password"
              placeholder="No mínimo 5 caracteres - letras e numeros"
              register={register}
              error={errors.password}
              registerOptions={{ required: true }}
            />
            <RegisterAccountButton
              className="bg-tints-tomato-100 text-light-100"
              type="submit"
            >
              Criar conta
            </RegisterAccountButton>
            <p className="medium-100 text-light-100">Já tenho uma conta</p>
          </form>
        </RegisterContainer>
      </Container>
    </>
  );
};
