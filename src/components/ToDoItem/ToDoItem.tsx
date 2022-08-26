import React, { useEffect, useRef, useState, FC } from "react";
import './ToDoItemStyle.css'

interface IToDoItem {
    inner: string,
    tasksList: any[],
    className: string
}

const  IToDoItem: FC<IToDoItem> = ({inner, tasksList, className})=> {


    const toDoText = useRef<HTMLParagraphElement>(null!)
    useEffect(()=>{
        // toDoText.current.innerHTML = inner
        // console.log(inner)
        // console.log(toDoText.current.innerHTML)
        // console.log(toDoText.current)
    })

    
    
    return(
        <div className = {`to-do-item ${className}`}>
            <p ref = {toDoText} className="to-do-item-text">
                {inner}
            </p>
        </div>       
    )
}

export default  IToDoItem;