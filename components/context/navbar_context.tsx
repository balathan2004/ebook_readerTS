import React, { useState, useContext, FC } from "react";

type NavType = { name: string; path: string }[];

export const NavUsers = [
  {
    name: "home",
    path: "/home",
  },
  {
    name: "about",
    path: "/about",
  },
  {
    name: "upload book",
    path: "/upload_book",
  },
  {
    name: "read now",
    path: "/read_now",
  },
];
export const NavGuest = [
  {
    name: "login",
    path: "/auth/login",
  },
  {
    name: "register",
    path: "/auth/register",
  },
  {
    name: "about",
    path: "/about",
  },
];

interface NavContextType {
  dirs: NavType;
  setUserNav: () => void;
  setGuestNav: () => void;
}

interface Props {
  children: React.ReactNode;
}

export const NavContext = React.createContext<NavContextType>({
  dirs: NavGuest,
  setGuestNav: () => {},
  setUserNav: () => {},
});

const NavHolder: FC<Props> = ({ children }) => {
  const [dirs, setDirs] = useState<NavType>(NavGuest);

  const setUserNav = () => setDirs(NavUsers);
  const setGuestNav = () => setDirs(NavGuest);

  return (
    <NavContext.Provider value={{ dirs, setUserNav, setGuestNav }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNavContext = () => useContext(NavContext);

export default NavHolder;
