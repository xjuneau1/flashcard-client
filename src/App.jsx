import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Layout/header/Header";
import Layout from "./Layout/Layout";
import "../src/App.module.css"
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Layout />
      </Router>
    </div>
  );
}

export default App;
