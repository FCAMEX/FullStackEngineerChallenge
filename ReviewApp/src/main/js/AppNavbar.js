import * as React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu';

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
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        Home
                    </Typography>
                </Toolbar>
            </Toolbar>
        </AppBar>;
    }
}