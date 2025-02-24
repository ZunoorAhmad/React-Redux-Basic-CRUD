import React, { useState } from 'react'
import { createUser } from '../redux/UserReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from './ToastContext';

const CreateComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users);
    const navigate = useNavigate();
    const showToast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(createUser({ id: users.users.length > 0 ? users.users[users.users.length - 1].id + 1 : 1, name, email })).unwrap();
            showToast("User Created Successfully!", "success");
        } catch (error) {
            showToast("Failed to create user!", "error");
        }
        navigate('/');
    }

    return (
        <div className='d-flex vh-50 justify-content-center align-item-center mt-5'>
            <div className='w-90 border bg-secondary text-white p-5'>
                <h3 className='text_color'>Add New User</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' name='name' className='form-control' placeholder='Enter name' onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' name='email' className='form-control' placeholder='Enter email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <br />
                    <button className='btn btn-primary'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateComponent