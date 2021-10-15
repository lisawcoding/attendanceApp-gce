
function LogIn (props) {
    return(
        <form>
            <input type="text" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <div className="bottom-div">
                <label>
                    <input type="checkbox" name="remeber" value="true"/><p>{props.t("remember me")}</p>
                </label>
                <a href="#">{props.t("forgot password")}?</a>                            
            </div>
            <input type="submit" value={props.t("login")}/>
        </form>
    )
}

export default LogIn;