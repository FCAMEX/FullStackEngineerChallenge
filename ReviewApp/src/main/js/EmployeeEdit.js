import * as React from "react";
import {Link, withRouter} from 'react-router-dom';
import {Button, Container, FormGroup} from '@material-ui/core';
import AppNavbar from './AppNavbar';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";

class EmployeeEdit extends React.Component {

    emptyItem = {
        employeeId: '',
        firstName: '',
        lastName: '',
        username: '',
        department: '',
        admin: ''

    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const that = this;
            fetch(`/api/employees/${this.props.match.params.id}`)
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

        await fetch('/api/employees', {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/employees');
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {
        const {item} = this.state;
        const title = <Typography variant={"h5"}>{item.employeeId ? 'Edit Employee' : 'Add Employee'}</Typography>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField fullWidth required variant="outlined" label="First Name" name="firstName"
                                   autoComplete="name" value={item.firstName || ''} onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth required variant="outlined" label="Last Name" name="lastName"
                                   autoComplete="name" value={item.lastName || ''} onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth required variant="outlined" label="Username" name="username"
                                   value={item.username || ''} onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth required variant="outlined" label="Password" name="password" value={''}
                                   onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={item.admin || false}
                                    onChange={this.handleChange}
                                    name="admin"
                                    color="primary"
                                />
                            }
                            label="Admin"
                        />

                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth required variant="outlined" label="Department" name="username"
                                   value={item.department || ''} onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth required variant="outlined" label="Title" name="title"
                                   value={item.title || ''}
                                   onChange={this.handleChange}/>
                    </Grid>
                </Grid>
                    <FormGroup>
                        <Button color="primary" type="submit" onClick={this.handleSubmit}>Save</Button>
                        <Button color="secondary" onClick={() => this.goBack}>Cancel</Button>
                    </FormGroup>

            </Container>
        </div>
    }
}

export default withRouter(EmployeeEdit);