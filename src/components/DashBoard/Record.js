
const Record = ({record, clickDelIcon, clickEditIcon, DelIcon, EditIcon, isEdit, updateRecord, onChange }) => {

     return (
            <form onSubmit={updateRecord}  id="Record" className={!isEdit ? "edit-item" : ""} >
                <fieldset disabled={ isEdit } >
                    <label>
                        <input type="date" name="in" defaultValue={record.date} onChange={ onChange } />
                    </label>
                    <label>
                        <input type="time" name="in" defaultValue={record.in} onChange={ onChange } step="1" />
                    </label>
                    <label>
                        <input type="time" name="out" defaultValue={record.out} onChange={ onChange } step="1" />
                    </label>
                    <div className="btn-div">
                            <DelIcon onClick={clickDelIcon}/>
                            <EditIcon onClick={clickEditIcon} className="edit-btn" />
                    </div>
                </fieldset>
            </form>
     );
}

export default Record;