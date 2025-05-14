import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/lib/src/lib/supabaseClient";
import { useState } from "react";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) setError(error.message);
    else window.location.href = "/"; // редирект на главную
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded shadow w-full max-w-sm"
    >
      <h1 className="text-xl font-bold mb-4">Вход</h1>
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="input input-bordered w-full mb-2"
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <input
        {...register("password")}
        type="password"
        placeholder="Пароль"
        className="input input-bordered w-full mb-2"
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      <button type="submit" className="btn btn-primary w-full">
        Войти
      </button>
    </form>
  );
}
