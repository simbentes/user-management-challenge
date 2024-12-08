import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router";
import { UserActionsDropdown } from "./UserActionsDropdown";
import { Toaster } from "sonner";
import { useAuth } from "@/store/auth";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ApiResponse {
  data: User[];
  page: number;
  total_pages: number;
}

const DashboardPage: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleLogOut = (): void => {
    logout();
    navigate("/signup");
  };

  const fetchUsers = (currentPage: number) => {
    if (token) {
      axios
        .get<ApiResponse>(`https://reqres.in/api/users?page=${currentPage}`)
        .then((response) => {
          setUsers(response.data.data);
          setTotalPages(response.data.total_pages);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

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
      <header className="flex-none flex justify-end items-center gap-x-1 p-4">
        <Button variant="outline" onClick={handleLogOut}>
          Log Out
        </Button>
      </header>
      <main className="h-[calc(100vh-68px)] w-full max-w-5xl mx-auto p-4">
        <section className="flex justify-between items-center mb-8">
          <h1 className="font-semibold text-4xl">Dashboard</h1>
          <Button size="sm">Create User</Button>
        </section>
        <section className="mb-12">
          {users.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-[3rem_1fr_2fr_2.5rem] items-center gap-x-4 p-4 border-b border-border"
            >
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-12 h-12 rounded-full"
              />
              <h2 className="font-semibold text-lg">
                {user.first_name} {user.last_name}
              </h2>
              <p className="text-gray-600">{user.email}</p>
              <UserActionsDropdown />
            </div>
          ))}
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
      <Toaster closeButton />
    </>
  );
};

export default DashboardPage;
