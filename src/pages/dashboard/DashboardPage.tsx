import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserActionsDropdown } from "./UserActionsDropdown";
import { toast, Toaster } from "sonner";
import { useAuth } from "@/store/auth";
import { User, useUserContext } from "@/store/user";
import { UserCreationDialog } from "./UserCreationDialog";
import { Header } from "./Header";
import { reqres } from "@/api/api";
import { Trash2 } from "lucide-react";

const DashboardPage = () => {
  const { token } = useAuth();
  const { state, dispatch } = useUserContext();
  const { users } = state;

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showCreationDialog, setShowCreationDialog] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Set the users
  const fetchUsers = () => {
    reqres
      .get(`/users`, {
        params: { page },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({ type: "SET_USERS", payload: response.data.data });
        setTotalPages(response.data.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Since Reqres API doesn't persist changes, we handle create, edit and delete operations locally
  const handleDeleteUser = (userId: number) => {
    dispatch({ type: "DELETE_USER", payload: userId });
    toast("User deleted", {
      description: "The user has been removed from the system.",
      icon: <Trash2 size={18} className="text-destructive" />,
    });
  };

  const handleEditUser = (user: User) => {
    dispatch({ type: "EDIT_USER", payload: user });
    toast("User updated", {
      description: `The details for ${user.first_name} ${user.last_name} have been updated.`,
    });
  };

  const handleCreateUser = (user: User) => {
    dispatch({ type: "ADD_USER", payload: user });
    setShowCreationDialog(false);
    toast("User created", {
      description: `${user.first_name} ${user.last_name} has been successfully added.`,
    });
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <Header />
      <main className="h-[calc(100vh-68px)] w-full max-w-5xl mx-auto p-4 mt-8">
        <section className="flex justify-between items-center mb-8">
          <h1 className="font-semibold text-4xl">Dashboard</h1>
          <Button
            size="sm"
            data-testid="create-user-button"
            onClick={() => setShowCreationDialog(true)}
          >
            Create User
          </Button>
        </section>
        <section className="mb-12">
          {loading ? (
            <p>Loading</p>
          ) : (
            <div data-testid="user-list">
              {users.map((user) => (
                <div
                  key={user.id}
                  data-testid="user-item"
                  className="grid grid-cols-[3rem_1fr_2fr_2.5rem] items-center gap-x-4 p-4 border-b border-border"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name} profile picture`}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12" />
                  )}
                  <h2 className="font-semibold text-lg">
                    {user.first_name} {user.last_name}
                  </h2>
                  <p className="text-secondary-foreground">{user.email}</p>
                  <UserActionsDropdown
                    user={user}
                    onDeleteUser={handleDeleteUser}
                    onEditUser={handleEditUser}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="xs"
            onClick={handlePrevPage}
            data-testid="previous-page-button"
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="flex items-center text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="xs"
            onClick={handleNextPage}
            data-testid="next-page-button"
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </main>
      <UserCreationDialog
        open={showCreationDialog}
        onOpenChange={setShowCreationDialog}
        onCreateUser={handleCreateUser}
      />
      <Toaster closeButton />
    </>
  );
};

export default DashboardPage;
