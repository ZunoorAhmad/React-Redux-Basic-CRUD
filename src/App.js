import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeComponent from './Components/HomeComponent';
import CreateComponent from './Components/CreateComponent';
import UpdateComponent from './Components/UpdateComponent';
import { ToastProvider } from "./Components/ToastContext";

function App() {
  return (
    <ToastProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/create" element={<CreateComponent />} />
            <Route path="/edit/:id" element={<UpdateComponent />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ToastProvider>
  );
}

export default App;
