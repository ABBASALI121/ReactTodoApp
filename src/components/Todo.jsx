import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { validateEmail } from '../utils/common'
import FormDialog from './FormDialog'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, MenuItem, Select } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CssBaseline from '@mui/material/CssBaseline';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';

const getLocalItems = () => {
  let todos = localStorage.getItem('todo');
  if (todos) {
    return JSON.parse(localStorage.getItem('todo'));
  } else {
    return [];
  }
};

const Todo = () => {

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

  const [todo, setTodo] = useState(getLocalItems())
  const [isUpdateFormToggel, setIsUpdateFormToggel] = useState("");
  const [editDataId, setEditDataId] = useState(null);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteMoal, setDeleteMoal] = useState(false);
  const [themeType, setThemeType] = useState('light');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    errors: {
      name: '',
      email: ''
    }
  })


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#90caf9' },
    },
  });
  
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#1976d2' },
    },
  });
  
  const blueTheme = createTheme({
    palette: {
      mode: 'light', 
      primary: { main: '#2196f3' }, 
      background: {
        default: '#e3f2fd', 
        paper: '#bbdefb', 
      },
      text: {
        primary: '#0d47a1',  
        secondary: '#1565c0', 
      }
    },
  });

  const purpleTheme = createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#9c27b0' },  
      secondary: { main: '#ff4081' }, 
      background: {
        default: '#f3e5f5',  
        paper: '#e1bee7',  
      },
      text: {
        primary: '#4a148c',  
        secondary: '#6a1b9a',
      }
    },
  });


  const handleThemeChange = (event) => {
    setThemeType(event.target.value);
  };
  const theme = themeType === 'dark' ? darkTheme : themeType === 'blue' ? blueTheme : themeType === 'purple' ? purpleTheme : lightTheme;


  const formValidation = (name, value) => {
    return new Promise(async (resolve) => {
      if (!name) {
        return resolve("name parameter is missing")
      }

      switch (name) {
        case "name":
          return resolve(value ? "" : "Name is required!")

        case "email":
          if (!value) {
            return resolve("Email is required!")
          }

          if (!await validateEmail(value)) {
            return resolve("Email is Not valid!")
          }

          return resolve("")

        default:
          return resolve("Something went wrong!")
      }
    })

  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    const valid = await formValidation(name, value);
    setFormData({
      ...formData,
      [name]: value,
      errors: {
        ...formData.errors,
        [name]: valid
      }
    })
    // console.log(formData);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = formData
    let errors = { ...formData.errors };
    const form = new FormData(e.target)

    for (let [name, value] of form.entries()) {
      const valid = await formValidation(name, value);
      errors[name] = valid
    }

    setFormData({
      ...formData,
      errors: errors
    })

    if (errors.name || errors.email) {
      return;
    }

    if (editDataId) {
      setTodo(
        todo.map((elem) => {
          if (elem.id === editDataId) {
            return { ...elem, name: name, email: email }
          }
          return elem;
        })
      )
      setEditDataId(null)
      setIsUpdateFormToggel(false)
    } else {
      setTodo((prev) => [{ id: uuidv4(), name, email }, ...prev]);
    }

    setFormData({
      name: '',
      email: '',
      errors: {
        name: '',
        email: ''
      }
    });
    setOpen(false)
  }

  const handleEdit = (id) => {
    const findItem = todo.find((item) => item.id === id);

    if (!findItem) {
      return;
    }
    setFormData({
      name: findItem.name,
      email: findItem.email,
      errors: {
        name: '',
        email: ''
      }
    });

    setIsUpdateFormToggel(true);
    setEditDataId(id)
    setOpen(true)
  }

  const handleDelete = () => {
    const filteredData = todo.filter((item) => item.id !== deleteItemId);
    setTodo(filteredData);
    setDeleteMoal(false)
    setDeleteItemId(null)
  }

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo));
  }, [todo]);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='flex items-end justify-between my-3 px-5'>
        <h2 className='text-4xl text-blue-800'>User</h2>

        <div className='flex items-center gap-3'>
          <Button variant="contained" onClick={handleClickOpen}>
            Add User
          </Button>
          <Select value={themeType} onChange={handleThemeChange}>
            <MenuItem value="light">Light Theme</MenuItem>
            <MenuItem value="dark">Dark Theme</MenuItem>
            <MenuItem value="blue">Blue Theme</MenuItem>
            <MenuItem value="purple">Purple Theme</MenuItem>
          </Select>
        </div>
      </div>

      <FormDialog
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
              todo.map((item, index) => {
                return (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">{item.name}</StyledTableCell>
                    <StyledTableCell align="center">{item.email}</StyledTableCell>
                    <StyledTableCell>
                      <div className='flex justify-center items-center gap-3'>
                        <Button variant="contained" color='success' onClick={() => handleEdit(item.id)} >
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
    </ThemeProvider>
  )
}

export default Todo
