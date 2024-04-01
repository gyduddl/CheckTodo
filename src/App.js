import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import { StatusBar } from 'react-native';
import Navigation from './navigations';
import { UserProvider, ProgressProvider } from './contexts';

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <ProgressProvider>
                <UserProvider>
                    <StatusBar barStyle='light-content' backgroundColor={theme.background} />
                    <Navigation />
                </UserProvider>
            </ProgressProvider>
        </ThemeProvider>
    );
}
