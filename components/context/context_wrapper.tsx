import React, { FC, useEffect } from "react";
import { AuthResponseConfig } from "../interfaces";
import { useUserCredContext } from "./usercred_context";
import DrawerAppBar from "../elements/navbar";
import ReplyPopup from "../elements/reply_popup";
import { useNavContext, NavUsers } from "./navbar_context";
import LoadingComponent from "../elements/loading_element";

interface Props {
  children: React.ReactNode;
}

const ContextWrapper: FC<Props> = ({ children }) => {
  const { setUserCred } = useUserCredContext();
  const { setUserNav } = useNavContext();

  useEffect(() => {
    async function getCred() {
      const response = await fetch("/api/auth/login_cred", {
        credentials: "include",
        method: "GET",
      });

      const res = (await response.json()) as AuthResponseConfig;
      console.log(res);
      if (res.status == 200 && res.userCredentials) {
        setUserCred(res.userCredentials);
        setUserNav();
      }
    }
    getCred();
  }, []);

  return (
    <div className="container">
      <DrawerAppBar />
      {children}
    </div>
  );
};

export default ContextWrapper;
