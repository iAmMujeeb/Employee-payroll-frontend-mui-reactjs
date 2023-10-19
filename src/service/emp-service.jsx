import axios from 'axios';

class EmployeeService{

    baseUrl = 'http://localhost:8082/employeepayrollservice';

    addEmployee(data) {
        return axios.post(`${this.baseUrl}/create`, data);
    }

    getEmployeeById(id) {
        return axios.get(`${this.baseUrl}/getbyid/${id}`);
    }
    
    getEmployee() {
        return axios.post(`${this.baseUrl}/get`);
    }

    updateEmployeeById(id, data) {
        return axios.put(`${this.baseUrl}/updatebyid/${id}`, data);
    }

    deleteEmployeeById(id) {
        return axios.delete(`${this.baseUrl}/deletebyid/${id}`)
    }

}
export default new EmployeeService()