import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../contexts/DataContext";
import { URLContext } from "../../contexts/URLContext";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import { FunctionContext } from "../../contexts/FunctionContext";
import DeletePopup from "../Common/DeletePopup";

function EmployeeRecords_table ({props}) {
    const { usersURL, options } = useContext(URLContext);
    const { thisUser } = useContext(DataContext);
    const { reIssueToken } = useContext(FunctionContext);
    const [ records, setRecords ] = useState(null);
    const [ isDelPopup, setIsDelPopup ] = useState( false );
    const [ delItem, setDelItem ] = useState( null );
    const [ editItem, setEditItem ] = useState( null );
    const [ isEdit, setIsEdit ] = useState(false);
    const [ inputValues, setInputValues] = useState(null)
    let thisRecordsURL=`${usersURL}/${thisUser._id}/employees/${props.match.params.id}/records`;
    const [perTable, setPerTable] = useState(5)
    // let thisRecordsURL=`${usersURL}/${thisUser._id}/employees/${props.location.state._id}/records`;
    // const tableHead = [ "date", "in", "out", "" ]

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
    
    const clickEditIcon = id => {
        setEditItem( id )
        setInputValues(null)
        if(id!==editItem) return setIsEdit(true)
        setIsEdit( !isEdit )
    }

    const closePopup = () => {
        setIsDelPopup(!isDelPopup);
        setDelItem( null )
    }


    const onChange = e => {
        console.log(e.target.name)
        setInputValues({...inputValues, [e.target.name] : e.target.value})
    }

    const clickDelIcon = id => {
        setIsDelPopup(true)
        setDelItem( id )
    }

    const updateRecord = (e, id) => {
        e.preventDefault();
        if( inputValues == null ) return;
        console.log("updateRecord")
        console.log(id)

        console.log(inputValues)
    
        // inputValues!==null && console.log(inputValues)
        // var fd = new FormData(formRef.current);
        // fd.forEach((value, key) => (fd[key] = value));

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
                setIsEdit(false);
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
            <div className="scroll-y">
            { 
                records && ( records.length<1 ? <h1>no records</h1> : (
                    <>
                        <div className="table-heading table-row" >
                            {/* {
                                tableHead.map((td, i)=><p key={`${td}-${i}`}>{td}</p>)
                            } */}
                            <p>date</p>
                            <p>time in</p>
                            <p>time out</p>
                            <div className="btn-div">actions</div>
                        </div>
                        {
                    records.map( record => 
                            <form onSubmit={updateRecord}  id="Record" className={isEdit ? "edit-item" : ""} key={record._id}>
                                <fieldset disabled={ !isEdit } className="table-row" >
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
                                        <AiOutlineDelete onClick={clickDelIcon}/>
                                        <AiOutlineEdit onClick={clickEditIcon} className="edit-btn" />
                                    </div>
                                </fieldset>
                            </form>
                        )                        
                        }
                    </>
                    )
                     )}
            </div>


            
            {
                delItem && <DeletePopup closePopup = {closePopup} deleteItem={deleteItem} />
            }
        </section>
    )
}

export default EmployeeRecords_table;