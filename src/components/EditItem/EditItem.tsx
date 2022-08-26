import React, { useEffect, useRef, useState, FC } from "react";
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
    const [toDoItems, setToDoItems] = useState<HTMLCollectionOf<HTMLDivElement>>(document.getElementsByClassName('to-do-item') as HTMLCollectionOf<HTMLDivElement>)
    const [statusItems, setStatusItems] = useState<HTMLCollectionOf<HTMLSelectElement>>(document.getElementsByClassName('to-do-status') as HTMLCollectionOf<HTMLSelectElement>)
    const [nextInLineStatusIndex, inProgressStatusIndex, completedStatusIndex] = [0, 1 ,2]


    // Присваивание элементам взаимодействия со списком задач соответствующих обработчиков событий
    if(eraseButtonElement) eraseButtonElement.onclick = (e)=> eraseTask(getToDoIndex(e, eraseButtons)!, tasksList) 
    if(toDoStatusItem)  toDoStatusItem.onchange = (e)=> setToDoStatus(toDoItems, toDoStatusItem, getToDoIndex(e, statusItems)!)
    if(editTextButtonElement)  editTextButtonElement.onclick = (e)=> showEditToDoForm(editToDoForm!, getToDoIndex(e, editButtons)!, updateToDoMessage)
    if(saveToDoButtonElement)  saveToDoButtonElement.onclick = ()=> console.log('saveToDoButtonElement')
    if (editToDoInput) editToDoInput.onblur = (e)=> hideEditToDoForm(editToDoForm!)
   


    // Разбитие функционала взаимодейтсвия со списком задач на соответствующие функции

    // Определяет индекс элемента, который должен быть отрадактирован
    function getToDoIndex(e: Event, elementsCollection: HTMLCollectionOf<HTMLElement>) {
        console.log(e.target, elementsCollection)
        for(let i = 0; i < elementsCollection.length; i++) {
            if(e.target === elementsCollection[i]) {
                console.log(i)
                return i
            } 
        }
    }

    // Удаляет объект 
    function eraseTask(index: number, tasksList: string[]) {
        let tasks: string[] = []
        tasksList.forEach((task)=>{tasks.push(task)})
        tasks.splice(index, 1)
        setTasksList(tasks)
        if(eraseButtonElement !== undefined)  {
            console.log(eraseButtonElement.classList.contains('erase-button'))
        }
    }

    function setToDoStatus(toDoItems: HTMLCollectionOf<HTMLElement>, statusItem: HTMLSelectElement, itemIndex: number) {
        if(statusItem.options[statusItem.selectedIndex].innerHTML === 'Ожидает') {
            tasksList[itemIndex].statusIndex = nextInLineStatusIndex
            let newTasksList = getSortedTodo(tasksList)
            console.log(newTasksList)
            setTasksList(newTasksList.map((task)=>(task)))
        }
        if(statusItem.options[statusItem.selectedIndex].innerHTML === 'В процессе') {
            tasksList[itemIndex].statusIndex = inProgressStatusIndex
            let newTasksList = getSortedTodo(tasksList)
            console.log(newTasksList)
            setTasksList(newTasksList.map((task)=>(task)))
        }
        if(statusItem.options[statusItem.selectedIndex].innerHTML === 'Выполнено') {
            tasksList[itemIndex].statusIndex = completedStatusIndex
            let newTasksList = getSortedTodo(tasksList)
            console.log(newTasksList)
            setTasksList(newTasksList.map((task)=>(task)))
        } 
    }

    function getSortedTodo(tasksList: any[]) {
        let nextInLineTasks: any[] = tasksList.filter((item)=>item.statusIndex === nextInLineStatusIndex)
        let inProgressTasks: any[] = tasksList.filter((item)=>item.statusIndex === inProgressStatusIndex)
        let completedTasks: any[] = tasksList.filter((item)=>item.statusIndex === completedStatusIndex)
       return(nextInLineTasks.concat(inProgressTasks).concat(completedTasks))
    }

    function showEditToDoForm(formElement: HTMLFormElement, toDoIndex: number, updateToDoMessage: Function) {
        formElement!.classList.add('edit-to-do-text-form_show')
        editItem.current.classList.add('edit-item-container_show-form')
        let input = formElement.childNodes[0] as HTMLInputElement
        input.focus()
        input.value = tasksList[toDoIndex].message
        updateToDoMessage(input, formElement, toDoIndex, hideEditToDoForm)
    }

    function hideEditToDoForm(formElement: HTMLFormElement) {
        console.log(formElement)
        formElement!.classList.remove('edit-to-do-text-form_show')
        editItem.current.classList.remove('edit-item-container_show-form')
    }

    function updateToDoMessage(inputElement: HTMLInputElement, formElement: HTMLFormElement, toDoIndex: number, hideEditToDoForm: Function) {
        if(inputElement) inputElement.onkeydown = (e)=> {
            if(e.keyCode == 13) {
                e.preventDefault()
                tasksList[toDoIndex].toDoElement.childNodes[0].innerHTML = inputElement.value
                tasksList[toDoIndex].message = inputElement.value
                hideEditToDoForm(formElement)
            }
        }
        if(saveToDoButtonElement) {
            console.log('update')
            saveToDoButtonElement.onmousedown = function() {
                tasksList[toDoIndex].toDoElement.childNodes[0].innerHTML = inputElement.value
                tasksList[toDoIndex].message = inputElement.value
            }

         
        }
    }

    function click() {
        console.log('click')
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