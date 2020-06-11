import * as React from "react";
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, FormGroup} from '@material-ui/core';
import AppNavbar from './AppNavbar';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

class Feedback extends React.Component {

    emptyItem = {
        review: "",
        content: '',
        feedbackId: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            req: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    componentDidMount() {
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        const endpath = "/employee_reviews";
        this.props.history.push(endpath);
    }

    redirect(path) {
        this.props.history.push({pathname: path})
    }


    render() {
        const userId = this.props.match.params.id;
        const {item} = this.state;
        const title = <Typography variant={"h5"}>Add Feedback</Typography>;
        item.review = {reviewId: userId};
        item.feedbackId = userId;

        return <div>
            <AppNavbar/>
            <Container>
                {title}

                <TextField fullWidth multiline rows={8} required variant="outlined" label="Feedback Content"
                           name="content" value={item.content || ''} onChange={this.handleChange}/>


                <FormGroup>
                    <Button color="primary" type="submit" onClick={this.handleSubmit}>Save</Button>
                    <Button color="secondary" onClick={() => this.redirect("/employee_reviews")}>Cancel</Button>
                </FormGroup>

            </Container>
        </div>
    }
}

export default withRouter(Feedback);