import ToggleContext from './ToggleContext.js';

const { Provider: ThemeContextProvider, Consumer: ThemeContextConsumer } = ToggleContext('theme', 'light', 'dark');
const { Provider: SizeContextProvider, Consumer: SizeContextConsumer } = ToggleContext('size', 'small', 'big');

export { 
    ThemeContextProvider,
    ThemeContextConsumer, 
    SizeContextProvider, 
    SizeContextConsumer 
};