import {useRef, useState, FC } from "react";
import './AddToDoFormStyle.css'
import Button from '../common/Button/Button'


interface IAddToDoForm {
    tasksList: string[],
    setTasksList: Function
}

const  AddToDoForm: FC<IAddToDoForm> = ({tasksList, setTasksList})=> {

    //Объявление необходимых констант
    const input = useRef<HTMLInputElement>(null!)
    const [addButtonElement, setAddButtonElement] = useState<HTMLButtonElement>()
    const statusClasses: string[] = ['next-in-line', 'in-progress', 'completed']
    const [nextInLineStatusIndex, inProgressStatusIndex, completedStatusIndex] = [0, 1 ,2]

    //Добавляем соответствующим элементам интерфейса(полю вводи и кнопке) обработчики событий с помощью функций написанных ниже
    if(input.current) {
        input.current.onkeydown = (e)=> {
            if(e.keyCode == 13) {
                e.preventDefault()
                addTaskToList(input.current)
            }
        }
    }
    if(addButtonElement !== undefined) {
        addButtonElement.onclick = ()=> addTaskToList(input.current)
    }

    // Возвращает отсортированный список задач по их статусу выполнения
    function getSortedTodo(tasksList: any[]) {
        let nextInLineTasks: any[] = tasksList.filter((item)=>item.statusIndex === nextInLineStatusIndex)
        let inProgressTasks: any[] = tasksList.filter((item)=>item.statusIndex === inProgressStatusIndex)
        let completedTasks: any[] = tasksList.filter((item)=>item.statusIndex === completedStatusIndex)
        console.log(nextInLineTasks.concat(inProgressTasks).concat(completedTasks))
        return(nextInLineTasks.concat(inProgressTasks).concat(completedTasks))
    }
    
    //Добавляет в массив tasksList новый объект и обновляет состояние tasksList компонента App
    function addTaskToList( inputElement: HTMLInputElement) {
        if(inputElement.value !== '' && inputElement.value !== null && inputElement.value !== undefined) {
            let tasks: any[] = []
            tasksList.forEach((task)=>{tasks.push(task)})
            let newTask = {message: inputElement.value, status: 'next-in-line', statusIndex: 0, statusClasses: statusClasses}
            tasks.push(newTask)
            tasks = getSortedTodo(tasks)
            setTasksList(tasks)
            inputElement.value = ''
        }      
    }

    return(
        <form className="add-to-do-form">
            <input ref = {input} className="add-to-do-input" type="text" placeholder="Введите текст задачи"/>
            <Button className="app-top-button" inner="Добавить"  setAddButtonElement = {setAddButtonElement}/>
        </form>       
    )
}

export default  AddToDoForm;