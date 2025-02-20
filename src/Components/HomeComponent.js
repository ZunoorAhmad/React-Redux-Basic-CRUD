import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from '../redux/UserReducer';

const HomeComponent = () => {

    const users = useSelector((state) => state.users);
    const dispatch = useDispatch();
    console.log(users);

    const handleDelete = (userId) => {
        console.log(userId);

        dispatch(deleteUser({ id: userId }));

        console.log(userId);

    }

    return (
        <>
            <div>HomeComponent</div><div className='container' style={{ marginTop: '2rem' }}>
                <h2 className='mb-5'>Simple Crud App With Redux</h2>
                <Link to="/create" className='btn btn-primary my-3 p-3 '>Create +</Link>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link to={`/edit/${user.id}`} className='btn btn-sm btn-primary'>Edit</Link>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className='btn btn-sm btn-danger ms-2'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default HomeComponent