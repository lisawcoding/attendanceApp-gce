import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AiFillCheckCircle } from "react-icons/ai";

import "./Home.scss";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

function Home() {
  const { t, i18n } = useTranslation();
  const [isLogin, setIsLogin] = useState(false);
  const [inputData, setInputData] = useState(null);

  const clickTab = (elm) => {
    console.log(elm);
    setIsLogin(elm);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    var fd = new FormData();
    // console.log(fd)
    const obj = {};
    fd.forEach((value, key) => (fd[key] = value));
    fd.forEach((value, key) => console.log(key));
    console.log(fd);
  };

  return (
    <main id="Home">
      {/* <Link to="register" >register</Link>
            <Link to="/signin" >go to dashboard</Link>
            <Link to="/punch" >Punch In/Out</Link> */}
      <section className="left-div">
        <h1>{t("attandance app")}</h1>
        <p>{t("sigin  or login")}</p>
      </section>
      <section className="right-div">
        <div className="tab-div">
          <h1
            className={!isLogin ? "selected-tab" : undefined}
            onClick={() => clickTab(false)}
          >
            {t("create an account")}
          </h1>
          <h1
            className={isLogin ? "selected-tab" : undefined}
            onClick={() => clickTab(true)}
          >
            {t("login")}
          </h1>
        </div>
        <div className="form-div">
          {isLogin ? (
            <LogIn t={t} />
          ) : (
            <SignUp t={t} onSubmit={onSubmit} setIsLogin={setIsLogin} />
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
