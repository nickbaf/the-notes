import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './pages/App/App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { StyledEngineProvider } from '@mui/material/styles';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client =  new ApolloClient({
  uri: "https://content-redfish-61.hasura.app/v1/graphql",cache: new InMemoryCache()});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </ApolloProvider>
  </React.StrictMode>
);
