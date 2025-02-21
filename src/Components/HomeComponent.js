import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers } from '../redux/UserReducer';
import ChildComponent from './ChildComponent';
import { Audio } from 'react-loader-spinner';

const HomeComponent = () => {
    const [booleanState, setBooleanState] = useState(false);
    const { users, loading } = useSelector((state) => state.users);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedId] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    useEffect(() => {
        setFilteredUsers(users);
    }, [users]);

    const handleDelete = (userId) => {
        dispatch(deleteUser(userId));
    }

    const filterUsers = (e) => {
        const userInput = e.target.value;
        const usersToShow = users.filter((ele) => ele.name.includes(userInput) || ele.email.includes(userInput));
        setFilteredUsers(usersToShow);
    }

    if (loading) {
        return <>
            <div className="loader">
                <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="three-dots-loading"
                    wrapperStyle
                    wrapperClass
                />
            </div>
        </>
    }

    return (
        <>
            <div>HomeComponent</div><div className='container' style={{ marginTop: '2rem' }}>
                <h2 className='mb-5'>Simple Crud App With Redux</h2>
                <Link to="/create" className='btn btn-primary my-3 p-3 '>Create +</Link>
                <div className="input-group mb-3">
                    <input onChange={(event) => filterUsers(event)} type="text" className="form-control" placeholder="Search By name or email" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
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
                        {filteredUsers.length > 0 && filteredUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link to={`/edit/${user.id}`} className='btn btn-sm btn-primary'>Edit</Link>
                                    <button onClick={() => setSelectedId(user)} type="button" className="btn btn-danger"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h1>Boolean Value in Parent Component : {booleanState.toString()}</h1>
            <ChildComponent boolVariable={booleanState} setBooleanVariable={setBooleanState} />
            <button className="btn btn-primary" onClick={() => setBooleanState(true)}>Set Boolean State to True</button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Deletion Confirmation!</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete ({selectedUser.name}) user
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={() => handleDelete(selectedUser.id)} data-bs-dismiss="modal" className="btn btn-primary">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeComponent