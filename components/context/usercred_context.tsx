import React, { useState, useContext, FC } from "react";
import { UserDataInterface } from "../interfaces";

type UserType = UserDataInterface | null;

interface UserContextType {
  userCred: UserType;
  setUserCred: React.Dispatch<React.SetStateAction<UserType>>;
}

interface Props {
  children: React.ReactNode;
}

export const UserCredContext = React.createContext<UserContextType>({
  userCred: null,
  setUserCred: () => {},
});

const UserCredHolder: FC<Props> = ({ children }) => {
  const [userCred, setUserCred] = useState<UserType>(null);

  return (
    <UserCredContext.Provider value={{ userCred, setUserCred }}>
      {children}
    </UserCredContext.Provider>
  );
};

export const useUserCredContext = () => useContext(UserCredContext);

export default UserCredHolder;
