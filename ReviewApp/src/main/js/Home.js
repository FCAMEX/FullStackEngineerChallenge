import * as React from "react";
import './App.css';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'

class Home extends React.Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container>
                    <Button><Link to="/employees">Manage Employees</Link></Button>
                </Container>
            </div>
        );
    }
}

export default Home;