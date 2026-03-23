import React, { useEffect } from "react";
import Logo from "../../assets/logo.svg";
import Container from "../../Components/Container";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../Components/Input/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Services/firebase";
import { signOut } from "firebase/auth";

const schema = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo email é obrigatório"),
  password: z
    .string()
    .nonempty("O campo senha é obrigatório")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  name: z.string().nonempty("O campo nome é obrigatorio"),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function onSubmit(data: FormData) {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await updateProfile(res.user, {
        displayName: data.name,
      });

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }
    handleLogout();
  }, []);

  return (
    <Container>
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        <Link className="mb-6 max-w-sm w-full" to="/">
          <img className="w-full" src={Logo} alt="Logo" />
        </Link>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white max-w-xl w-full rounded-lg p-4"
        >
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Digite seu nome..."
              name="name"
              error={errors.name?.message}
              register={register}
            />
          </div>
          <div className="mb-3">
            <Input
              type="email"
              placeholder="Digite seu email..."
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>
          <div className="mb-3">
            <Input
              type="password"
              placeholder="Digite sua senha..."
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>
          <button
            type="submit"
            className="bg-zinc-900 text-white rounded-md h-10 font-medium w-full cursor-pointer"
          >
            Cadastrar
          </button>
        </form>
        <Link className="underline" to="/login">
          Já possui uma conta? Faça o login!
        </Link>
      </div>
    </Container>
  );
};

export default Register;
