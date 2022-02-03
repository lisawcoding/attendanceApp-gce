import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../../contexts/DataContext";
import { URLContext } from "../../../contexts/URLContext";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr"

import { FunctionContext } from "../../../contexts/FunctionContext";
import DeletePopup from "../../Common/DeletePopup";

function EmployeeRecords_table ({props}) {
    const { usersURL, options } = useContext(URLContext);
    const { thisUser } = useContext(DataContext);
    const { reIssueToken } = useContext(FunctionContext);
    const [ records, setRecords ] = useState(null);
    const [ isDelPopup, setIsDelPopup ] = useState( false );
    const [ delItem, setDelItem ] = useState( null );
    const [ editItem, setEditItem ] = useState( null );
    const [ inputValues, setInputValues] = useState(null)
    let thisRecordsURL=`${usersURL}/${thisUser._id}/employees/${props.match.params.id}/records`;

    useEffect(()=>{
        getRecords()
    }, [])

    const getRecords = () => {
        fetch( thisRecordsURL )
        .then( res => res.json())
        .then( async (data) => {
            console.log(data);
            setRecords(data)
            closePopup()
        })
        .catch( err => console.error(err))        
    }

    const closePopup = () => {
        setIsDelPopup(!isDelPopup);
        setDelItem( null )
    }

    const clickEditIcon = id => {
        id!=editItem ? setEditItem(id) : setEditItem(null)
        setInputValues(null)
    }
    
    const clickDelIcon = id => {
        clickEditIcon(id)
        id!==deleteItem ? setDelItem(id) : setDelItem(null)
        setIsDelPopup(true)
        // setDelItem( id )
    }

    const onChange = e => {
        console.log(e.target.name)
        setInputValues({...inputValues, [e.target.name] : e.target.value})
    }


    const updateRecord = (e, id) => {
        e.preventDefault();
        if( inputValues == null ) return;
        console.log("updateRecord")
        console.log(id)

        console.log(inputValues)

        fetch(`${thisRecordsURL}/${id}`, options("PUT", inputValues))
        .then(res => res.json())
        .then(async(data) => {
            console.log("edit item: ", data)
            if (data.error) {
                await reIssueToken(props);
                updateRecord();
                return;
            } else {
                getRecords();
                // setIsEdit(false);
                setInputValues(null)
            }
        })
        .catch( err => {
            console.error( err );
            window.location.reload();
        })
    }

    const deleteItem = () => {
        console.log("delete: ", delItem)
        fetch(`${thisRecordsURL}/${delItem}`, options("DELETE"))
        .then((res) => res.json())
        .then(async (data) => {
             console.log("deleteItem: ", data);
             if (data.error) {
                  await reIssueToken(props);
                  deleteItem();
                  return;
             } else {
                  getRecords()
             }
        })
        .catch((err) => {
            console.error(err);
            window.location.reload()
        });
    }

    return (
        <section className="table">
            { 
                records && ( records.length<1 ? <h1>no records</h1> : (
                    <>
                        <div className="table-heading" >
                            <div className="table-row">
                                <p>date</p>
                                <p>time in</p>
                                <p>time out</p>
                                <div className="btn-div">actions</div>
                            </div>
                        </div>
                        <div  className="table-body">
                            { records.map( record => 
                                <form onSubmit={updateRecord}  id="Record" key={record._id}>
                                    <fieldset disabled={ editItem !== record._id } className="table-row" >
                                        <label>
                                            <input type="date" name="date" defaultValue={record.date} onChange={ onChange } />
                                        </label>
                                        <label>
                                            <input type="time" name="in" defaultValue={record.in} onChange={ onChange } step="1" />
                                        </label>
                                        <label>
                                            <input type="time" name="out" defaultValue={record.out} onChange={ onChange } step="1" />
                                        </label>
                                        <div className="btn-div">
                                            {editItem == record._id && inputValues!= null && <button title="confirm"><GrUpdate/></button>}
                                            <AiOutlineDelete onClick={()=>{clickDelIcon(record._id)}} title="delete item"/>
                                            <AiOutlineEdit onClick={()=>{clickEditIcon(record._id)}} className="edit-btn" title="edit item" />
                                        </div>
                                    </fieldset>
                                </form>
                            )}                            
                        </div>

                    </>)
                     )}
            {
                delItem && <DeletePopup closePopup = {closePopup} deleteItem={deleteItem} />
            }
        </section>
    )
}

export default EmployeeRecords_table;