import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PageLayout from 'layout/PageLayout';
import HomePage from 'pages/HomePage';
import AddRecipePage from 'pages/AddRecipePage';
import UpdateRecipePage from 'pages/UpdateRecipePage';

function App(): JSX.Element {
  return (
    <PageLayout>
      <Router>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/add" component={AddRecipePage} exact />
          <Route path="/update/:recipeId" component={UpdateRecipePage} exact />
        </Switch>
      </Router>
    </PageLayout>
  );
}

export default App;
