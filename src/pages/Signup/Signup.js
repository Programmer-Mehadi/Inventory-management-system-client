import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { AuthContext } from "../../contexts/AuthProvider";
const Signup = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  if (loading) {
    <Loading></Loading>;
  }
  useEffect(() => {
    if (user) {
      navigate("/dashboard/addproduct");
    }
  }, [user]);
  const [error, setError] = useState(null);
  const [data, setData] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const handleSignup = (data) => {
    console.log(data);
    let img = data.image[0];
    setError(null);

    if (data.confirmpassword !== data.password) {
      setError("Password and confirm password must be same*");
    } else {
      const formData = new FormData();
      let imgUrl = "";
      formData.append("image", img);

      fetch("http://localhost:5000/user/imageupload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((d) => {
          console.log(d);
          data.image = d.path;
          fetch("http://localhost:5000/user", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((value) => {
              if (value.acknowledged) {
                toast.success(value.message);
                navigate("/login");
              } else {
                toast.success(value.message);
              }
            });
        });
    }
  };

  return (
    <div className="pb-10">
      <h2 className="font-bold text-2xl text-center py-5">Signup</h2>
      <div className="">
        <div className="card max-w-[500px] w-[90%] mx-auto shadow-2xl bg-base-100 ">
          <form onSubmit={handleSubmit(handleSignup)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 my-1">{errors.name.message}*</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 my-1">{errors.email.message}*</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", {
                  required: "Password is required",
                  minLength: 6,
                })}
              />
              {errors.password && (
                <p className="text-red-500 my-1">{errors.password.message}</p>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <p className="text-red-500 my-1">
                  Password length atleast 6 characters.
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("confirmpassword", {
                  required: "Confirm Password is required",
                  minLength: 6,
                })}
              />
              {errors.confirmpassword && (
                <p className="text-red-500 my-1">
                  {errors.confirmpassword.message}
                </p>
              )}
              {errors.confirmpassword &&
                errors.confirmpassword.type === "minLength" && (
                  <p className="text-red-500 my-1">
                    Confirm Password length atleast 6 characters.
                  </p>
                )}
              {error && <p className="text-red-500 my-1">{error}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Profile Image</span>
              </label>
              <input
                type="file"
                className="input ml-0 pl-0"
                {...register("image", { required: "Image is required" })}
              />
              {errors.image && (
                <p className="text-red-500 my-1">{errors.image.message}*</p>
              )}
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Signup</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
