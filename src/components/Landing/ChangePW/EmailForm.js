const EmailForm = ({sendEmail, changeInput, t, disabled}) => {
    return (
        <form className="sendMailForm" onSubmit={sendEmail}>
            <input type="email" name="email" placeholder="email" onChange={changeInput} required />
            <input type="submit" value={t("next")} disabled={disabled} />
            {alert.length > 0 && <h1 className="alert-text">{t(`${alert}`)}!</h1>}
        </form>
    )   
}

export default EmailForm;