import React, { useState } from 'react';

interface User {
  id: number;
  name: string;
}

function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>('');

  const handleAddUser = () => {
    if (name.trim() === '') {
      alert('Please enter a name');
      return;
    }

    const newUser: User = {
      id: users.length + 1,
      name
    };

    setUsers([...users, newUser]);
    setName('');
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div style={{padding: '20px'}}>
      <h2>Add User</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAddUser}>Add User</button>

      <h4>Users List</h4>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;