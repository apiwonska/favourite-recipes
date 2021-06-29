import { Switch, Route } from 'react-router-dom';

import PageLayout from 'layout/PageLayout';
import HomePage from 'pages/HomePage';
import AddRecipePage from 'pages/AddRecipePage';
import UpdateRecipePage from 'pages/UpdateRecipePage';
import PageNotFound404 from 'pages/PageNotFound404';

function App(): JSX.Element {
  return (
    <PageLayout>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/add" component={AddRecipePage} exact />
        <Route path="/update/:recipeId" component={UpdateRecipePage} exact />
        <Route path="*" component={PageNotFound404} />
      </Switch>
    </PageLayout>
  );
}

export default App;
