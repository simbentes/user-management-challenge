import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, NavLink } from "react-router";

export const LoginPage = () => {
  return (
    <>
      <header className="flex-none flex justify-end items-center gap-x-1 p-4">
        <Button variant="outline" asChild>
          <Link to="/signup">Sign Up</Link>
        </Button>
      </header>
      <main className="min-h-[calc(100vh-68px)] flex justify-center items-center">
        <section className="w-full max-w-[320px]">
          <div>
            <h1 className="text-2xl font-semibold mb-4">Log In</h1>
            <div className="flex flex-col gap-y-2">
              <div>
                <Label htmlFor="">Email</Label>
                <Input type="email" id="email" placeholder="Enter your email" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" placeholder="••••••••" />
              </div>
              <Button className="mt-2">Log In</Button>
            </div>
            <p className="text-center mt-20 text-sm">
              Don't have an account?{" "}
              <NavLink to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </NavLink>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};
