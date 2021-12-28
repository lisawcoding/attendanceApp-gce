export const FormInfoDiv = ({changeInput, thisEmployee}) => {
    return (
        <section className="info-div">
            <label>
                <span>name</span>
                <input type="text" name="name" onChange={changeInput} defaultValue={thisEmployee.name} required />
            </label>
            <label>
                <span>title</span>
                <input type="text" name="title" onChange={changeInput} defaultValue={thisEmployee.title} />
            </label>
            <label>
                <span>email</span>
                <input type="email" name="email" onChange={changeInput} defaultValue={thisEmployee.email} required />
            </label>
            <label>
                <span>phone number</span>
                <input name="tel" type="tel" onChange={changeInput} size="20" minLength="7" maxLength="14" defaultValue={thisEmployee.tel} />
            </label>
            <label>
                <span>remark</span>
                <input type="text" name="remark" onChange={changeInput} defaultValue={thisEmployee.remark} />
            </label>
            <label>
                <span>date</span>
                <input type="date" name="date" onChange={changeInput} placeholder={thisEmployee.date} defaultValue={thisEmployee.date} />
            </label>
            <input type="submit" value="confirm" />
    </section>         
    )
}