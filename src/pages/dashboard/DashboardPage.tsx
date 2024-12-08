import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { UserActionsDropdown } from "./UserActionsDropdown";
import { Toaster } from "sonner";
import { useAuth } from "@/store/auth";
import { User, useUserContext } from "@/store/user";
import { UserCreationDialog } from "./UserCreationDialog";
import { Header } from "./Header";

const DashboardPage = () => {
  const { token } = useAuth();
  const { state, dispatch } = useUserContext();
  const { users } = state;

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showCreationDialog, setShowCreationDialog] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  console.log({ users });

  const fetchUsers = () => {
    axios
      .get(`https://reqres.in/api/users?page=${page}`, {
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

  const handleDeleteUser = (userId: number) => {
    // Simulate deletion with the API
    axios
      .delete(`https://reqres.in/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          dispatch({ type: "DELETE_USER", payload: userId });
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const handleEditUser = (user: User) => {
    axios
      .patch(
        `https://reqres.in/api/users/2`,
        {
          first_name: user.first_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        // Update local state
        dispatch({ type: "EDIT_USER", payload: user });
      })
      .catch((error) => console.error("Error editing user:", error));
  };

  const handleCreateUser = (user: User) => {
    axios
      .post(
        `https://reqres.in/api/users/`,
        {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        dispatch({ type: "ADD_USER", payload: user });
        setShowCreationDialog(false);
      })
      .catch((error) => console.error("Error creating user:", error));
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
          <Button size="sm" onClick={() => setShowCreationDialog(true)}>
            Create User
          </Button>
        </section>
        <section className="mb-12">
          {loading ? (
            <div>Loadingggg......</div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
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
            ))
          )}
        </section>

        <div className="flex justify-end gap-2">
          <Button variant="outline" size="xs" onClick={handlePrevPage} disabled={page === 1}>
            Previous
          </Button>
          <span className="flex items-center text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="xs"
            onClick={handleNextPage}
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
