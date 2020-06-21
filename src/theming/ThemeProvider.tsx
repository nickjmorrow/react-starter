import React from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { getTheme } from '~/theming/getTheme';
import { themeInputs } from '~/theming/themeInputs';

/**
 * Theme that is consumed by styled-components.
 */
export const ThemeProvider: React.FC = ({ children }) => {
    return <SCThemeProvider theme={getTheme(themeInputs)}>{children}</SCThemeProvider>;
};
