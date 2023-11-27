import { createContext } from "react";
import { UserRole } from "./types";
export interface UserContextProps {
  value: {
    role: UserRole | string;
  };
  children?: React.ReactNode;
}
export const UserContext = createContext<{ role: UserRole | string }>({
  role: "",
});

export const UserContextProvider = ({ value, children }: UserContextProps) => (
  <UserContext.Provider value={value}>{children}</UserContext.Provider>
);
