import React, { useEffect, useRef, useState, FC } from "react";
import './ToDoStatusStyle.css'

interface IToDoStatus {
   className?: string,
   tasksList: any[],
   setToDoStatusItem: Function,
   statusIndex: number
}

const  ToDoStatus: FC<IToDoStatus> = ({className, setToDoStatusItem, statusIndex})=> {
    const toDoStatusItem = useRef<HTMLSelectElement>(null!)
    useEffect(()=>{
        setToDoStatusItem(toDoStatusItem.current)
        toDoStatusItem.current.value = toDoStatusItem.current.options[statusIndex].innerHTML
    })

    return(
        <select ref = {toDoStatusItem} className = {`to-do-status ${'to-do-edit-component'}`}>
            <option>Ожидает</option>
            <option>В процессе</option>
            <option>Выполнено</option>
        </select>       
    )
}

export default  ToDoStatus;