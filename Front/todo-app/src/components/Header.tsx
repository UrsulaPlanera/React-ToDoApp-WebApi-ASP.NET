import React from "react";
import { CreateTodo } from "./CreateTodo";
import { TodoTitle } from "../Types";

interface Props{
    onAddTodo: ({title}: TodoTitle) => void
}

export const Header: React.FC<Props> = ({ onAddTodo }) =>{
    return (
        <header className="header">
            <h1>
                todo
                <img style={{ width: '60px', height: 'auto' }} src="https://cdn-icons-png.flaticon.com/512/5968/5968566.png" />
            </h1>

            <CreateTodo
                saveTodo={onAddTodo}
                />
        </header>
    )
}