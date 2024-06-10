import { UserOnProject } from '../../../models/APIModels'

const UserList = ({ users }: { users: Array<UserOnProject> }) => {
    const User = ({ user }: { user: UserOnProject }) => {
        return (
            <p style={{
                border: '0.125rem solid #000',
                borderRadius: '0.5rem',
                borderBottom: '0.25rem solid #000',
                padding: '0.5rem',

            }}>
                {user.name}. Role: {user.role}
            </p>
        )
    }

    return (
        <div>
            {users.length > 0 ? (
                <div style={{
                    border: '0.125rem solid #000',
                    borderRadius: '0.5rem',
                    borderBottom: '0.4rem solid #000',
                    padding: '0.5rem',
                    fontSize: '18px',
                }}>
                    {users.map((user, index) => (
                        <User user={user} key={index} />
                    ))}
                </div>
            ) : (
                <p>No users available.</p>
            )}
        </div>
    )
}

export default UserList
