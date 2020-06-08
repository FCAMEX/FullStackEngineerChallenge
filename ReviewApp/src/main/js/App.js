import * as React from "react";
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Employee from './Employee';
import * as ReactDOM from "react-dom";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/employees' exact={true} component={Employee}/>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)