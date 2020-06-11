import * as React from "react";
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, Box} from '@material-ui/core';
import AppNavbar from './AppNavbar';
import Typography from "@material-ui/core/Typography";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";

class Review extends React.Component {

    constructor(props) {
        super(props);
        this.state = {reviews: [], isLoading: true};
        this.remove = this.remove.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    componentDidMount() {
        const that = this;
        fetch(`/api/reviews/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => that.setState({reviews: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/performanceReviews/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedReviews = [...this.state.reviews].filter(i => i.reviewId !== id);
            this.setState({reviews: updatedReviews});
        });
    }

    redirect(path, data) {
        this.props.history.push({pathname: path, data: data})
    }

    render() {
        const userId = this.props.match.params.id;
        const {reviews, isLoading} = this.state;
        const userFullName = this.props.location.data

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const groupList = reviews.map(review => {
            return <TableRow key={review.reviewId}>
                <TableCell style={{whiteSpace: 'nowrap'}}><Typography>{review.authorName}</Typography></TableCell>
                <TableCell style={{whiteSpace: 'nowrap'}}><Typography>{review.title}</Typography></TableCell>
                <TableCell>
                    <ButtonGroup>
                        <Button variant="contained" color="default" startIcon={<EditIcon/>}
                                onClick={() => this.redirect("/review/" + review.reviewId, userId)}>Edit</Button>
                        <Button variant="contained" color="secondary" startIcon={<DeleteIcon/>}
                                onClick={() => this.remove(review.reviewId, userId)}>Delete</Button>
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
                                <Typography variant="h5" type="title">Peformance Reviews for {userFullName}</Typography>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="primary"
                                    onClick={() => this.redirect("/review/new", userId)}>Add New Review</Button>
                        </Grid>
                    </Grid>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell width="20%"><Typography>Reviewer</Typography></TableCell>
                                    <TableCell width="20%"><Typography>Title</Typography></TableCell>
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

export default withRouter(Review);