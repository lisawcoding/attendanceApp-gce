
const Record = ({record, clickDelIcon, clickEditIcon, DelIcon, EditIcon, isEdit, updateRecord, onChange }) => {

     return (
        <div id="Record" className={!isEdit ? "edit-item" : ""} >
                {/* {
                    Object.keys(record).map( elm =>
                        <li key={`p-${elm}`} style={{textAlign: "left"}}>{elm}: {record[elm]}</li>
                        )
                }     */}
            <form onSubmit={updateRecord} >
                <fieldset disabled={ isEdit } >
                {/* <>                     */}
                    <label>
                        <input type="date" name="in" defaultValue={record.date} onChange={ onChange } />
                    </label>
                    <label>
                        <input type="time" name="in" defaultValue={record.in} onChange={ onChange } step="1" />
                    </label>
                    <label>
                        <input type="time" name="out" defaultValue={record.out} onChange={ onChange } step="1" />
                    </label>
                    <button>update</button>
                {/* </> */}
                
   
                    {/* <label>
                        <span>Date:</span>
                        {!isEdit ? <input type="time" name="in" defaultValue={record.in} onChange={ onChange } step="1" /> : <span>{record.in}</span>}
                    </label>
                    <label>
                        <span>Time in:</span>
                        {!isEdit ? <input type="time" name="in" defaultValue={record.in} onChange={ onChange } step="1" /> : <span>{record.in}</span>}
                    </label>
                    <label>
                        <span>Time out:</span>
                        {!isEdit ? <input type="time" name="out" defaultValue={record.out} onChange={ onChange } step="1" /> : <span>{record.out}</span>}
                    </label>
                    {!isEdit && <button>update</button>}       */}
                </fieldset>
            </form>
            <div className="btn-div">
                <DelIcon onClick={clickDelIcon}/>
                <EditIcon onClick={clickEditIcon} className="edit-btn" />
            </div>
        </div>
     );
}

export default Record;