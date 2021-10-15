import {useRef, useContext, useState} from "react";
import { InitContext } from "../../contexts/InitContext";
import congratulations from "../../images/congratulations.jpg";

function SignUp (props) {
    const formRef = useRef()
    const { mailUrl, usersUrl } = useContext(InitContext)
    const [ isSentMail, setIsSentMail] = useState(false)
    const [alert, setAlert] = useState([])
    const [ isPWMatch, setIsPWMatch ] = useState( true )
    const [ inputValue, setInputValue] = useState({})
    const [token, setToken] = useState("")
    const [isSignUpSuccess, setIsSignUpSuccess] = useState(false)

    const sendMail = async e => {
        e.preventDefault();

        console.log(e.target.password.value)
        if(e.target.password.value !== e.target.password2.value) {
            setIsPWMatch(false) 
            return 
        }

        var fd= new FormData(formRef.current)
        fd.forEach((value, key)=>fd[key]=value)
        console.log(fd)
        setInputValue(fd)

        fetch(mailUrl, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
            },
            // body: JSON.stringify({email: "fks@dkfa.com"})
            body: JSON.stringify(fd)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.status.toLowerCase().indexOf("success")!==-1) setIsSentMail(true)
        })
        .catch(err=>console.error(err))
    }

    const AddUser = () =>{
        fetch(usersUrl,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(inputValue)
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
        .catch(err=>console.error(err))
    }

    const createAccount = e => {
        e.preventDefault();

        fetch(`${mailUrl}/auth`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${e.target.token.value}`
            },
            body: JSON.stringify(inputValue)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.status.toLowerCase().indexOf("success")!==-1) {
                AddUser();
                setIsSignUpSuccess(true)
            } else {
                setAlert(data.status)
            }
        })
        .catch(err=>console.error(err))
    }

    const changeInput = e => {
        console.log(e.target.value)
        setAlert([])
        setToken(e.target.value)
    }

    return(
        <>
        {
            !isSentMail ?         
            <form onSubmit={sendMail} ref={formRef}>
                <input type="text" name="name" placeholder="name" required />
                <input type="text" name="email" placeholder="email" required/>
                <input type="password" name="password" placeholder="password" required />
                <input type="password" name="password2" placeholder="confirm password" required/>
                { !isSentMail && <input type="submit" value={props.t("next")}/>}
               {
                    !isPWMatch && <h1 className="alert-text">{props.t("password not match, please try again")}!</h1>
                }
            </form>
            :( !isSignUpSuccess ? <form onSubmit={createAccount} >
                <input type="text" name="token" placeholder={props.t("verify token")} required onChange={changeInput} />
                
                    <h1 className="success-text">{props.t("verify token has been sent to your email, please check youre email and verify")}</h1>
                    { token.length<1 && <h1 className="success-text">{props.t("please enter token to verify your account")}</h1>}
                    { alert.length>0 && <h1 className="alert-text">{props.t(`${alert}`)}!</h1>}
                    
                    <input type="submit" value={props.t("verify")}/>
            </form>:
            <div className="congratulations-div" style={{backgroundImage: `url(${congratulations})`}}>
                {/* <img src={congratulations} alt="congratulations" /> */}
                <div className="content-div">
                    <div>
                        <h1>Success!</h1>
                        <p>Great! your account has been created. </p>               
                    </div>
                    <div className="check-circle"></div>
                    <button  onClick={()=>{props.setIsLogin(true)}}>{props.t("login")}</button>
                </div>
            </div>            
            )
        }
        </>
    )
}

export default SignUp;