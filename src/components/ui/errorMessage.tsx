import { ReactNode } from "react";

export const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return <p className="text-xs text-red-600">{children}</p>;
};
