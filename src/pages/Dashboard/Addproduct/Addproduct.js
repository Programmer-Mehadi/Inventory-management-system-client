import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const Addproduct = () => {

    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState(null);
    const [data, setData] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm();

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
    }, [])

    const handleAddProduct = (data) => {

        let img = data.image[0];
        setError(null);
        data['email'] = user;
        const formData = new FormData();
        let imgUrl = '';
        formData.append('image', img);

        fetch('http://localhost:5000/product/imageupload', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(d => {

                data.image = d.path;
                fetch('http://localhost:5000/product', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then(value => {
                        if (value.acknowledged) {
                            toast.success(value.message);
                            navigate('/dashboard/viewbysort');
                        }
                        else {
                            toast.success(value.message)
                        }
                    })
            })
    }
    return (
        <div className='py-10'>
            <h2 className='font-bold text-2xl text-center py-10' >Add Product</h2>
            <div>
                <div className="">
                    <div className="card max-w-[700px] mx-auto w-[90%] shadow-2xl bg-base-100 ">
                        <form onSubmit={handleSubmit(handleAddProduct)} className="card-body ">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input type="text" placeholder="name" className="input input-bordered"  {...register("name", { required: "Name is required" })} />
                                {
                                    errors.name && <p className='text-red-500 my-1'>{errors.name.message}*</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input type="number" placeholder="price" className="input input-bordered"  {...register("price", { required: "Price is required" })} />
                                {
                                    errors.price && <p className='text-red-500 my-1'>{errors.price.message}*</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Select Categories</span>
                                </label>
                                <select className="select select-bordered w-full" {...register("categoryId", { required: "Category is required" })}>
                                    {
                                        categories?.map(category =>
                                            <option value={category._id} key={category._id}>{category.name}</option>
                                        )
                                    }
                                </select>
                                {
                                    errors.categoryId && <p className='text-red-500 my-1'>{errors.categoryId.message}*</p>
                                }
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Image</span>
                                </label>
                                <input type="file" className="input ml-0 pl-0" {...register("image", { required: "Image is required" })} />
                                {
                                    errors.image && <p className='text-red-500 my-1'>{errors.image.message}*</p>
                                }
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Signup</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Addproduct;