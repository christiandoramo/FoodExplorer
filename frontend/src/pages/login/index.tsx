import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PasswordInput } from "../../components/forms/user-register/password-input";
import { SimpleTextInput } from "../../components/forms/user-register/simple-text-input";
import { Container, RegisterAccountButton, RegisterContainer } from "./styles";
import { Logo } from "../../components/logo";
import Backdrop from "@mui/material/Backdrop";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, "A senha deve ter no mínimo 5 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número"),
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
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const login = async (data: LoginUserSchema) => {
    handleOpen();
    console.log("Dados para login", data);
    await signIn(data).finally(() => handleClose());
    handleClose();
  };

  return (
    <Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        {/* <CircularProgress color="inherit" /> */}
      </Backdrop>
      <Logo />
      <RegisterContainer className="bg-dark-700">
        <form onSubmit={handleSubmit(login)}>
          <h1 className="text-light-100 medium-400">Crie sua conta</h1>
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
            Entrar
          </RegisterAccountButton>
          <p
            onClick={() => navigate("user-register")}
            style={{ cursor: "pointer" }}
            className="medium-100 text-light-100"
          >
            Criar conta
          </p>
        </form>
      </RegisterContainer>
    </Container>
  );
};
