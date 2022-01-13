import React from 'react';
import congratulations from "../../images/congratulations.jpg";

const Congratulations = ({t, clickLoginBtn, successText}) => {
    return (
        <div className="congratulations-div" style={{ backgroundImage: `URL(${congratulations})` }}>
        <div>
             <h1>Success!</h1>
             <p>Great! {successText}. </p>
        </div>
        <div className="check-circle"></div>
        <button onClick={clickLoginBtn}>
             {t("login")}
        </button>
   </div>
    )
}

export default Congratulations;
