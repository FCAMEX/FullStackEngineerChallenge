import * as React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';
import MenuItem from "@material-ui/core/MenuItem";


export default class AppNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <AppBar position="static">
            <Toolbar>

                <IconButton style={{width: '5%'}} edge="start" color="inherit" aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Typography style={{width: '85%'}} variant="h6">
                    Performance Review Application
                </Typography>
                <Link style={{textDecoration: 'none', color: 'white', float: 'right'}} to="/logout">
                    <MenuItem style={{}}>Logout</MenuItem>
                </Link>
            </Toolbar>
        </AppBar>;
    }
}
