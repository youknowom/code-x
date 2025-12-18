import { createContext } from "react";

type UserDetail = {
  id: number;
  name: string;
  email: string;
  points: number;
  subscription?: string | null;
};

type UserDetailContextType = {
  userDetail: UserDetail | null;
  setUserDetail: (userDetail: UserDetail | null) => void;
};

export const UserDetailContext = createContext<UserDetailContextType>({
  userDetail: null,
  setUserDetail: () => {},
});
