import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

function DashboardPage() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/signup");
  };

  return (
    <>
      <main className="h-[calc(100vh-68px)] flex justify-center items-center">
        <div className="text-center max-w-lg">
          <h1 className="font-semibold text-4xl mb-4">Hello!</h1>
          <Button variant="secondary" onClick={handleLogOut} className="mt-4">
            Log Out
          </Button>
        </div>
      </main>
    </>
  );
}

export default DashboardPage;
