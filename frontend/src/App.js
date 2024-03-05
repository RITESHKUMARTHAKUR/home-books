import "./App.css";
import { BrowserRouter } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import Main from "./components/MainComponent";
import Navbar from "./components/navBarComponent/Navbar";
import Footer from "./components/footer/footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer/>
        <Navbar />
        <div style={{ width: "90%", margin: "auto", padding: "1em 0" }}>
          <Main />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
