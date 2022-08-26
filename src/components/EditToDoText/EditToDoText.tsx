import { useRef, FC, ReactElement } from "react";
import './EditToDoTextStyle.css'
import Button from '../common/Button/Button'

interface IEditToDoText {
    children?: ReactElement[],
    className?: string
    setSaveToDoButtonElement: Function,
    setEditToDoForm: Function, 
    setEditToDoInput: Function
}

const  EditToDoText: FC<IEditToDoText> = ({setSaveToDoButtonElement, setEditToDoForm, setEditToDoInput})=> {
    const editToDoForm = useRef<HTMLFormElement>(null!)
    const editToDoInput = useRef<HTMLInputElement>(null!)
    if(setEditToDoForm) setEditToDoForm(editToDoForm.current)
    if(setEditToDoInput) setEditToDoInput(editToDoInput.current)
    return(  
        <form ref = {editToDoForm} className="edit-to-do-text-form">
            <input ref = {editToDoInput} className="edit-to-do-input" type="text" placeholder="Редактировать текст задачи"/>
            <Button className = 'app-top-button' inner = 'Сохранить изменения' setSaveToDoButtonElement = {setSaveToDoButtonElement}/>
        </form> 
    )
}

export default  EditToDoText;