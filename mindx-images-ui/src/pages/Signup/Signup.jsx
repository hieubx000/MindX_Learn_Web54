import React from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout } from "../../components/Layout"
import request from '../../api/request'
import {useForm, useWatch} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";



const schema = yup.object({
    username: yup.string().email().required(),
    password: yup.string().required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, "Need uppercase, lowercase and number"),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'The passwords do not match')
}).required();

function SubmitButton({control}, errors){
    const formState = useWatch({control})
    const hasVal = !Object.keys(formState).some(key => !formState[key])
    
    const hasError = Object.keys(errors).length > 0
    const disabled = !hasVal || hasError;
    return (
        <button type="submit" class="btn btn-primary" disabled={disabled}>
            Submit
        </button>
    )
}

export default function Signup() {
    const password = React.useRef({});

    const { 
        register, 
        handleSubmit, 
        control,
        formState: { errors } } = useForm({
            resolver: yupResolver(schema)
        });

        const onSubmit = async data => {
            const {username, password} = data;
           try {
               const res = await request({
                   url: 'auth/signUp',
                   method: "POST",
                   data: {
                       username, password
                   }
               })
               console.log(res);
           } catch (err) {
               console.log(err);
           }
       }
       console.log(password.current);
    return (
        <AuthLayout>
            <div className='border p-3' style={{width: 500}}>
                <h1>SIGN UP</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className="mb-3">
                        <label htmlFor="username" class="form-label">Email</label>
                        <input 
                        type="text"
                        class={`form-control ${errors.username?.message ? 'is-invalid': ""}`}
                        id="username" 
                        name='username'
                        {...register("username", {required: true})}
                        ></input>
                        {errors.username?.message && <div className='invalid-feedback'>{errors.username?.message}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" class="form-label">Password</label>
                        <input 
                        type="password" 
                        class={`form-control ${errors.password?.message ? 'is-invalid': ""}`}
                        id="password"
                        name='password'
                        {...register("password", {required:true, minLength:6})}
      
                        ></input>
                        {/* cú pháp optional chaining */}
                         {errors.password?.message && <span style={{color: "red"}}>{errors.password?.message}</span>}
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" class="form-label">Confirm Password</label>
                        <input 
                        type="password" 
                        class={`form-control ${errors.confirmPassword?.message ? 'is-invalid': ""}`}
                        id="confirmPassword"
                        name='confirmPassword'
                        {...register("confirmPassword", {required:true})}
                        ></input>
                        {/* cú pháp optional chaining */}
                         {errors.confirmPassword?.message && <span style={{color: "red"}}>{errors.confirmPassword?.message}</span>}
                        
                    </div>
                    <SubmitButton control={control} errors={errors}/>
                    <div>
                         <Link className='btn btn-link' to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </AuthLayout>
    )
}


