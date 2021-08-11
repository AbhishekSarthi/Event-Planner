import './App.css';
import Create from './components/Create';
import Read from './components/Read';
import Delete from './components/Delete';
import Update from './components/Update';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <div className="post-page">
                    <Switch>
                        <Route path="/create" exact component={Create} />
                        <Route path="/read" exact component={Read} />
                        <Route path="/delete" exact component={Delete} />
                        <Route path="/update" exact component={Update} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/register" exact component={Register} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
