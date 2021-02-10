import Layout from "components/Layout/Layout";
import Posts from "containers/Posts/Posts";

function App() {
  return (
    <div className="App">
        <Layout>
          <Posts />
        </Layout>
    </div>
  );
}

export default App;