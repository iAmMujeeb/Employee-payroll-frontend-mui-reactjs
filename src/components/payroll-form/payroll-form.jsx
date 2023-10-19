import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { FormControl, Checkbox, FormGroup, Slider, Box, Paper, CssBaseline, TextField, Button } from '@mui/material';
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse 1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import 'date-fns';
import './payroll-form.scss'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import EmployeeService from '../../service/emp-service';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";


const PayrollForm = (props) => {


    let initialValue = {
        name: '',
        profileArray: [
            { url: '../../assets/profile-images/Ellipse -3.png' },
            { url: '../../assets/profile-images/Ellipse 1.png' },
            { url: '../../assets/profile-images/Ellipse -8.png' },
            { url: '../../assets/profile-images/Ellipse -7.png' },
        ],
        allDepartment: [
            'HR', 'Sales', 'Finance', 'Engineer', 'Others'
        ],
        departmentValue: [],
        gender: '',
        salary: '',
        startDate: (dayjs('2022-04-17')),
        note: '',
        id: '',
        profileUrl: '',
        isUpdate: false,
        error: {
            department: '',
            name: '',
            gender: '',
            salary: '',
            profileUrl: '',
            startDate: ''
        }
    }

    const [formValue, setForm] = useState(initialValue);

    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getDataById(params.id);
        }
    }, [params.id]);

    const getDataById = (id) => {
        EmployeeService.getEmployeeById(id)
            .then((response) => {
                let object = response.data.data;
                setData(object);
            })
            .catch((error) => {
                alert("Error is", error)
            });
    };

    const setData = (object) => {
        console.log(object);
        setForm({
            ...formValue,
            ...object,
            id: object.id,
            name: object.name,
            departmentValue: object.departments,
            isUpdate: true,
            startDate: (dayjs(object.startDate, 'MM/DD/YYYY')),
            note: object.note,
            gender: object.gender,
            salary: object.salary,
            profileUrl: object.profileUrl,
        });
        console.log(formValue.startDate);
    };

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }

    const onCheckChange = (name) => {
        let index = formValue.departmentValue.indexOf(name);
        let checkArray = [...formValue.departmentValue]
        if (index > -1)
            checkArray.splice(index, 1)
        else
            checkArray.push(name);
        setForm({ ...formValue, departmentValue: checkArray });
    }

    const getChecked = (name) => {
        return formValue.departmentValue && formValue.departmentValue.includes(name);
    }

    // const validData = async () => {
    //     let isError = false;
    //     let error = {
    //         department: '',
    //         name: '',
    //         gender: '',
    //         salary: '',
    //         profileUrl: '',
    //         startDate: ''
    //     }
    //     if (formValue.name.length < 1) {
    //         error.name = 'name is a required field'
    //         isError = true;
    //     }
    //     if (formValue.gender.length < 1) {
    //         error.name = 'gender is a required field'
    //         isError = true;
    //     }
    //     if (formValue.salary.length < 1) {
    //         error.name = 'salary is a required field'
    //         isError = true;
    //     }
    //     if (formValue.profileUrl.length < 1) {
    //         error.name = 'profile is a required field'
    //         isError = true;
    //     }
    //     if (formValue.departmentValue.length < 1) {
    //         error.name = 'department is a required field'
    //         isError = true;
    //     }
    //     await setForm({ ...formValue, error: error })
    //     return isError;
    // }

    const save = async (event) => {
        event.preventDefault();
        // if (await validData()){
        //     console.log('error', formValue);
        //     return;
        // }
        let object = {
            name: formValue.name,
            departments: formValue.departmentValue,
            gender: formValue.gender,
            salary: formValue.salary,
            startDate: formValue.startDate.format('DD/MM/YYYY'),
            note: formValue.note,
            profileUrl: formValue.profileUrl,
        }

        if (formValue.isUpdate) {
            var answer = window.confirm(
                "Data once modified cannot be restored! Do you wish to continue?"
            );
            if (answer === true) {
                EmployeeService.updateEmployeeById(params.id, object)
                    .then((data) => {
                        console.log(data.data.data);
                        alert("Data updated successfully!");
                    })
                    .catch((error) => {
                        toast.error("WARNING!! Error while updating the data!", error);
                    });
            } else {
                window.location.reload();
            }
        } else {
            EmployeeService.addEmployee(object)
                .then((response) => {
                    console.log(response.data.data);
                })
        }
    }

    const reset = () => {
        setForm({ ...initialValue, id: formValue.id, isUpdate: formValue.isUpdate });
        console.log(formValue);
    }

    return (
        <div className="payroll-main">
            <CssBaseline />
            <div className="content">
                <form className="form" action="dashboard" onSubmit={save}>
                    <Typography variant="h6" gutterBottom>
                        Employee Details
                    </Typography>
                    <div>
                        <FormControl sx={{ width: '100%' }}>
                            <TextField name="name" id="name" value={formValue.name} onChange={changeValue} helperText="Please enter your name" label="Name" variant="outlined" />
                        </FormControl><br /><br />
                    </div>
                    <div>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Profile Image</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel checked={formValue.profileUrl === '../../assets/profile-images/Ellipse -3.png'} name="profileUrl" onChange={changeValue}
                                    value="../../assets/profile-images/Ellipse -3.png" control={<Radio />} label={<img src={profile1} alt="" />} />
                                <FormControlLabel name="profileUrl" checked={formValue.profileUrl === '../../assets/profile-images/Ellipse -1.png'} onChange={changeValue}
                                    value="../../assets/profile-images/Ellipse -1.png" control={<Radio />} label={<img src={profile2} alt="" />} />
                                <FormControlLabel name="profileUrl" checked={formValue.profileUrl === '../../assets/profile-images/Ellipse -8.png'} onChange={changeValue}
                                    value="../../assets/profile-images/Ellipse -8.png" control={<Radio />} label={<img src={profile3} alt="" />} />
                                <FormControlLabel name="profileUrl" checked={formValue.profileUrl === '../../assets/profile-images/Ellipse -7.png'} onChange={changeValue}
                                    value="../../assets/profile-images/Ellipse -7.png" control={<Radio />} label={<img src={profile4} alt="" />} />
                            </RadioGroup>
                        </FormControl><br /><br />
                    </div>
                    <div>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel checked={formValue.gender==='male'} onChange={changeValue} id="male" name="gender" value="male" control={<Radio />} label="Male" />
                                <FormControlLabel checked={formValue.gender==='female'} onChange={changeValue} id="female" name="gender" value="female" control={<Radio />} label="Female" />
                                <FormControlLabel checked={formValue.gender==='other'} onChange={changeValue} id="other" name="gender" value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl><br /><br />
                    </div>
                    <FormLabel id="demo-row-radio-buttons-group-label">Departments</FormLabel>
                    <div>
                        {formValue.allDepartment.map(item => (
                            <span key={item}>
                                <FormControlLabel onChange={() => onCheckChange(item)} name={item}
                                    checked={getChecked(item)} value={item} control={<Checkbox />} label={item} />
                            </span>
                        ))}
                    </div><br />
                    <div style={{ width: "80%" }}>
                        <FormLabel id="demo-row-radio-buttons-group-label">Salary</FormLabel>
                        <Slider onChange={changeValue} id="salary" value={formValue.salary} name="salary" defaultValue={0} step={500} marks min={500} max={100000} aria-label="Default" valueLabelDisplay="auto" />
                    </div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker name='startDate' id='name'
                                    label="Controlled picker"
                                    value={formValue.startDate}
                                    onChange={(newValue) => setForm({ ...formValue, startDate: newValue })}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div><br /><br />
                    <div>
                        <FormControl sx={{ width: '100%' }}>
                            <TextField onChange={changeValue} value={formValue.note} name="note" helperText="Please enter your notes" multiline rows={4} id="note" label="Notes" variant="outlined" />
                        </FormControl>
                    </div><br />
                    <div>
                        <FormControl>
                            <FormGroup row>
                                <Button href="/" sx={{ marginRight: '304px', height: '53px', width: '180px' }} variant="contained">Cancel</Button>
                                <Button type='submit' sx={{ marginRight: '20px', height: '53px', width: '180px' }} variant="contained">{formValue.isUpdate ? 'Update' : 'Submit'}</Button>
                                <Button sx={{ height: '53px', width: '180px' }} onClick={reset} variant="contained">Reset</Button>
                            </FormGroup>
                        </FormControl>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PayrollForm;