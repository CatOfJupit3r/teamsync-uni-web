export interface UserOnProject {
    userId: string
    role: 'owner' | 'manager' | 'participant' | 'viewer'
    name: string
}

export interface TaskModel {
    name: string
    description: string
    dueDate: string
    completed: boolean
    responsibleUsers: Array<string>
    _id: string
}


export interface ProjectInfo {
    name: string
    description: string
    createdAt: string
    role: 'owner' | 'manager' | 'participant' | 'viewer'
    users: Array<UserOnProject>
    tasks: Array<TaskModel>
}