import Input from "../Common/Input";

export const FormInfoDiv = ({changeInput, thisEmployee}) => {
    return (
        <section className="info-div">
            <Input label="name" type="text" name="name" onChange={changeInput} defaultValue={thisEmployee.name} required />
            <Input label="title" type="text" name="title" onChange={changeInput} defaultValue={thisEmployee.title} />
            <Input label="email" type="email" name="email" onChange={changeInput} defaultValue={thisEmployee.email} required />
            <Input label="phone number" name="tel" type="tel" onChange={changeInput} size="20" minLength="7" maxLength="14" defaultValue={thisEmployee.tel} />
            <Input label="remark" type="text" name="remark" onChange={changeInput} defaultValue={thisEmployee.remark} />
            <Input label="date" type="date" name="date" onChange={changeInput} placeholder={thisEmployee.date} defaultValue={thisEmployee.date} />
            <input type="submit" value="confirm" />
        </section>         
    )
}