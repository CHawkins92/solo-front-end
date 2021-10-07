import "./App.css";
import Create from "./components/Create/Create";
import Admin from "./components/Admin/Admin";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <h3>React CRUD</h3>
        </div>
        <div>
          <Route exact path="/" component={Create} />
        </div>
        <div>
          <Route exact path="/admin" component={Admin} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
