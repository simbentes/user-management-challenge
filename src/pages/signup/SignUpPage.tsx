import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@/components/ui/errorMessage";
import axios from "axios";
import { useState } from "react";

type SignUpData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUpPage = () => {
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpData>();

  const onSubmit = async (data: SignUpData) => {
    setAuthError(null);
    try {
      const response = await axios.post("https://reqres.in/api/register", {
        email: data.email,
        password: data.password,
      });

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }

      navigate("/", { replace: true });
    } catch (error: unknown) {
      setAuthError(error.response?.data?.error);
    }
  };

  const passwordValue = watch("password");

  return (
    <>
      <header className="flex-none flex justify-end items-center gap-x-1 p-4">
        <Button variant="outline" asChild>
          <NavLink to="/login">Log In</NavLink>
        </Button>
      </header>
      <main className="h-[calc(100vh-68px)] flex justify-center items-center">
        <section className="w-full max-w-[320px]">
          <div>
            <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  {...register("email")}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  {...register("confirmPassword", {
                    validate: (value) => value === passwordValue || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
                )}
              </div>
              {authError && <ErrorMessage>{authError}</ErrorMessage>}
              <Button type="submit" className="mt-2">
                Sign Up
              </Button>
            </form>
            <p className="text-center mt-20 text-sm">
              Already have an account?{" "}
              <NavLink to="/login" className="text-blue-600 hover:underline">
                Log In
              </NavLink>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};
