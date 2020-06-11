import * as React from "react";
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Employee from './Employee';
import EmployeeEdit from './EmployeeEdit';
import Review from './Review';
import ReviewEdit from './ReviewEdit';
import * as ReactDOM from "react-dom";
import EmployeeReviews from "./EmployeeReviews";
import Feedback from "./Feedback";
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";

const theme = createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                margin: "5px",
            }
        }
    }
});

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route path='/' exact={true} component={Home}/>
                        <Route path='/employees' exact={true} component={Employee}/>
                        <Route path='/employees/:id' component={EmployeeEdit}/>
                        <Route path='/reviews/:id' component={Review}/>
                        <Route path='/review/:id' component={ReviewEdit}/>
                        <Route path='/employee_reviews/' component={EmployeeReviews}/>
                        <Route path='/feedback/:id' component={Feedback}/>
                    </Switch>
                </Router>
            </MuiThemeProvider>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
)