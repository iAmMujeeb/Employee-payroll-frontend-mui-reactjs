import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Container, FormGroup, Typography } from '@mui/material';
import './emp-dashboard.scss'
import { useEffect, useState } from 'react';
import EmployeeService from '../../service/emp-service';
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse 1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import Delete from '../../assets/icons/delete-black-18dp.svg';
import Edit from '../../assets/icons/create-black-18dp.svg';
import Add from '../../assets/icons/add-24px.svg';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';

const EmpDashboard = () => {

    const navigate = useNavigate();

    const Update = (id) => {
        navigate(`editcontact/${id}`);
        console.log(id);
    };

    const [rows, setRows] = useState([]);

    useEffect(() => {

        EmployeeService.getEmployee()
            .then((response) => {
                setRows(response.data.data)
            })
    }, []);

    const remove = (id) => {
        console.log(id);
        var answer = window.confirm("Data once deleted cannot be restored!! Do you wish to continue ?");
        if (answer === true) {
            EmployeeService.deleteEmployeeById(id)
                .then((data) => {
                    alert("Contact deleted successfully!!");
                    window.location.reload();
                })
                .catch((error) => {
                    toast.error("Something went wrong!", error);
                })
        } else {
            alert("Contact Not Deleted!");
        }
    };

    return (
        <div>
        <div className="formhead" style={{width:'100%', marginTop:'2%', marginBottom:'2%'}} >
        <FormGroup row>
                <Typography sx={{marginLeft:'12.5%'}} variant='h4'>
                    EMPLOYEE DETAILS
                </Typography>
                <Button href='payrollform' sx={{marginLeft:'44%'}} variant="contained">Add Person</Button>
            </FormGroup>
        </div>
        <Container>
            <TableContainer>
                <Table>
                    <TableRow stickyHeader aria-label="sticky table" sx={{ backgroundColor: 'black', color: 'white' }}>
                        <TableCell component="th" >PROFILE PIC</TableCell>
                        <TableCell component="th" >NAME</TableCell>
                        <TableCell component="th" >GENDER</TableCell>
                        <TableCell component="th" >DEPARTMENT</TableCell>
                        <TableCell component="th" >SALARY</TableCell>
                        <TableCell component="th" >START DATE</TableCell>
                        <TableCell component="th" >ACTIONS</TableCell>
                    </TableRow>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="td" >
                                    {<img src=
                                        {row.profileUrl === '../../assets/profile-images/Ellipse -3.png' ? profile1 :
                                            row.profileUrl === '../../assets/profile-images/Ellipse 1.png' ? profile2 :
                                                row.profileUrl === '../../assets/profile-images/Ellipse -8.png' ? profile3 :
                                                    profile4
                                        } alt="" />}
                                </TableCell>
                                <TableCell component="td" >{row.name}</TableCell>
                                <TableCell component="td" >{row.gender}</TableCell>
                                <TableCell component="td" >
                                    {(row.departments).map((department) => department).join(', ')}
                                </TableCell>
                                <TableCell component="td" >{row.salary}</TableCell>
                                <TableCell component="td" >{row.startDate}</TableCell>
                                <TableCell component="td" >
                                    <IconButton component="td" onClick={() => remove(row.id)} >
                                        <img src={Delete} alt="delete" />
                                    </IconButton>
                                    <IconButton onClick={() => Update(row.id)}>
                                        <img src={Edit} alt="edit" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
        </div>
    )
}

export default EmpDashboard;
