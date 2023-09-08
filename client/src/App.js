import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './Pages/HomePage/HomePage';
import DetailPage from './Pages/DetailPage/DetailPage';
import LoyautPage from './Pages/LoyautPage/LoyautPage';

function App() {
  return (
    <>
    <div className="main-container">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoyautPage><HomePage /></LoyautPage>}/>
          <Route path="/detail/:id" element={<LoyautPage><DetailPage /></LoyautPage>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
