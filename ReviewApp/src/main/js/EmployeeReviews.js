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
import AddBoxIcon from '@material-ui/icons/AddBox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

class EmployeeReviews extends React.Component {

    constructor(props) {
        super(props);
        this.state = {reviews: [], isLoading: true};
        this.remove = this.remove.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('/api/userReviews')
            .then(response => response.json())
            .then(data => this.setState({reviews: data, isLoading: false}));
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
        const {reviews, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const groupList = reviews.map(review => {
            // const address = `${employee.address || ''} ${employee.city || ''} ${employee.stateOrProvince || ''}`;
            return <TableRow key={review.reviewId}>
                <TableCell style={{whiteSpace: 'nowrap'}}><Typography>{review.authorName}</Typography></TableCell>
                <TableCell style={{whiteSpace: 'nowrap'}}><Typography>{review.title}</Typography></TableCell>
                <TableCell style={{whiteSpace: 'nowrap'}}><Typography>{review.content}</Typography></TableCell>


                <TableCell>
                    <ButtonGroup>
                        <Button disabled={review.hasFeedback} variant="contained" color="default"
                                startIcon={<AddBoxIcon/>}
                                onClick={() => this.redirect("/feedback/" + review.reviewId)}>Feedback</Button>
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
                                <Typography variant="h5" type="title">Reviews</Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell width="20%"><Typography>Reviewer</Typography></TableCell>
                                    <TableCell width="20%"><Typography>Title</Typography></TableCell>
                                    <TableCell width="40%"><Typography>Content</Typography></TableCell>
                                    <TableCell width="10%"><Typography>Actions</Typography></TableCell>
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

export default withRouter(EmployeeReviews);