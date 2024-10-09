import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';



const SignUp = () => {

    const navigate = useNavigate();

    const [signUpData, setSignUpData] = useState(() => {
        const savedData = localStorage.getItem('signUpData');
        return savedData ? JSON.parse(savedData) : [];
    });
    const [inputData, setInputData] = useState({
        name: '',
        email: '',
        password: '',
        phonenumber: '',
        gender: '',
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({
            ...inputData,
            [name]: value,
        })
        // console.log(inputData); 
    }

    const handleSignUp = (e) => {
        e.preventDefault();
        const id = uuidv4()
        const { name, email, password, phonenumber, gender } = inputData

        if (!name || !email || !password || !phonenumber || !gender) {
            return;
        }

        setSignUpData((prev) => {
            const updatedData = [...prev, { id, name, email, password, phonenumber, gender }];
            localStorage.setItem('signUpData', JSON.stringify(updatedData));
            return updatedData;
        });

    
        setInputData({
            name: '',
            email: '',
            password: '',
            phonenumber: '',
            gender: '',
        });

        navigate("/")
    }

    return (
        <div className='flex justify-center items-center h-screen bg-[#f1f0f0]'>
            <div>
                <h2 className='text-5xl text-center mb-5 font-medium'>Sign Up</h2>
                <form method='post' onSubmit={handleSignUp} className='w-1/2 mx-auto bg-white py-3 px-5 rounded-[5px] shadow' >
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Enter Your Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={inputData.name}
                        onChange={handleChange}
                    />
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
                        id="phoneNumber"
                        name="phonenumber"
                        label="Enter Your Number"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={inputData.phonenumber}
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
                    <FormControl className='mt-4'>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={inputData.gender}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="male" name='gender' control={<Radio />} label="Male" />
                            <FormControlLabel value="female" name='gender' control={<Radio />} label="Female" />
                        </RadioGroup>
                    </FormControl>
                    <div>
                        <Button variant="contained" type="submit" className='my-3 w-full'>Sing Up</Button>
                        <div className='flex items-center justify-center '>
                            <p className='mr-1 '>Alredy have an account ?</p>
                            <Link to="/" className='cursor-pointer text-blue-500'>Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
