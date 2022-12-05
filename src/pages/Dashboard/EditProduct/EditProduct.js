import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';


const EditProduct = () => {
    const calue = useLoaderData();
    let productData = null;
    if (calue.length > 0) {
        productData = calue[0];
    }
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState(null);
    const [data, setData] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm();

    const handleEditProduct = (data) => {
        fetch(`http://localhost:5000/product/update?id=${productData._id}&&email=${user}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(value => {
                if (value.modifiedCount > 0) {
                    toast.success('Product update successfully!');
                }
                navigate('/dashboard/viewbysort');
            })
        
    }
    return (
        <div className='py-10'>
            <h2 className='font-bold text-2xl text-center py-10' >Edit Product</h2>
            <div>
                <div className="">
                    <div className="card max-w-[700px] mx-auto w-[90%] shadow-2xl bg-base-100 ">
                        <form onSubmit={handleSubmit(handleEditProduct)} className="card-body ">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Product Name</span>
                                </label>
                                <input defaultValue={productData.name} type="text" placeholder="name" className="input input-bordered"  {...register("name", { required: "Name is required" })} />
                                {
                                    errors.name && <p className='text-red-500 my-1'>{errors.name.message}*</p>
                                }
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Price</span>
                                </label>
                                <input type="number" placeholder="price" className="input input-bordered"  {...register("price", { required: "Price is required" })} defaultValue={productData.price} />
                                {
                                    errors.price && <p className='text-red-500 my-1'>{errors.price.message}*</p>
                                }
                            </div>

                            <div className="form-control mt-6">
                                <label className="label">
                                    <span className="label-text">Product Image</span>
                                </label>
                                <img className='w-40 h-40' src={`http://localhost:5000/${productData.image}`} alt="" />
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;