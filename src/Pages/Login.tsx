import React from 'react'
import * as Yup from "yup";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../Context/useAuth';
type Props = {}

type LoginFormsInputs= {
    username:string;
    password:string;
};

const validation = Yup.object().shape( {
    username:Yup.string().required("username is required"),
    password:Yup.string().required("Password is required"),
})
const Login = (props: Props) => {

    const {loginUser} = useAuth();

    const {
        register,

        handleSubmit,
        formState: { errors },
      } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });
    
    
    const handleLogin = (form: LoginFormsInputs) => {
        loginUser(form.username, form.password);
      }; 
      
      
      return (
        <section className="bg-gray-50  text-red">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow  md:mb-20 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleLogin)}>
                <div>
                <div className="flex items-center justify-between mb-2">

                  <label
                    htmlFor="username"
                    className="block  text-sm font-medium text-gray-900 "
                  >
                    username
                  </label>
                  {errors.username ? <p className='text-red-500 font-semibold'> {errors.username.message}</p> : "" }
                  </div>

                  <input
                    type="text"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                    placeholder="username"
                    {...register("username")}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block  text-sm font-medium text-gray-900 "
                  >
                    Password
                  </label>
                {errors.password ? <p className='text-red-500 font-semibold'> {errors.password.message}</p> : "" }

                  </div>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5   :placeholder-gray-400 "
                    {...register("password")}
                />

                </div>
                
              <div className="flex justify-center items-center">

              <button
                  type="submit"
                  className="px-4 py-2 font-bold rounded bg-slate-500 bg-lightGreen hover:opacity-80">
                
                  Sign in
                </button>
              </div>
               
              </form>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Login