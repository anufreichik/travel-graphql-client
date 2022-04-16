import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import client from './apolloClient';
import {ApolloProvider} from "@apollo/client";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./context/authContext";

const container = document.getElementById('root');
const root = createRoot(container);

//react app needs access to ...
//Client,
//Authorization Context
//Browser Router (React Router) /login/register
root.render(
    <AuthProvider>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </ApolloProvider>
    </AuthProvider>
)
;


