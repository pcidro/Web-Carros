import React from "react";
import Container from "../../../Components/Container";
import PainelHeader from "../../../Components/PainelHeader/PainelHeader";
import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import Input from "../../../Components/Input/Input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const New = () => {
  const schema = z.object({
    name: z.string().nonempty("O nome é obrigatorio"),
    model: z.string().nonempty("O modelo é obrigatorio"),
    year: z.string().nonempty("O ano é obrigatorio"),
    km: z.string().nonempty("O KM é obrigatorio"),
    price: z.string().nonempty("O preço é obrigatorio"),
    city: z.string().nonempty("A cidade é obrigatoria"),
    whatsapp: z
      .string()
      .min(1, "O telefone é obrigatorio")
      .refine((value) => /^(\d{11,12})$/.test(value), {
        message: "Numero de telefone inválido!",
      }),
    description: z.string().nonempty("A descrição é obrigatoria"),
  });

  type formData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: formData) {
    console.log(data);
  }

  return (
    <Container>
      <PainelHeader />

      <div className="w-full bg-white p-5 rounded-xl flex flex-col items-center gap-3">
        <button className="relative border-2 w-48 h-32 rounded-lg flex items-center justify-center border-gray-400 cursor-pointer hover:bg-gray-100 transition">
          <FiUpload size={30} color="#000" />

          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </button>
      </div>
      <div className="w-full bg-white p-5 rounded-xl mt-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mb-4">
            <p className="mb-2 font-medium">Nome do carro</p>
            <Input
              type="text"
              register={register}
              name="name"
              error={errors.name?.message}
              placeholder="Nome do veículo..."
            />
          </div>

          <div className="mb-4">
            <p className="mb-2 font-medium">Modelo do carro</p>
            <Input
              type="text"
              register={register}
              name="model"
              error={errors.model?.message}
              placeholder="Modelo do veículo..."
            />
          </div>

          <div className="flex w-full gap-4 mb-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Km Rodado</p>
              <Input
                type="text"
                register={register}
                name="km"
                error={errors.km?.message}
                placeholder="KM do veículo..."
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Ano</p>
              <Input
                type="text"
                register={register}
                name="year"
                error={errors.year?.message}
                placeholder="Ano do veículo..."
              />
            </div>
          </div>

          <div className="flex w-full gap-4 mb-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Telefone/Whatsapp</p>
              <Input
                type="text"
                register={register}
                name="whatsapp"
                error={errors.whatsapp?.message}
                placeholder="Seu telefone com DDD"
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Cidade</p>
              <Input
                type="text"
                register={register}
                name="city"
                error={errors.city?.message}
                placeholder="Sua cidade"
              />
            </div>
          </div>

          <div className="mb-4">
            <p className="mb-2 font-medium">Preço</p>
            <Input
              type="text"
              register={register}
              name="price"
              error={errors.price?.message}
              placeholder="Preço da venda..."
            />
          </div>

          <div className="mb-4">
            <p className="mb-2 font-medium">Descrição</p>
            <textarea
              className="border-2 w-full rounded-lg p-3 h-32 resize-none"
              {...register("description")}
              placeholder="Digite a descrição completa do carro"
            />
            {errors.description && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
          <button
            className="rounded-md bg-zinc-900 text-white font-medium w-full cursor-pointer px-3 py-2 "
            type="submit"
          >
            Cadastrar Veículo
          </button>
        </form>
      </div>
    </Container>
  );
};

export default New;
