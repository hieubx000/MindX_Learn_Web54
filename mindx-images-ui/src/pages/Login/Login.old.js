import React from 'react'
import { AuthLayout } from "../../components/Layout"
import request from '../../api/request'

export default function Login() {
    // const [username, setUsername] = React.useState("");
    // const [password, setPassword] = React.useState("");

    // const handleChangeUsername = (e) => {
    //     const {value} = e.target
    //     setUsername(value)
    // }
    // const handleChangePassword = (e) => {
    //     const {value} = e.target
    //     setPassword(value)
    // }
    const [formState, setFormState] = React.useState({
        username: "",
        password: ""
    })
    const [errors, setErrors] = React.useState({
        username: "",
        password: ""
    })

    const [submited, setSubmited] = React.useState(false)
    const inputRef = React.useRef()

    React.useEffect(() => {
        if(!formState.username && submited){
            setErrors(prevError => ({
                ...prevError,
                username: "username is required"
            }))
        }
        else{
            setErrors(prevError => ({
                ...prevError,
                username: ""
            }))
        }
    }, [formState.username, submited])

     const handleChangeForm = e => {
         const {value,name} = e.target;

         setFormState(prevState => {
             return {
                ...prevState,
                [name]: value
             }     
         })
     }

    const handleSubmitForm = async e => {
        e.preventDefault();
        alert(inputRef.current.value)
        // setSubmited(true)
        

        // const {username, password} = formState;
        // try {
        //     const res = await request({
        //         url: 'auth/login',
        //         method: "POST",
        //         data: {
        //             username, password
        //         }
        //     })
        //     console.log(res);
        // } catch (err) {
        //     console.log(err);
        // }
    }
    console.log("render");

    return (
        <AuthLayout>
            <div className='border p-3' style={{width: 500}}>
                <h1>MindX Form</h1>
                <form onSubmit={handleSubmitForm}>
                    <div className="mb-3">
                        <label htmlFor="test" class="form-label">test</label>
                        <input 
                        type="text"
                        defaultValue="test"
                        ref={inputRef}
                        class="form-control" 
                        id="test" 
                        name='test'
                        ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" class="form-label">Email</label>
                        <input 
                        type="text"
                        value={formState.username} 
                        onChange={handleChangeForm}
                        class="form-control" 
                        id="username" 
                        name='username'
                        ></input>
                        {errors.username && <p style={{color: "red"}}>{errors.username}</p>}
                        {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" class="form-label">Password</label>
                        <input 
                        type="password" 
                        class="form-control" 
                        id="password"
                        value={formState.password}
                        onChange={handleChangeForm}
                        name='password'
                        ></input>
                    </div>

                    <button type="submit" class="btn btn-primary" disabled={!inputRef.current?.value}>Submit</button>
                </form>
            </div>
        </AuthLayout>
    )
}
