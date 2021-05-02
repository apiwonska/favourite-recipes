import PageLayout from 'layout/PageLayout';
import RecipeList from 'components/RecipeList';

function App(): JSX.Element {
  return (
    <PageLayout>
      <RecipeList />
    </PageLayout>
  );
}

export default App;
