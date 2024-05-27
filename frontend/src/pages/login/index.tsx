import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PasswordInput } from "../../components/forms/user-register/password-input";
import { SimpleTextInput } from "../../components/forms/user-register/simple-text-input";
import {
  Container,
  RegisterAccountButton,
  LoginContainer,
  LogoContainer,
} from "./styles";
import { Logo } from "../../components/logo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

const loginSchema = z.object({
  email: z.string().email("Insira um email válido"),
  password: z.string().min(1, "A senha está vazia"),
});

type LoginUserSchema = z.infer<typeof loginSchema>;

export const Login: React.FC<any> = () => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserSchema>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const login = async (data: LoginUserSchema) => {
    console.log("Dados para login", data);
    await signIn(data);
  };

  return (
    <form onSubmit={handleSubmit(login)}>
      <Container className="bg-dark-400">
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <LoginContainer className="bg-dark-700">
          <h1 className="text-light-100 medium-400">Login</h1>
          <SimpleTextInput
            label="Email"
            name="email"
            placeholder="Insira seu email aqui"
            register={register}
            error={errors.email}
            registerOptions={{ required: true }}
          />
          <PasswordInput
            label="Senha"
            name="password"
            placeholder="Insira sua senha aqui"
            register={register}
            error={errors.password}
            registerOptions={{ required: true }}
          />
          <RegisterAccountButton
            className="bg-tints-tomato-100 text-light-100"
            type="submit"
          >
            Entrar
          </RegisterAccountButton>
          <p
            onClick={() => navigate("user-register")}
            style={{ cursor: "pointer" }}
            className="medium-100 text-light-100"
          >
            Criar conta
          </p>
        </LoginContainer>
      </Container>
    </form>
  );
};
