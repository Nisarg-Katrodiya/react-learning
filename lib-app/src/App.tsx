import { BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux'
import {routes as appRoutes} from './routes';
import ThemeConfig from './theme';
import NavRoutes from './components/Navigation/NavRoutes';
import Preloader from './components/Layouts/Preloader';
import {store} from './redux/store/store';

import './App.css'

function App() {

  return (
    <Provider store={store}>
      <ThemeConfig>
        <BrowserRouter>
          <Preloader />
          <NavRoutes routes={appRoutes} />
        </BrowserRouter>
      </ThemeConfig>
    </Provider>
  )
}

export default App
