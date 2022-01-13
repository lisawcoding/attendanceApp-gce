import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { DataContext } from '../../contexts/DataContext';
import { FunctionContext} from "../../contexts/FunctionContext";

export function Logout (props) {
    const { thisUser } = useContext(DataContext);
    const { logout } = useContext( FunctionContext);
    const GOOGLE_CLIENTID = process.env.REACT_APP_GOOGLE_CLIENTID;

    const googleLogoutSuccess = () => {
        console.log("google logout success: ");
        logout(props.props)
    }

    const googleLoutFailure = (res) => {
        console.log("google logout failure: ", res)
    }

    const buttonDiv = <div className='logout-btn'>
                        <RiLogoutBoxRLine/>
                        <h2>logout</h2>                    
                      </div>     

        return (
            <>
                { thisUser.password ? 
                    <div onClick={() => logout(props.props)}>
                        {buttonDiv}
                    </div>:
                        <GoogleLogout
                            clientId={GOOGLE_CLIENTID}
                            render={(renderProps)=>(
                                <div onClick={renderProps.onClick} >
                                    {buttonDiv}
                                </div>
                            )}
                            onLogoutSuccess={googleLogoutSuccess}
                            onFailure={googleLoutFailure}
                        />  
                    }              
            </>   
        )
}

export default Logout
