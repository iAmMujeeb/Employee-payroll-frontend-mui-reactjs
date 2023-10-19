import './App.scss';
import EmpDashboard from './components/dashboard/emp-dashboard';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Header from './components/header/header';
import PayrollForm from './components/payroll-form/payroll-form';

function App() {
  return (
    <BrowserRouter>
        <Header />
      <Routes>
        <Route path='/' element={<EmpDashboard />} />
        <Route path='/payrollform' element={<PayrollForm />} />
        <Route path='/editemp/:id' element={<PayrollForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
