import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/auth";
import { useNavigate } from "react-router";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/store/theme";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = (): void => {
    logout();
    navigate("/signup");
  };

  return (
    <header className="flex-none flex justify-end items-center gap-x-2 p-3 border-b border-border">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 " />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <Button variant="outline" onClick={handleLogOut}>
        Log Out
      </Button>
    </header>
  );
}
