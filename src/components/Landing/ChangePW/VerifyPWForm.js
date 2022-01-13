const VerifyPWForm = ({submitVerifyToken, inputValue, changeInput, alert, t, disabled}) => {
    return (
        <form onSubmit={submitVerifyToken}>
            <input type="email" name="email" placeholder={inputValue.email} disabled />
            <input type="text" name="password" placeholder="password" onChange={changeInput} required />
            <input type="text" name="password2" placeholder="confirm password" onChange={changeInput} required />
            <textarea type="text" name="token" placeholder={t("verify token")} rows="5" onChange={changeInput} required />
            <input type="submit" value={t("reset password")} disabled={disabled} />
            {alert.length > 0 && <h1 className="alert-text">{t(`${alert}`)}!</h1>}
        </form>        
    )
}

export default VerifyPWForm