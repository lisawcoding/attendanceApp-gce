import { useState, useContext, useEffect, useRef } from "react";
import { URLContext } from "../../../contexts/URLContext";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { FunctionContext } from "../../../contexts/FunctionContext";
import DeletePopup from "../../Common/DeletePopup";

function EmployeeRecords_table ({props}) {
    const { usersURL, options } = useContext(URLContext);
    const { reIssueToken } = useContext(FunctionContext);
    const [ records, setRecords ] = useState(null);
    const [ isDelPopup, setIsDelPopup ] = useState( false );
    const [ delItem, setDelItem ] = useState( null );
    const [ editItem, setEditItem ] = useState( null );
    const [ inputValues, setInputValues] = useState(null);
    const [ searchMonth, setSearchMonth ] = useState(`${new Date().getFullYear()}-${("0" + (new Date().getMonth() + 1)).slice(-2)}`);
    let thisRecordsURL=`${usersURL}/${props.location.state.user}/employees/${props.match.params.id}/records`;
    const refs=useRef([]);

    const changeSearchInput = e => setSearchMonth(e.target.value);

    useEffect(()=>{
        getRecords()
    }, [searchMonth])

    const getRecords = () => {
        const date=new Date(searchMonth);
        const lastDay=new Date(date.getFullYear(), date.getMonth()+1, 1)
        fetch( thisRecordsURL, options("POST",{ firstDay: searchMonth, lastDay: lastDay}))
        .then( res => res.json())
        .then( data => {
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
        editItem!=null && refs.current[editItem].reset()
        setInputValues(null)
    }
    
    const clickDelIcon = id => {
        clickEditIcon(id)
        id!==deleteItem ? setDelItem(id) : setDelItem(null)
        setIsDelPopup(true);
    }

    const onChange = e => {
        console.log(e.target.name)
        setInputValues({...inputValues, [e.target.name] : e.target.value})
    }

    const updateRecord = (e, id) => {
        e.preventDefault();
        if( inputValues == null ) return;
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
            <div className="table-head" >
                <label> search: 
                    <input type="month" name="date" value={searchMonth} onChange={changeSearchInput} />
                </label>
                <div className="table-row">
                    <p>date</p>
                    <p>time in</p>
                    <p>time out</p>
                    <div className="btn-div">actions</div>
                </div>
            </div>
            { records && ( records.length<1 ? <h1>no records</h1> : (
                    <>
                        <div  className="table-body">
                            { records.map( record => 
                                <form onSubmit={(e)=>{updateRecord(e, record._id)}} key={record._id} ref={elm=>refs.current[record._id]=elm} >
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
                                            <AiOutlineEdit onClick={()=>{clickEditIcon(record._id)}} className="edit-btn" title="edit item" />
                                            <AiOutlineDelete onClick={()=>{clickDelIcon(record._id)}} title="delete item"/>
                                        </div>
                                    </fieldset>
                                </form>
                            )}                            
                        </div>
                    </>)
             )}
            { delItem && <DeletePopup closePopup = {closePopup} deleteItem={deleteItem} /> }
        </section>
    )
}

export default EmployeeRecords_table;