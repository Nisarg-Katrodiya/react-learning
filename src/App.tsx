import { Provider } from 'react-redux'
import {store} from './redux/store/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import User from './pages/user';

function App() {
  const theme = createTheme();

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <User />
      </ThemeProvider>
    </Provider>
  )
}

export default App
