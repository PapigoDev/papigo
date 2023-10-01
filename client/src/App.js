import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoyautPage from './Pages/LoyautPage/LoyautPage';
import HomePage from './Pages/HomePage/HomePage';
import ServicePage from './Pages/ServicePage/ServicePage';
import DetailPage from './Pages/DetailPage/DetailPage';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { SpinnerProvider } from './Context/SpinnerContext/SpinnerContext';
import LoginPage from './Pages/LoginPage/LoginPage';
import AdminPage from './Pages/AdminPage/AdminPage';
import ProtectedPage from './components/Admin/ProtectedPage/ProtectedPage';
import AdminDetailPage from './Pages/AdminDetailPage/AdminDetailPage';

function App() {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <SpinnerProvider>
          <div className="main-container">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LoyautPage backgroundClass='home-page'><HomePage /></LoyautPage>} />
                <Route path="/walkers" element={<LoyautPage ><ServicePage /></LoyautPage>} />
                <Route path="/detail/:id" element={<LoyautPage><DetailPage /></LoyautPage>} />
                <Route path="/login" element={<LoyautPage backgroundClass='home-page'><LoginPage /></LoyautPage>}/>
                <Route path="/admin" element={<LoyautPage><ProtectedPage><AdminPage /></ProtectedPage></LoyautPage>}/>
                <Route path="/admin/detail/:id" element={<LoyautPage><ProtectedPage><AdminDetailPage /></ProtectedPage></LoyautPage>}/>
              </Routes>
            </BrowserRouter>
          </div>
        </SpinnerProvider>
      </I18nextProvider>
    </>
  );
}

export default App;
