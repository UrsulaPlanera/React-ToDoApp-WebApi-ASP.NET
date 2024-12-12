import React from "react"
import { TodoId, Todo as TodoType } from "../Types"

interface Props extends TodoType{
    onToggleTodoCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
    onRemoveTodos: ({id}:TodoId) => void
}


export const Todo : React.FC<Props> = ({ id, title, completed, onRemoveTodos, onToggleTodoCompleted }) => {

    const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>): void => {
        onToggleTodoCompleted({
            id,
            completed: event.target.checked
        })
    }

    return (
        <div>
            <input
                className="toggle"
                checked={completed}
                type="checkbox"
                onChange={handleChangeCheckBox}
            />
            <label>{title}</label>
            <button
                className="destroy"
                onClick={() => {onRemoveTodos({id})}}
            />
        </div>
    )
}