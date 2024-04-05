import React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import { StatusBar } from 'react-native';
import Navigation from './navigations';

export default function App() {
    return (
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <StatusBar barStyle='light-content' backgroundColor={theme.background} />
                <Navigation />
            </ThemeProvider>
        </RecoilRoot>
    );
}
