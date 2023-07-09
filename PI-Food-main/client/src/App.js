import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Landing from "./pages/landing";
import Home from "./pages/home";
import Detail from "./pages/detail";
import Create from "./pages/create";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          {/* <h1>Henry Food</h1> */}
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/recipes/:id" component={Detail} />
          <Route exact path="/create" component={Create} />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
