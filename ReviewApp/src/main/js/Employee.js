import * as React from "react";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import AppNavbar from './AppNavbar'
import {Link, withRouter} from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import RateReviewIcon from '@material-ui/icons/RateReview';


class EmployeeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {employees: [], isLoading: true};
        this.remove = this.remove.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/employees')
            .then(response => response.json())
            .then(data => this.setState({employees: data._embedded.employees, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/employees/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedEmployees = [...this.state.employees].filter(i => i.employeeId !== id);
            this.setState({employees: updatedEmployees});
        });
    }

    redirect(path, data) {
        this.props.history.push({pathname: path, data: data})
    }

    render() {
        const {employees, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const groupList = employees.map(employee => {

            return <TableRow key={employee.employeeId}>
                <TableCell style={{whiteSpace: 'nowrap'}}><Typography>{employee.firstName}</Typography></TableCell>
                <TableCell style={{whiteSpace: 'nowrap'}}><Typography>{employee.lastName}</Typography></TableCell>
                <TableCell style={{whiteSpace: 'nowrap'}}><Typography>{employee.title}</Typography></TableCell>
                <TableCell style={{whiteSpace: 'nowrap'}}><Typography>{employee.department}</Typography></TableCell>
                <TableCell>
                    <ButtonGroup>
                        <Button variant="contained" color="default" startIcon={<EditIcon/>}
                                onClick={() => this.redirect("/employees/" + employee.employeeId, employee.firstName + " " + employee.lastName)}>Edit</Button>
                        <Button variant="contained" color="secondary" startIcon={<DeleteIcon/>}
                                onClick={() => this.remove(employee.employeeId)}>Delete</Button>
                        <Button variant="contained" color="primary" startIcon={<RateReviewIcon/>}
                                onClick={() => this.redirect("/reviews/" + employee.employeeId, employee.firstName + " " + employee.lastName)}>Review</Button>
                    </ButtonGroup>
                </TableCell>
            </TableRow>
        });

        return (
            <div>
                <AppNavbar/>
                <Container>
                    <Grid
                        justify="space-between"
                        container
                    >

                        <Grid item>
                            <Box mt={2}>
                                <Typography variant="h5" type="title">Employees</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={() => this.redirect("/employees/new")}>Add
                                New Employee</Button>
                        </Grid>
                    </Grid>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell width="20%"> <Typography>First Name</Typography></TableCell>
                                    <TableCell width="20%"><Typography>Last Name</Typography></TableCell>
                                    <TableCell width="20%"><Typography>Title</Typography></TableCell>
                                    <TableCell width="20%"><Typography>Department</Typography></TableCell>
                                    <TableCell align="center" width="20%"><Typography>Actions</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {groupList}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>
        );
    }
}

export default withRouter(EmployeeList);