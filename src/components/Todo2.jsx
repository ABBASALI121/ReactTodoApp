import React, { useEffect, useState } from 'react'
import AddTodo from '../components/AddTodo'
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { addTodo, removeTodo, setTodos, updateTodo } from '../redux/todoSlice'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Todo2 = () => {


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const dispatch = useDispatch()
    const todos = useSelector((state) => state.todo.todos);
    const [open, setOpen] = useState(false);
    const [isUpdateFormToggel, setIsUpdateFormToggel] = useState("");
    const [deleteMoal, setDeleteMoal] = useState(false);
    const [editDataId, setEditDataId] = useState(null);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    })

    useEffect(() => {
        const storedTodos = localStorage.getItem('todoData');
        if (storedTodos) {
            dispatch(setTodos(JSON.parse(storedTodos)));
        }
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editDataId) {
            dispatch(updateTodo({ id: editDataId, ...formData }))
        } else {
            dispatch(addTodo(formData))
        }
        setFormData({
            name: '',
            email: '',
        });
        setEditDataId(null);
        setIsUpdateFormToggel(false);
        setOpen(false);
        setOpen(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
        // console.log(formData);
    }

    const handleClose = () => {
        setOpen(false);
        setEditDataId(null);
        setIsUpdateFormToggel(false);
        setFormData({ name: '', email: '' });
    };

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleEdit = (id) => {
        const todoToEdit = todos.find(todo => todo.id === id);
        if (todoToEdit) {
            setFormData({
                name: todoToEdit.name,
                email: todoToEdit.email,
            });
            setEditDataId(id);
            setIsUpdateFormToggel(true);
            setOpen(true);
        }
    }

    const handleDelete = () => {
        dispatch(removeTodo(deleteItemId));
        setDeleteMoal(false)
        setDeleteItemId(null)
    }

    useEffect(() => {
        localStorage.setItem('todoData', JSON.stringify(todos));
    }, [todos]);

    return (
        <div>
            <div className='flex items-end justify-between my-3 px-5'>
                <h2 className='text-4xl text-blue-800'>User</h2>

                <div className='flex items-center gap-3'>
                    <Button variant="contained" onClick={handleClickOpen}>
                        Add User
                    </Button>
                </div>
            </div>
            <AddTodo
                formData={formData}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleClose={handleClose}
                isUpdateFormToggel={isUpdateFormToggel}
                open={open}
            />
            <TableContainer component={Paper} sx={{ maxWidth: '75%', margin: '50px auto', }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            todos.map((item, index) => {
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell align="center">{item.name}</StyledTableCell>
                                        <StyledTableCell align="center">{item.email}</StyledTableCell>
                                        <StyledTableCell>
                                            <div className='flex justify-center items-center gap-3'>
                                                <Button variant="contained" color='success' onClick={() => handleEdit(item.id)}>
                                                    Edit
                                                </Button>
                                                <Button variant="contained" color='error' onClick={() => { setDeleteMoal(true), setDeleteItemId(item.id) }}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={deleteMoal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are You Sure To Delete ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className='flex justify-center'>
                        <Button onClick={handleDelete}>Yes</Button>
                        <Button onClick={() => setDeleteMoal(false)} >
                            No
                        </Button>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Todo2
