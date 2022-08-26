import { useRef, useState, FC } from "react";
import './EditItemStyle.css'
import Button from '../common/Button/Button'
import ToDoStatus from '../ToDoStatus/ToDoStatus'
import EditToDoText from '../EditToDoText/EditToDoText'

interface IEditItem {
    tasksList: any[],
    setTasksList: Function,
    statusIndex: number
}

const  EditItem: FC<IEditItem> = ({tasksList, setTasksList, statusIndex})=> {

    //Объявление необходимых констант
    const editItem = useRef<HTMLDivElement>(null!)
    const [eraseButtonElement, setEraseButtonElement] = useState<HTMLButtonElement>()
    const [editTextButtonElement, setEditTextButtonElement] = useState<HTMLButtonElement>()
    const [saveToDoButtonElement, setSaveToDoButtonElement] = useState<HTMLButtonElement>()
    const [editToDoForm, setEditToDoForm] = useState<HTMLFormElement>()
    const [editToDoInput, setEditToDoInput] = useState<HTMLInputElement>()
    const [toDoStatusItem, setToDoStatusItem] = useState<HTMLSelectElement>()
    const [eraseButtons, setEraseButtons] = useState<HTMLCollectionOf<HTMLButtonElement>>(document.getElementsByClassName('erase-button')  as HTMLCollectionOf<HTMLButtonElement>)
    const [editButtons, setEditButtons] = useState<HTMLCollectionOf<HTMLButtonElement>>(document.getElementsByClassName('edit-button') as HTMLCollectionOf<HTMLButtonElement>)
    const [statusItems, setStatusItems] = useState<HTMLCollectionOf<HTMLSelectElement>>(document.getElementsByClassName('to-do-status') as HTMLCollectionOf<HTMLSelectElement>)
    const [nextInLineStatusIndex, inProgressStatusIndex, completedStatusIndex] = [0, 1 ,2]


    //Добавляем соответствующим элементам интерфейса обработчики событий с помощью функций написанных ниже
    if(eraseButtonElement) eraseButtonElement.onclick = (e)=> eraseTask(getToDoIndex(e, eraseButtons)!, tasksList) 
    if(toDoStatusItem)  toDoStatusItem.onchange = (e)=> setToDoStatus(toDoStatusItem, getToDoIndex(e, statusItems)!)
    if(editTextButtonElement)  editTextButtonElement.onclick = (e)=> showEditToDoForm(editToDoForm!, getToDoIndex(e, editButtons)!, updateToDoMessage)
    if(saveToDoButtonElement)  saveToDoButtonElement.onclick = ()=> console.log('saveToDoButtonElement')
    if (editToDoInput) editToDoInput.onblur = (e)=> hideEditToDoForm(editToDoForm!)
   
    // Определяет индекс задачи, который должна быть отрадактирована
    function getToDoIndex(e: Event, elementsCollection: HTMLCollectionOf<HTMLElement>) {
        for(let i = 0; i < elementsCollection.length; i++) {
            if(e.target === elementsCollection[i]) {
                return i
            } 
        }
    }

    // Удаляет задачу из списка
    function eraseTask(index: number, tasksList: string[]) {
        let tasks: string[] = []
        tasksList.forEach((task)=>{tasks.push(task)})
        tasks.splice(index, 1)
        setTasksList(tasks)
        if(eraseButtonElement !== undefined)  {
            console.log(eraseButtonElement.classList.contains('erase-button'))
        }
    }

    // Изменяет массив списка задач, изменяя свойство statusIndex у выбранной задачи, обновляет массив списка задач
    function setToDoStatus(statusItem: HTMLSelectElement, itemIndex: number) {
        if(statusItem.options[statusItem.selectedIndex].innerHTML === 'Ожидает') {
            tasksList[itemIndex].statusIndex = nextInLineStatusIndex
            let newTasksList = getSortedTodo(tasksList)
            setTasksList(newTasksList.map((task)=>(task)))
        }
        if(statusItem.options[statusItem.selectedIndex].innerHTML === 'В процессе') {
            tasksList[itemIndex].statusIndex = inProgressStatusIndex
            let newTasksList = getSortedTodo(tasksList)
            setTasksList(newTasksList.map((task)=>(task)))
        }
        if(statusItem.options[statusItem.selectedIndex].innerHTML === 'Выполнено') {
            tasksList[itemIndex].statusIndex = completedStatusIndex
            let newTasksList = getSortedTodo(tasksList)
            setTasksList(newTasksList.map((task)=>(task)))
        } 
    }

    // Возвращает отсортированный список задач по их статусу выполнения
    function getSortedTodo(tasksList: any[]) {
        let nextInLineTasks: any[] = tasksList.filter((item)=>item.statusIndex === nextInLineStatusIndex)
        let inProgressTasks: any[] = tasksList.filter((item)=>item.statusIndex === inProgressStatusIndex)
        let completedTasks: any[] = tasksList.filter((item)=>item.statusIndex === completedStatusIndex)
        return(nextInLineTasks.concat(inProgressTasks).concat(completedTasks))
    }

    //Открывает форму редактирования текста задачи
    function showEditToDoForm(formElement: HTMLFormElement, toDoIndex: number, updateToDoMessage: Function) {
        formElement!.classList.add('edit-to-do-text-form_show')
        editItem.current.classList.add('edit-item-container_show-form')
        let input = formElement.childNodes[0] as HTMLInputElement
        input.focus()
        input.value = tasksList[toDoIndex].message
        updateToDoMessage(input, formElement, toDoIndex, hideEditToDoForm)
    }

    //Скрывает форму редактирования текста задачи
    function hideEditToDoForm(formElement: HTMLFormElement) {
        formElement!.classList.remove('edit-to-do-text-form_show')
        editItem.current.classList.remove('edit-item-container_show-form')
    }

    //Редактирует текст задачи по значению, введённому в форму редактирования
    function updateToDoMessage(inputElement: HTMLInputElement, formElement: HTMLFormElement, toDoIndex: number, hideEditToDoForm: Function) {
        if(inputElement) inputElement.onkeydown = (e)=> {
            if(e.keyCode == 13) {
                e.preventDefault()
                tasksList[toDoIndex].toDoElement.childNodes[0].innerHTML = inputElement.value
                tasksList[toDoIndex].message = inputElement.value
                let newTasksList: any[] = []
                tasksList.forEach((task, index)=>{newTasksList.push(task)})
                setTasksList(newTasksList)
                hideEditToDoForm(formElement)
            }
        }
        if(saveToDoButtonElement) {
            saveToDoButtonElement.onmousedown = function() {
                tasksList[toDoIndex].toDoElement.childNodes[0].innerHTML = inputElement.value
                tasksList[toDoIndex].message = inputElement.value
                let newTasksList: any[] = []
                tasksList.forEach((task, index)=>{newTasksList.push(task)})
                setTasksList(newTasksList)
            }
        }
    }

    return(
        <div ref = {editItem} className="edit-item-container">
            <Button className = 'erase-button to-do-edit-component' inner = 'Удалить' setEraseButtonElement = {setEraseButtonElement}/>
            <Button className = 'edit-button to-do-edit-component' inner = 'Редактировать' setEditTextButtonElement = {setEditTextButtonElement}/>
            <EditToDoText setSaveToDoButtonElement = {setSaveToDoButtonElement} setEditToDoForm = {setEditToDoForm} setEditToDoInput = {setEditToDoInput}/>
            <ToDoStatus className= "to-do-edit-component" tasksList = {tasksList} setToDoStatusItem = {setToDoStatusItem} statusIndex = {statusIndex}/>
        </div>       
    )
}

export default  EditItem;