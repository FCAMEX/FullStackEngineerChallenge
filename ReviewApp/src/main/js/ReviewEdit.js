import * as React from "react";
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, FormGroup} from '@material-ui/core';
import AppNavbar from './AppNavbar';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";


const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                margin: "5px",
            }
        }
    }
});


class ReviewEdit extends React.Component {


    emptyItem = {
        reviewId: '',
        title: '',
        content: '',
        authorName: '',
        target: "",
        feedbackList: []
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            req: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const that = this;
            fetch(`/api/performanceReviews/${this.props.match.params.id}`)
                .then(response => response.json())
                .then(data => that.setState({item: data}));
        }
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

        await fetch('/api/review', {
            method: (item.reviewId) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        const userId = this.props.location.data;
        const endpath = "/reviews/" + userId;
        this.props.history.push(endpath);
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {
        const userId = this.props.location.data;
        const endpath = "/reviews/" + userId;
        const {item} = this.state;
        const title = <Typography variant={"h5"}>{item.reviewId ? 'Edit Review' : 'Add Review'}</Typography>;
        item.target = {employeeId: userId};

        return <div>
            <AppNavbar/>
            <MuiThemeProvider theme={theme}>
                <Container>
                    {title}

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField fullWidth required variant="outlined" label="Review Title" name="title"
                                       autoComplete="name" value={item.title || ''} onChange={this.handleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField multiline rows={8} fullWidth required variant="outlined" label="Content"
                                       name="content" autoComplete="name"
                                       value={item.content || ''} onChange={this.handleChange}/>
                        </Grid>

                    </Grid>
                    <FormGroup>
                        <Button color="primary" type="submit" onClick={this.handleSubmit}>Save</Button>
                        <Button color="secondary" onClick={() => this.goBack()}>Cancel</Button>
                    </FormGroup>

                </Container>
            </MuiThemeProvider>
        </div>
    }
}

export default withRouter(ReviewEdit);