import {useCallback, useState} from "react";
import APIService from "../../services/APIService";
import {UserOnProject} from "../../models/APIModels";

const CreateNewTask = ({projectId, users}: {projectId: string, users: Array<UserOnProject>}) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [taskName, setTaskName] = useState('')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [taskDescription, setTaskDescription] = useState('')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [taskDueDate, setTaskDueDate] = useState('')
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [taskResponsibleUsers, setTaskResponsibleUsers] = useState('')

    const createTask = async () => {
        try{
            await APIService.createTask(projectId, {
                name: taskName,
                description: taskDescription,
                dueDate: taskDueDate,
                assignee: taskResponsibleUsers
            })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div style={{
            border: '0.125rem solid #000',
            borderRadius: '0.5rem',
            borderBottom: '0.5rem solid #000',
            padding: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
        }}>
            <h3>Create new task</h3>
            <input
                type="text"
                placeholder="Task name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />
            <textarea
                placeholder="Task description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
            />
            <input
                type="date"
                placeholder="Due date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
            />
            <select
                value={taskResponsibleUsers}
                onChange={(e) => setTaskResponsibleUsers(e.target.value)}
            >
                {users.map((user) => (
                    <option key={user.userId} value={user.userId}>
                        {user.name}
                    </option>
                ))}
            </select>
            <button onClick={createTask}>Create task</button>
        </div>
    )
}


export default CreateNewTask