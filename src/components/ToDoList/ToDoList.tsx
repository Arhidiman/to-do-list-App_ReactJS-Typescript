import { useEffect, useRef, useState, FC } from "react";
import './ToDoListStyle.css'
import ToDoItem from '../ToDoItem/ToDoItem'


interface IToDoList {
    tasksList: any[],
    setTasksList: Function
}

const  ToDoList: FC<IToDoList> = ({tasksList, setTasksList})=> {
    
    //Объявление необходимых констант
    const toDoList = useRef<HTMLDivElement>(null!)
    const [toDoListXLeft, setToDoListXLeft] = useState<number>()
    const [toDoListXRight, setToDoListXRight] = useState<number>()

    useEffect(()=>{
        setToDoListXRight(document.getElementsByClassName('to-do-list')[0].getBoundingClientRect().right)
        setToDoListXLeft(document.getElementsByClassName('to-do-list')[0].getBoundingClientRect().left)
    })

    //Добавляем элементу body обработчик события движения мыши, изменяющий ширину списка задач
    document.body.onmousemove = (e)=> resizeToDoListWindow(e)

    // Изменяет ширину списка задач посредством изменения его свойства width
    function resizeToDoListWindow(e: MouseEvent) {
        if((e.x > toDoListXRight! - 3 ) && (e.x < toDoListXRight! + 3)) {
            document.body.style.cursor = 'e-resize'
            document.body.onmousedown = (e)=> {
                document.body.onmousemove = (e)=>{
                    toDoList.current.style.width = e.x - toDoListXLeft! + 'px'
                }
                document.body.onmouseup = ()=>{
                    document.body.style.cursor = 'auto'
                    document.body.onmousemove = null
                    document.body.onmouseup = null
                    document.body.onmousemove = (e)=> resizeToDoListWindow(e)
                    setToDoListXRight(document.getElementsByClassName('to-do-list')[0].getBoundingClientRect().right)
                }
            }
        } else {
            document.body.style.cursor = 'auto'
            document.body.onmousedown = null
        }
    }
    return(
        <div ref = {toDoList} className="to-do-list">
            <div className="to-do-list-container">   
                {tasksList.map((task, index)=><ToDoItem key = {index} inner = {task.message} tasksList = {tasksList} className = {task.statusClasses[task.statusIndex]}/>)}
            </div>      
        </div>       
    )
}

export default  ToDoList;