import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import ContextWrapper from "@/components/context/context_wrapper";
import ReplyHolder from "@/components/context/reply_context";
import NavHolder from "@/components/context/navbar_context";
import UserCredHolder from "@/components/context/usercred_context";
import LoadingHolder from "@/components/context/loading_context";
import SnackbarComponent from "@/components/elements/reply_popup";
import LoadingComponent from "@/components/elements/loading_element";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserCredHolder>
        <ReplyHolder>
          <NavHolder>
            <LoadingHolder>
              <LoadingComponent />
              <SnackbarComponent />
              <ContextWrapper>
                <Component {...pageProps} />
              </ContextWrapper>
            </LoadingHolder>
          </NavHolder>
        </ReplyHolder>
      </UserCredHolder>
    </>
  );
}
