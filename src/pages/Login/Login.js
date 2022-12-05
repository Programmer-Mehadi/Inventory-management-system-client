import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { AuthContext } from '../../contexts/AuthProvider';
import useValidation from '../../Hooks/useValidation';
const Login = () => {
    const { user, loading, setUser } = useContext(AuthContext);
    const [check, setCheck] = useState(false);
    const navigate = useNavigate();
    const [email] = useValidation();
    if (loading) {
        <Loading></Loading>
    }
    useEffect(() => {
        setUser(email)
        if (email || user) {
        
             navigate('/dashboard/addproduct')
        }

    }, [user, check])

    const [error, setError] = useState(null);
    const [data, setData] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm();
    const handleSignup = (data) => {
        axios.post('http://localhost:5000/user/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: data
        })
            .then(d => {
                if (d.data.token) {
                    localStorage.setItem('jwt', `${d.data.token}`);
                }
                toast.success(d.data.message);
                setCheck(!check)
                navigate('/', { replace: true });

            })
    }

    return (
        <div className='pb-10'>
            <h2 className='font-bold text-2xl text-center py-5' >Login</h2>
            <div className="">
                <div className="card max-w-[500px] w-[90%] mx-auto shadow-2xl bg-base-100 ">
                    <form onSubmit={handleSubmit(handleSignup)} className="card-body">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered"  {...register("email", { required: "Email is required" })} />
                            {
                                errors.email && <p className='text-red-500 my-1'>{errors.email.message}*</p>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered"  {...register("password", {
                                required: "Password is required", minLength: 6
                            })} />
                            {
                                errors.password && <p className='text-red-500 my-1'>{errors.password.message}</p>
                            }
                            {errors.password && errors.password.type === "minLength" && <p className='text-red-500 my-1'>Password length atleast 6 characters.</p>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Login;