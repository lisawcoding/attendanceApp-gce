
const Record = ({record, clickDelIcon, clickEditIcon, DelIcon, EditIcon, isEdit, updateRecord, onChange }) => {

     return (
        <div id="Record" className={!isEdit ? "edit-item" : ""} >
                        {
                    Object.keys(record).map( elm =>
                        <li key={`p-${elm}`} style={{textAlign: "left"}}>{elm}: {record[elm]}</li>
                        )
                }    
            <DelIcon onClick={clickDelIcon}/>
            <EditIcon onClick={clickEditIcon} className="edit-btn" />
            <form onSubmit={updateRecord} >
                {/* <fieldset disabled={ isEdit } > */}
                    <label>
                        <span>Time in:</span>
                        {!isEdit ? <input type="time" name="in" defaultValue={record.in} onChange={ onChange } step="1" /> : <span>{record.in}</span>}
                    </label>
                    <label>
                        <span>Time out:</span>
                        {!isEdit ? <input type="time" name="out" defaultValue={record.out} onChange={ onChange } step="1" /> : <span>{record.out}</span>}
                    </label>
                    {!isEdit && <button>update</button>}      
                {/* </fieldset> */}
            </form>
        </div>
     );
}

export default Record;