import React, { useContext } from 'react';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { FunctionContext} from "../../contexts/FunctionContext";

export function Logout (props) {
    const { logout } = useContext( FunctionContext);

        return (
            <div onClick={() => logout(props.props)} className='logout-btn'>
                <RiLogoutBoxRLine/>
                <h2>logout</h2>
            </div>
        )
}

export default Logout
