import React, { useCallback } from 'react'
import { TaskModel } from '../../../models/APIModels'

const TaskList = ({ tasks }: { tasks: Array<TaskModel> }) => {
    const Task = useCallback(({ task }: { task: TaskModel }) => {
        return (
            <li style={{
                border: '0.125rem solid #000',
                borderRadius: '0.5rem',
                borderBottom: '0.5rem solid #000',
                padding: '0.5rem',
            }}>
                <p>Title: {task.name}</p>
                <p>Description: {task.description}</p>
                <p>Due to: {(task.dueDate && new Date(task.dueDate).toLocaleString()) || '???'}</p>
                <p>{task.completed ? 'Completed ✅' : 'Not completed ❌'}</p>
                <p>Responsible users: {task.responsibleUsers.join(', ')}</p>
            </li>
        )
    }, [])

    return (
        <div style={{
            border: '0.125rem solid #000',
            borderRadius: '0.5rem',
            borderBottom: '0.5rem solid #000',
            padding: '0.5rem',

       }}>
            {tasks.length > 0 ? (
                <ol style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                }}>
                    {tasks.map((task, index) => (
                        <Task task={task} key={index} />
                    ))}
                </ol>
            ) : (
                <p>No tasks available.</p>
            )}
        </div>
    )
}

export default TaskList
