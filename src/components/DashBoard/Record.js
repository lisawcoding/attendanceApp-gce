
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
                <fieldset disabled={ isEdit } >
                {/* <label>
                    <span>date:</span>
                    <input type="date" name="date" defaultValue={record.date} onChange={ onChange }/>
                </label>  */}
                <label htmlFor="appt-time">time: </label>
                    <input id="appt-time" type="time" name="appt-time" step="2" />
                {/* <label>
                    <span>Time in:</span>
                    <input type="time" name="in" defaultValue={record.in} onChange={ onChange } step="2"/>
                </label>        */}
                {/* <label>
                    <span>Time out:</span>
                    <input type="time" name="out" defaultValue={record.out} onChange={ onChange }/>
                </label>                 */}
                {
                    !isEdit && <button>update</button>
                }   
                </fieldset>
            </form>
        </div>
     );
}

export default Record;