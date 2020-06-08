import * as React from "react";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import AppNavbar from './AppNavbar'
import {Link} from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Delete';


class EmployeeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {employees: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/employees')
            .then(response => response.json())
            .then(data => this.setState({employees: data._embedded.employees, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/employee/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedEmployees = [...this.state.employees].filter(i => i.id !== id);
            this.setState({employees: updatedEmployees});
        });
    }

    render() {
        const {employees, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const groupList = employees.map(employee => {
            // const address = `${employee.address || ''} ${employee.city || ''} ${employee.stateOrProvince || ''}`;
            return <tr key={employee.employeeId}>
                <td style={{whiteSpace: 'nowrap'}}>{employee.firstName}</td>
                <td style={{whiteSpace: 'nowrap'}}>{employee.lastName}</td>
                <td>
                    <ButtonGroup>
                        <Button variant="contained" color="default" startIcon={<EditIcon />} tag={Link} to={"/employee/" + employee.employeeId}>Edit</Button>
                        <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => this.remove(employee.employeeId)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container>
                    <div className="float-right">
                        <Button variant="contained" color="primary" tag={Link} to="/groups/new">Add New Employee</Button>
                    </div>
                    <h3>Employees</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">First Name</th>
                            <th width="20%">Last Name</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {groupList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default EmployeeList;