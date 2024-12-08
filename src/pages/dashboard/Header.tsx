import { Button } from "@/components/ui/button";
import { useAuth } from "@/store/auth";
import { useNavigate } from "react-router";

export function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = (): void => {
    logout();
    navigate("/signup");
  };

  return (
    <header className="flex-none flex justify-end items-center gap-x-1 p-3 border-b border-border">
      <Button variant="outline" onClick={handleLogOut}>
        Log Out
      </Button>
    </header>
  );
}
