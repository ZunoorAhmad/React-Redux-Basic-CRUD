import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../redux/UserReducer';

const UpdateComponent = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
    const users = useSelector((state) => state.users);
    console.log(users);
    console.log(typeof (id))
    const existingUser = users.find(ele => ele.id === Number(id));
    console.log(existingUser)
    const [uname, setName] = useState(existingUser ? existingUser.name : '');
    const [uemail, setEmail] = useState(existingUser ? existingUser.email : '');
    console.log(existingUser);
    const handleUpdate = (event) => {
        console.log(event);
        event.preventDefault();
        dispatch(updateUser({ id: existingUser.id, name: uname, email: uemail }));

        navigate('/')
    }

    return (
        <div className='d-flex w-60 vh-50 justify-content-center align-items-center mt-5'>
            <div className=' border bg-secondary text-white p-5'>
                <h3 className='text_color'>Update User</h3>
                <form onSubmit={handleUpdate}>
                    <div>

                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            name='name'
                            value={uname}
                            className='form-control'
                            placeholder='Enter name'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input
                            type='email'
                            name='email'
                            value={uemail}
                            className='form-control'
                            placeholder='Enter email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <br />
                    <button className='btn btn-primary'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateComponent