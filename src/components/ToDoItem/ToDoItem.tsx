import { FC } from "react";
import './ToDoItemStyle.css'

interface IToDoItem {
    inner: string,
    tasksList?: any[],
    className: string
}

const  IToDoItem: FC<IToDoItem> = ({inner, className})=> {
    return(
        <div className = {`to-do-item ${className}`}>
            <p className="to-do-item-text">
                {inner}
            </p>
        </div>       
    )
}

export default  IToDoItem;