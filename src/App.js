import './styles/app.scss';
import { useAppContext } from './contexts';
import { LoginPage, UserPage, GraphsPage } from './components';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

function App() {

  const { user } = useAppContext();

  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={redirect} />
        <Route path="/user/:name" component={UserPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/graphs" component={GraphsPage} />
        <Route path="/graphs/:device" component={GraphsPage} />
      </Router>
    </div>
  );
}

const redirect = (user) => {
  if (user.user) return <Redirect to="/user/" />;
  return <Redirect to="/login" />
}

export default App;
