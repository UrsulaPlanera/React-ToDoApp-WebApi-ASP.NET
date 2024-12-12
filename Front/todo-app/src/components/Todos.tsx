import React from "react"
import { ListOfTodos, TodoId, type Todo as TodoType } from "../Types"
import { Todo } from "./Todo"

interface Props{
    todos: ListOfTodos
    onToggleTodoCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
    onRemoveTodos: (id: TodoId) => void
}

export const Todos : React.FC<Props> = ({ todos, onRemoveTodos, onToggleTodoCompleted }) => {
    return (
        <ul className="todo-list">
            {
                todos.map(todo => (
                <li key={todo.id} className={`${todo.completed ? 'completed' : ''}`}>
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        onRemoveTodos={onRemoveTodos}
                        onToggleTodoCompleted = { onToggleTodoCompleted }
                    />
                </li>
            ))}
        </ul>
    )
}