import React, { useEffect, useRef, useState, FC, ReactElement } from "react";
import './SearchToDoFormStyle.css'
import Button from '../common/Button/Button'

interface ISearchToDoForm {
    tasksList: any[]
}

const  SearchToDoForm: FC<ISearchToDoForm> = ({tasksList})=> {
    const searchInput = useRef<HTMLInputElement>(null!)
    const [searchButtonElement, setSearchButtonElement] = useState<HTMLButtonElement>()
    useEffect(()=>{
        console.log(tasksList)

        if(searchInput) {
            searchInput.current.oninput = ()=> findToDoByName(tasksList, searchInput.current)
            searchInput.current.onfocus = ()=> findToDoByName(tasksList, searchInput.current)
            searchInput.current.onblur = ()=> canselSelect(tasksList)
            searchInput.current.addEventListener('keydown', (e)=> {if(e.keyCode == 13) e.preventDefault()})
        }
        if(searchButtonElement) {
            searchButtonElement.onclick = ()=> clearInput(searchInput.current)
        }

        
    })

    function findToDoByName(tasksList: any[], inputElement: HTMLInputElement) {
        console.log(searchButtonElement)
        let searchMessage = inputElement.value;
        let toDoMessage = ''
        tasksList.forEach((task: object, index: number)=>{
            toDoMessage =  tasksList[index].message.substring(0, searchMessage.length)
            console.log(toDoMessage)
            if(searchMessage === toDoMessage && searchMessage !== '') {
                tasksList[index].toDoElement.childNodes[0].classList.add('to-do-item_found')
            } else tasksList[index].toDoElement.childNodes[0].classList.remove('to-do-item_found')
        })
    }

    function canselSelect(tasksList: any[]) {
        tasksList.forEach((task: object, index: number)=>{
            tasksList[index].toDoElement.childNodes[0].classList.remove('to-do-item_found')
        })
    }

    function clearInput(inputElement: HTMLInputElement) {
        console.log(inputElement)
        inputElement.value = ''
    }

    return(
        <form  className="search-to-do-form">
            <input ref = {searchInput} className="search-to-do-input" type="text" placeholder="Поиск"/>
            <Button className = 'app-top-button' inner = 'Очистить' setSearchButtonElement = {setSearchButtonElement}/>
        </form>       
    )
}

export default  SearchToDoForm;