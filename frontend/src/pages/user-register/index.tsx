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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { USER_ROLES } from "../../enums/users";

const registerUserSchema = z.object({
  name: z.string(),
  email: z.string().email("Insira um email válido"),
  password: z.string().min(3, "Pelo menos 3 caracteres"),
  // password: z
  //   .string()
  //   .min(5, "Pelo menos 5 caracteres")
  //   .regex(/[A-Z]/, "Pelo menos uma letra maiúscula")
  //   .regex(/[0-9]/, "Pelo menos um número"),
  role: z
    .nativeEnum(USER_ROLES, {
      errorMap: () => ({
        message: "Usuário sem role definida.",
      }),
    })
    .optional(),
});

type RegisterUserSchema = z.infer<typeof registerUserSchema>;

export const UserRegister: React.FC<any> = () => {
  const {
    register,
    handleSubmit,
    //reset,
    formState: { errors },
  } = useForm<RegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
  });
  const navigate = useNavigate();

  const registerUser = async (data: RegisterUserSchema) => {
    const registerResponse = await userService.registerUser(data);
    if (registerResponse) {
      if (registerResponse.status === 200 || registerResponse.status === 201) {
        const loginData: LoginUserSchema = {
          email: data.email,
          password: data.password,
        };
        await login(loginData);
      }
    }
  };

  const loginSchema = z.object({
    email: z.string().email("Insira um email válido"),
    password: z.string().min(1, "A senha está vazia"),
  });
  type LoginUserSchema = z.infer<typeof loginSchema>;
  const { signIn } = useAuth();

  const login = async (data: LoginUserSchema) => {
    await signIn(data);
  };

  const haveAnAccount = () => {
    //reset();
    navigate("/");
  };

  const onSubmit = (data: RegisterUserSchema, role: USER_ROLES) => {
    // Adiciona a role ao objeto de dados
    console.log("role: ", role);
    const userDataWithRole = { ...data, role };
    console.log("userDataWithRole: ", userDataWithRole);

    registerUser(userDataWithRole);
  };

  return (
    <form onSubmit={handleSubmit(registerUser)}>
      <Container className="bg-dark-400">
        <LogoContainer>
          <Logo isLp />
        </LogoContainer>
        <RegisterContainer className="bg-dark-700">
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
            type="button"
            onClick={handleSubmit((data) => onSubmit(data, USER_ROLES.DEFAULT))}
          >
            Criar conta
          </RegisterAccountButton>
          {/* Botão para registrar conta com role ADMIN */}
          <RegisterAccountButton
            className="bg-tints-tomato-100 text-light-100"
            type="button"
            onClick={handleSubmit((data) => onSubmit(data, USER_ROLES.ADMIN))}
          >
            Criar conta ADMIN
          </RegisterAccountButton>
          <p onClick={haveAnAccount} className="medium-100 text-light-100">
            Já tenho uma conta
          </p>
        </RegisterContainer>
      </Container>
    </form>
  );
};
