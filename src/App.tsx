import {useState, useEffect} from 'react';
import './App.css';
import AppHeader from './components/AppHeader/AppHeader';
import AppTop from './components/AppTop/AppTop';
import AppBottom from './components/AppBottom/AppBottom';
import AddToDoForm from './components/AddToDoForm/AddToDoForm';
import SearchToDoForm from './components/SearchToDoForm/SearchToDoForm';
import ToDoList from './components/ToDoList/ToDoList';
import ToDoListEdit from './components/ToDoListEdit/ToDoListEdit';
import AppBody from './components/AppBody/AppBody';
import Text from './components/common/Text/Text';
function App() {

  const [tasksList, setTasksList] = useState<any[]>([]) 
  // Массив tasksList со списком задач, нужен для удобства манипулирования элементами списка в процессе создания, редактирования, удаления, поиска и т.д
  // Массив состоит из объектов, со свойствами соответствующими каждому элементу списка
  const [toDoItems, setToDoItems] = useState<HTMLCollectionOf<HTMLDivElement>>(document.getElementsByClassName('to-do-item') as HTMLCollectionOf<HTMLDivElement>)
  const [editItems, setEditItems] = useState<HTMLCollectionOf<HTMLDivElement>>(document.getElementsByClassName('edit-item-container') as HTMLCollectionOf<HTMLDivElement>)


  useEffect(()=>{
    tasksList.forEach((task, index)=>{task.toDoElement = toDoItems[index]; task.editElement = editItems[index]})
    if(tasksList[3]) console.log(tasksList[3].message!)
    
  })

  return (
    //Разбиение проекта на компоненты, структура приложения выглядит следующим образом:
    <div className="App">
      <div className="app-container">
        <AppHeader> 
          <Text className = 'app-title' textType = 'title' inner = 'To-do list App'/>
        </AppHeader>
        <AppBody>
          <AppTop>
            <AddToDoForm tasksList = {tasksList} setTasksList = {setTasksList}/>
            <SearchToDoForm tasksList = {tasksList}/>
          </AppTop>
          <AppBottom>
            <ToDoList tasksList = {tasksList} setTasksList = {setTasksList}/>
            <ToDoListEdit tasksList = {tasksList} setTasksList = {setTasksList}/>
          </AppBottom>
        </AppBody> 
      </div>
    </div>
    // Логика добавления задач реализована в компоненте <AddToDoForm/>+
    // Логика поиска задач по названию реализована в компоненте <SearchToDoForm/>+
    // Логика взаимодействия со списком задач(удаление, редактирование, установка статуса) реализована в компоненте <EditItem/>
    // Логика изменения размера окна списка задач реализована в компоненте <ToDoList/>
  );
}

export default App;
