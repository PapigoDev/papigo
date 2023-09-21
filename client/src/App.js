import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoyautPage from './Pages/LoyautPage/LoyautPage';
import HomePage from './Pages/HomePage/HomePage';
import ServicePage from './Pages/ServicePage/ServicePage';
import DetailPage from './Pages/DetailPage/DetailPage';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { SpinnerProvider } from './Context/SpinnerContext/SpinnerContext';

function App() {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <SpinnerProvider>
          <div className="main-container">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LoyautPage backgroundClass='home-page'><HomePage /></LoyautPage>} />
                <Route path="/service" element={<LoyautPage ><ServicePage /></LoyautPage>} />
                <Route path="/detail/:id" element={<LoyautPage><DetailPage /></LoyautPage>} />
              </Routes>
            </BrowserRouter>
          </div>
        </SpinnerProvider>
      </I18nextProvider>
    </>
  );
}

export default App;
