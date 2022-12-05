
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const ViewBySort = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState(null);
    const [data, setData] = useState('');
    const [searchData, setSearchData] = useState(null);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then(res => res.json())
            .then(data => {
                setCategories(data)
            })
    }, [])

    const handleSearch = (data) => {
        setSearchData(data);
        fetch(`http://localhost:5000/product/search?id=${data.categoryId}&&email=${user}`, {
            method: "GET"
        })
            .then(res => res.json())
            .then(value => {
                setProducts(value)
            })
    }
    const deleteProduct = (id) => {
        fetch(`http://localhost:5000/product/delete?id=${id}&&email=${user}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(value => {
                if (value.deletedCount > 0) {
                    toast.success('Product delete successfully!');
                    handleSearch(searchData);
                }
            })
    }
 
    return (
        <div className='py-10'>
            <h2 className='font-bold text-2xl text-center py-3' >View By Sort</h2>
            <div>
                <div className="">
                    <div className="card max-w-[700px] mx-auto w-[90%] shadow-2xl bg-base-100 ">
                        <form onSubmit={handleSubmit(handleSearch)} className="card-body flex flex-row justify-between items-end">
                            <div className="form-control flex-1 w-100">
                                <label className="label">
                                    <span className="label-text">Select Categories</span>
                                </label>
                                <select className="select select-bordered w-100" {...register("categoryId", { required: "Category is required" })}>
                                    <option selected disabled>Select any</option>
                                    {
                                        categories?.map(category =>
                                            <option value={category._id} key={category._id}>{category.name}</option>
                                        )
                                    }
                                    <option value='All'>All</option>
                                </select>
                                {
                                    errors.categoryId && <p className='text-red-500 my-1'>{errors.categoryId.message}*</p>
                                }
                            </div>

                            <div className="form-control w-fit ">
                                <button className="btn btn-primary">Show</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className=' py-3 w-[90%] mx-auto'>
                <div className="overflow-x-auto">
                    {
                        products === null || products?.length == 0 ? <p className='text-2xl font-semibold text-center'>No products found.</p>
                            :
                            <table className="table table-zebra w-full">

                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Operation</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        products?.map((product, index) =>
                                            <tr key={product._id}>
                                                <th>{index + 1}</th>
                                                <td><img className='w-14' src={`http://localhost:5000/${product.image}`} alt="" /></td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>
                                                    <button className='btn btn-sm text-red-700 bg-red-300' onClick={() => deleteProduct(product._id)}>Delete</button>
                                                    <Link to={`/dashboard/editproduct/${product._id}`}  className="btn text-green-700 bg-green-300 btn-sm ml-2">Update</Link>
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
    );
};

export default ViewBySort;