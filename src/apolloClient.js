import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import typeDefs from "./graphql/typeDefs";

const httpLink = createHttpLink({
    uri:"http://localhost:5000/v3/graphql"
});

const authLink = setContext((_,{headers}) => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    typeDefs,
    cache: new InMemoryCache()
});

export default client;
