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
        logout()
    }

    const googleLoutFailure = (res) => {
        console.log("google logout failure: ", res)
    }

        return (
            <>
                { thisUser.password ? 
                    <div onClick={() => logout(props.props)}>
                        <RiLogoutBoxRLine/>
                    </div>:
                        <GoogleLogout
                            clientId={GOOGLE_CLIENTID}
                            render={(renderProps)=>(
                                <div onClick={renderProps.onClick} >
                                    <RiLogoutBoxRLine/>
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
