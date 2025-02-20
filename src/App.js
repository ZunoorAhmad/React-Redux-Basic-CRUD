import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeComponent from './Components/HomeComponent';
import CreateComponent from './Components/CreateComponent';
import UpdateComponent from './Components/UpdateComponent';

function App() {
  return (
    <>
      <div className="App">
        CRUD (In App JS)
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/create" element={<CreateComponent />} />
            <Route path="/edit/:id" element={<UpdateComponent />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
