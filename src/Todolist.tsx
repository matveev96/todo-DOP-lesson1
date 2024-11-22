import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TasksType} from './App';
import {Button} from "./components/Button";



type PropsType = {
    id: number
    title: string
    tasks: Array<TasksType>
    students: Array<string>
    removeTask: (taskId: string, todolistId: number) => void
    changeFilter: (value: FilterValuesType, todolistId: number) => void
    addTask: (title: string, todolistId: number) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: number) => void
    removeTodolist: (id: number) => void
    filter: FilterValuesType
    removeAllTasksInOneTodo: (todolistId: number) => void
  }

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            // addTask();
        }
    }

    const removeTodolistHandler = ()=> {
        props.removeTodolist(props.id)
    }

    const addTaskHandler = () => {
        props.addTask(title, props.id)
    }

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId, props.id )
    }

    const changeFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value, props.id )
    }

    const removeAllTasksInOneTodoHandler = () => {
        props.removeAllTasksInOneTodo(props.id)
    }




    return <div>
        <h3> {props.title}
            <Button onClick={removeTodolistHandler} title={'x'}/>
        </h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button onClick={addTaskHandler} title={'+'}/>
            {error && <div className="error-message">{error}</div>}

        </div>
        <Button title={'removeAllTasksInOneTodo'} onClick={removeAllTasksInOneTodoHandler} />
      
        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.taskId, newIsDoneValue, props.id);
                    }

                    return <li key={t.taskId} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button onClick={() => {removeTaskHandler(t.taskId)}} title={'x'} />
                    </li>
                })
            }
        </ul>
        <div>
            <Button onClick={()=> changeFilterHandler('all')} title={'All'}/>
            <Button onClick={()=> changeFilterHandler('active')} title={'Active'}/>
            <Button onClick={()=> changeFilterHandler('completed')} title={'Completed'}/>
        </div>
        <p></p>
        {
            props.students.map((el) => {
                return (
                    <div>{el}</div>
                )
            })
        }
    </div>
}


