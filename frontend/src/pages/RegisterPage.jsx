import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Link, useNavigate } from "react-router";
import { register } from "../http/api";
import { ToastContainer, toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";

const RegisterPage = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      if (!data.data.success) {
        toast.error(data.data.message || "Registration failed");
        return;
      }
      toast.success(`Welcome aboard, ${data.data.user.name}!`);
      nameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    },
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    mutation.mutate({ name, email, password });
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <ToastContainer />
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form onSubmit={handleRegisterSubmit} className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Join Us</h1>
                    <p className="text-muted-foreground text-balance">
                      Create an account to continue
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="name"
                      placeholder="John Doe"
                      required
                      ref={nameRef}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      ref={emailRef}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="password">Password</Label>

                    <Input
                      id="password"
                      type="password"
                      required
                      ref={passwordRef}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full"
                  >
                    {mutation.isPending && (
                      <LoaderCircle className="mr-1 h-4 w-4 animate-spin" />
                    )}
                    <span>Register</span>
                  </Button>

                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link
                      to={"/auth/login"}
                      className="underline underline-offset-4"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </form>
              <div className="bg-muted relative hidden md:block">
                <img
                  src="https://avatars.githubusercontent.com/u/64852930?v=4"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
