import { render, screen } from '@testing-library/react';
import App from '../App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

let client: ApolloClient<any>;
beforeAll(() => {
  client =  new ApolloClient({
    uri: "https://content-redfish-61.hasura.app/v1/graphql",cache: new InMemoryCache()});
  })
test('renders the button to add a new note', () => {
  render(
    <ApolloProvider client={client}><App /></ApolloProvider>);
  const linkElement = screen.getByText(/ADD NOTE/i);
  expect(linkElement).toBeInTheDocument();
});
