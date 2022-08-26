import React, { useEffect, useRef, useState, FC } from "react";
import './ToDoListEditStyle.css'
import EditItem from '../EditItem/EditItem'

interface IToDoListEdit {
    tasksList: any[],
    setTasksList: Function
}
const  ToDoListEdit: FC<IToDoListEdit> = ({tasksList, setTasksList})=> {
    return(
        <div className="to-do-list-edit-field">
            <div className="edit-field-container">
              {tasksList.map((task, index)=><EditItem key = {index} tasksList = {tasksList} setTasksList = {setTasksList} statusIndex = {task.statusIndex}/>)}
            </div>
        </div>       
    )
}

export default  ToDoListEdit;