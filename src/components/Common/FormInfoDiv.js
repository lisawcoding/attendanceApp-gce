import Input from "../Common/Input";

export const FormInfoDiv = ({changeInput, thisEmployee, disabled}) => {
    return (
        <section className="info-div">
            <Input label="name" type="text" name="name" handleChange={changeInput} defaultValue={thisEmployee.name} required disabled={disabled} autoFocus />
            <Input label="title" type="text" name="title" handleChange={changeInput} defaultValue={thisEmployee.title} disabled={disabled} />
            <Input label="email" type="email" name="email" handleChange={changeInput} defaultValue={thisEmployee.email} required disabled={disabled} />
            <Input label="phone number" name="tel" type="tel" handleChange={changeInput} size="20" minLength="7" maxLength="14" defaultValue={thisEmployee.tel} disabled={disabled} />
            <Input label="remark" type="text" name="remark" handleChange={changeInput} defaultValue={thisEmployee.remark} disabled={disabled} />
            <Input label="date" type="date" name="date" handleChange={changeInput} placeholder={thisEmployee.date} defaultValue={thisEmployee.date} disabled={disabled} />
            <input type="submit" value="confirm" style={{display: disabled ? "none" : null}} />
        </section>         
    )
}