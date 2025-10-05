import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../http/api";
import { ToastContainer, toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { useAuthStore } from "@/store";

const LoginPage = () => {
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const { setIsLoggedIn, setRole, setToken } = useAuthStore((state) => state);
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (!data.data.success) {
        toast.error(data.data.message || "Login failed");
        return;
      }
      toast.success(`Welcome back, ${data.data.user.name}!`);
      setToken(data.data.token);
      setRole(data.data.user.role);
      setIsLoggedIn(true);

      setTimeout(() => {
        navigate("/dashboard");
        emailRef.current.value = "";
        passwordRef.current.value = "";
      }, 2000);
    },
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    mutation.mutate({ email, password });
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <ToastContainer />
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form onSubmit={handleLoginSubmit} className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground text-balance">
                      Login to your account
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      ref={emailRef}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to={"/forgot-password"}
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      ref={passwordRef}
                      id="password"
                      type="password"
                      required
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
                    <span>Login</span>
                  </Button>

                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      to={"/auth/register"}
                      className="underline underline-offset-4"
                    >
                      Register
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

export default LoginPage;
