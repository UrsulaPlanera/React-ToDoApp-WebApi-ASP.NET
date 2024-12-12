import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'
import '../src/components/Todos'
import { Todos } from '../src/components/Todos'
import { FilterValue, Todo, TodoId, TodoTitle, type Todo as TodoType } from './Types'
import { TODO_FILTERS } from './consts'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import axios from 'axios'

const url = 'https://localhost:7262/api/ToDo'

const App : React.FC = () => {
  const [todos, setTodos] = useState<Array<Todo>>([])

  useEffect(()=> {
    filteredTodos(filterSelected);
  }, [])

  const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL) //se le agrega filter value para que useState "entienda" que lo que tiene no es un string, sino un filter value

  const handleRemove = async ({id} : TodoId) : Promise<void> => {
    await axios.delete(url + `/delete/${id}`)
    const newTodos = await axios.get(url + `/all`)
    setTodos(newTodos.data)
  }

  const handleRemoveAllCompleted = async (): Promise<void> => {
    await axios.delete(url + `/delete/completed`)
    filteredTodos(TODO_FILTERS.ALL)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
    filteredTodos(filter)
  }

  const filteredTodos = async (filter: FilterValue) : Promise<void> => {
    if(filter == TODO_FILTERS.ACTIVE) {
      const response = await axios.get(url + `/notcompleted`)
      console.log(response.data)
      if(response != null) {
        setTodos(response.data)
      }
    }
    else if(filter == TODO_FILTERS.COMPLETED) {
      const response = await axios.get(url + `/completed`)
      console.log(response.data)
      if(response != null) {
        setTodos(response.data)
      }
    }
    else{
      const response = await axios.get(url + `/all`)
      console.log(response.data)
      if(response != null) {
        setTodos(response.data)
      }
    }
  }

  const handleCompleted = async ({ id, completed } : Pick<TodoType, 'id' | 'completed'>): Promise<void> => {
    await axios.post(url + `/updateState/${id}%${completed}`)
    filteredTodos(TODO_FILTERS.ALL)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount


  const handleAddTodo = async ({title}: TodoTitle) : Promise<void> => {
    await axios.post(url + `/create/${title}`)
    filteredTodos(TODO_FILTERS.ALL)
  }

  return (
    <div className='todoapp'>
      <Header onAddTodo={handleAddTodo} />
      <Todos
        todos={ todos } //aca pasar filteredTodos
        onToggleTodoCompleted = { handleCompleted }
        onRemoveTodos={ handleRemove }
      />
      <Footer
      activeCount={activeCount}
      completedCount={completedCount}
      filterSelected={filterSelected}
      onClearCompleted={handleRemoveAllCompleted}
      handleFilterChange={handleFilterChange}
      />
    </div>
    
  )
}

export default App
