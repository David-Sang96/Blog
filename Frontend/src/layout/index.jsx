import { useEffect } from "react";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { getExpDuration } from "../util/auth";

const Layout = () => {
  const location = useLocation();
  const token = useLoaderData();
  const submit = useSubmit();
  const { state } = useNavigation(); //watching route action all the time

  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "TOKEN EXPIRED") {
      submit(null, { action: "/logout", method: "POST" });
    }

    const duration = getExpDuration();
    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, [duration]);
  }, [token, submit]);

  return (
    <section className="container mx-auto px-3 md:px-0">
      <Navbar />
      <SwitchTransition>
        <CSSTransition
          timeout={200}
          key={location.pathname}
          classNames={"fade"}
        >
          {state === "loading" ? <Loader /> : <Outlet />}
        </CSSTransition>
      </SwitchTransition>
    </section>
  );
};

export default Layout;
