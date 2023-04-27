import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../assets/styles/global';
import defaultTheme from '../assets/styles/themes/default';

import Header from '../components/Header';

import { Container } from './styles';
import RoutesPath from '../routes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />

        <Container>
          <Header />
          <RoutesPath />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
