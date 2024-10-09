import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { Password } from '@mui/icons-material';


const Login = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false)

    const [inputData, setInputData] = useState({
        email: '',
        password: '',
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({
            ...inputData,
            [name]: value,
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("signUpData"));
        const loggedUser = users?.find(user =>
            user.email === inputData.email && user.password === inputData.password
        );

        if (!inputData.email || !inputData.password) {
            return;
        }
        else if (loggedUser) {
            navigate("/todo");
        } 
        else {
            setOpen(true)
        }
    }


  const handleClose = () =>{
    setOpen(false)
  }

    return (
        <div className='flex justify-center items-center h-screen bg-[#f1f0f0]'>
            <div>
                <h2 className='text-5xl text-center mb-5 font-medium'>Login</h2>
                <form method='post' onSubmit={handleLogin} className=' mx-auto bg-white py-3 px-5 rounded-[5px] shadow' >
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={inputData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        name="password"
                        label="Enter password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={inputData.password}
                        onChange={handleChange}
                    />
                    <div>
                        <Button variant="contained" type="submit" className='my-3 w-full'>Login</Button>
                        <div className='flex items-center justify-center '>
                            <p className='mr-1 '>Don't have an account ?</p>
                            <Link to="/signup" className='cursor-pointer text-blue-500'>Sign Up</Link>
                        </div>
                    </div>
                </form>
            </div>


            <Snackbar open={open} anchorOrigin={{horizontal:'right', vertical:'top'}} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Invalid email or password!
                </Alert>
            </Snackbar>
        </div >
    )
}

export default Login
