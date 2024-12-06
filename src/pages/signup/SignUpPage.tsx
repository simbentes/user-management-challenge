import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NavLink } from "react-router";

export const SignUpPage = () => {
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
            <div className="flex flex-col gap-y-2">
              <div>
                <Label htmlFor="">Email</Label>
                <Input type="email" id="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="••••••••" />
              </div>
              <div>
                <Label htmlFor="password">Confirm password</Label>
                <Input type="password" id="password" placeholder="••••••••" />
              </div>
              <Button className="mt-2">Log In</Button>
            </div>
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
