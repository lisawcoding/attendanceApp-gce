import { useEffect, useState, useContext } from "react/cjs/react.development";
import { DataContext } from "../../contexts/DataContext";
import { URLContext } from "../../contexts/URLContext";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BiImageAlt } from "react-icons/bi";

import "./Records.scss";
import Record from "./Record";
import { FunctionContext } from "../../contexts/FunctionContext";
import DeletePopup from "../Common/DeletePopup";

function Records(props) {
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

    const getRecords = () => {
        fetch( thisRecordsURL )
        .then( res => res.json())
        .then( async (data) => {
            console.log(data);
            await setRecords(data)
            closePopup()
        })
        .catch( err => console.error(err))        
    }

    useEffect(()=>{
        getRecords()
    }, [])

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

    const clickDelIcon = id => {
        setIsDelPopup(true)
        setDelItem( id )
    }

    const closePopup = () => {
        setIsDelPopup(!isDelPopup);
        setDelItem( null )
    }

    const clickEditIcon = id => {
        setEditItem( id )
        setInputValues(null)
        if(id!==editItem) return setIsEdit(true)
        setIsEdit( !isEdit )
    }

    const onChange = e => {
        console.log(e.target.name)
        setInputValues({...inputValues, [e.target.name] : e.target.value})
    }

    // const sortAtoZ = () => setSortEmployees(allEmployees.sort(function(a, b) {
    //     var nameA = a.name.toUpperCase();
    //     var nameB = b.name.toUpperCase();
    //     if (nameA < nameB) return -1;
    //     if (nameA > nameB) return 1;
    //     return 0;
    //   }))
        

     return (
         <main id="Records">
                <section className="top-div">
                    <div className="employee-img-wrapper">
                        {
                            props.location.state.image ? <img src={props.location.state.image} alt={props.location.name} /> : <BiImageAlt/>
                        }
                    </div>
                    <div className="personal-info">
                        <h1>{props.location.state.name}</h1>
                        <h1>{props.location.state._id}</h1>
                    </div>
                </section>
                <section className="records-div">
                    <div id="Record">
                        <p>Date</p>
                        <p>Date</p>
                        <p>Date</p>
                        <p>Date</p>
                    </div>
                    <div className="scroll-y">
                    { 
                        records && ( records.length<1 ? <h1>no records</h1> : 
                            records.map(record=> 
                                <Record 
                                    key={record._id} 
                                    record={record}  
                                    DelIcon={AiOutlineDelete} 
                                    EditIcon={AiOutlineEdit} 
                                    clickDelIcon = {()=>{clickDelIcon(record._id)}} 
                                    clickEditIcon={()=>{clickEditIcon(record._id)}}
                                    isEdit = { isEdit  && editItem == record._id ? false : true }
                                    // updateRecord={updateRecord}
                                    updateRecord={(e)=>{updateRecord(e, record._id)}}
                                    onChange={onChange}
                                />) )
                    }
                    </div>
                </section>
                {
                    delItem && <DeletePopup closePopup = {closePopup} deleteItem={deleteItem} />
                }
         </main>
     );
}

export default Records;