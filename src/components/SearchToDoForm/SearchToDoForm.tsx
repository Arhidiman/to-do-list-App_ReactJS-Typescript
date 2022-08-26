import { useRef, useState, FC } from "react";
import './SearchToDoFormStyle.css'
import Button from '../common/Button/Button'

interface ISearchToDoForm {
    tasksList: any[]
}

const  SearchToDoForm: FC<ISearchToDoForm> = ({tasksList})=> {

    //Объявление необходимых констант
    const searchInput = useRef<HTMLInputElement>(null!)
    const [searchButtonElement, setSearchButtonElement] = useState<HTMLButtonElement>()

    //Добавляем соответствующим элементам интерфейса обработчики событий с помощью функций написанных ниже
    if(searchInput.current) {
        searchInput.current.oninput = ()=> findToDoByName(tasksList, searchInput.current)
        searchInput.current.onfocus = ()=> findToDoByName(tasksList, searchInput.current)
        searchInput.current.onblur = ()=> canselSelect(tasksList)
        searchInput.current.addEventListener('keydown', (e)=> {if(e.keyCode == 13) e.preventDefault()})
    }
    if(searchButtonElement) {
        searchButtonElement.onclick = ()=> clearInput(searchInput.current)
    }

    //Выделяет цветом задачу, текст которой частично или полностью совпадает с текстом в поле ввода
    function findToDoByName(tasksList: any[], inputElement: HTMLInputElement) {
        let searchMessage = inputElement.value;
        let toDoMessage = ''
        tasksList.forEach((task: object, index: number)=>{
            toDoMessage =  tasksList[index].message.substring(0, searchMessage.length)
            if(searchMessage === toDoMessage && searchMessage !== '') {
                tasksList[index].toDoElement.childNodes[0].classList.add('to-do-item_found')
            } else tasksList[index].toDoElement.childNodes[0].classList.remove('to-do-item_found')
        })
    }

    //Отменяет выделение цветом всех задач
    function canselSelect(tasksList: any[]) {
        tasksList.forEach((task: object, index: number)=>{
            tasksList[index].toDoElement.childNodes[0].classList.remove('to-do-item_found')
        })
    }

    //Очистка текстового поля
    function clearInput(inputElement: HTMLInputElement) {
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