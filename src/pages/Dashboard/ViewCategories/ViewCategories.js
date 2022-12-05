import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const ViewCategories = () => {

    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [refetch, setRefetch] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState(null);
    const [data, setData] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm();

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [refetch])


    const deleteProduct = (id) => {

        fetch(`http://localhost:5000/categories/delete?id=${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(value => {
                if (value.deletedCount > 0) {
                    toast.success('category and product delete successfully!');
                    setRefetch(!refetch)
                }
            })
    }
    const handleAdd = (data) => {
        fetch(`http://localhost:5000/categories/add`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(value => {
                setRefetch(!refetch)
                if (value.deletedCount > 0) {
                    toast.success('category and product delete successfully!');
                   
                }
            })

    }

    return (
        <div className='py-10'>
            <h2 className='font-bold text-2xl text-center py-10' >All Categories</h2>
            <div>
                <div className="">
                    <div className="card max-w-[700px] mx-auto w-[90%] shadow-2xl bg-base-100 ">
                        <form onSubmit={handleSubmit(handleAdd)} className="card-body flex flex-row justify-between items-end">
                            <div className="form-control flex-1 w-100">
                                <label className="label">
                                    <span className="label-text">Select Categories</span>
                                </label>
                                <input type='text' className="input select-bordered w-100" {...register("name", { required: "Name is required" })} />
                                {
                                    errors.name && <p className='text-red-500 my-1'>{errors.name.message}*</p>
                                }
                            </div>

                            <div className="form-control w-fit ">
                                <button className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <div className=' py-3 w-[90%] mx-auto'>
                    <div className="overflow-x-auto">
                        {
                            categories?.length == 0 ? <p className='text-2xl font-semibold text-center'>No categories found.</p>
                                :
                                <table className="table table-zebra w-full">

                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Operation</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            categories?.map((category, index) =>
                                                <tr key={category._id}>
                                                    <th>{index + 1}</th>
                                                    <td>{category.name}</td>
                                                    <td>
                                                        <button className='btn btn-sm text-red-700 bg-red-300' onClick={() => deleteProduct(category._id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                        }
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ViewCategories;