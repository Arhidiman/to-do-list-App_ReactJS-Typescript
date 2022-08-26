import React, { useEffect, useRef, useState, FC } from "react";
import './ToDoListStyle.css'
import ToDoItem from '../ToDoItem/ToDoItem'


interface IToDoList {
    tasksList: any[]
}

const  ToDoList: FC<IToDoList> = ({tasksList})=> {

    const toDoList = useRef<HTMLDivElement>(null!)
    const [appWidth, setAppWidth] = useState<number>()
    const [toDoListEditField, setToDoListEditField] = useState<HTMLDivElement>()
    const [toDoListXLeft, setToDoListXLeft] = useState<number>()
    const [toDoListXRight, setToDoListXRight] = useState<number>()

    useEffect(()=>{
        setAppWidth(document.getElementsByClassName('app-container')[0].getBoundingClientRect().width as number)
        setToDoListEditField(document.getElementsByClassName('to-do-list-edit-field')[0] as HTMLDivElement)
        setToDoListXRight(document.getElementsByClassName('to-do-list')[0].getBoundingClientRect().right)
        setToDoListXLeft(document.getElementsByClassName('to-do-list')[0].getBoundingClientRect().left)
    })
    
    document.body.onmousemove = (e)=> resizeToDoListWindow(e)

    function resizeToDoListWindow(e: MouseEvent) {
        if((e.x > toDoListXRight! - 2 ) && (e.x < toDoListXRight! + 2)) {
            document.body.style.cursor = 'e-resize'
            document.body.onmousedown = (e)=> {
                document.body.onmousemove = (e)=>{
                    let toDoListWidth: number = document.getElementsByClassName('to-do-list')[0].getBoundingClientRect().width
                    toDoList.current.style.width = e.x - toDoListXLeft! + 'px'
                }
                document.body.onmouseup = ()=>{
                    document.body.onmousemove = null
                    document.body.onmouseup = null
                    document.body.style.cursor = 'auto'
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