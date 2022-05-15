import { Provider } from "react-redux"
import store from "./store";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Test from "./pages/Test";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/test" element={<Test/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
