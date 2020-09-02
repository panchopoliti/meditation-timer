import React from 'react';
import ThemeToggler from './ThemeToggler.js';
import { ThemeContextConsumer } from '../../ThemeContext.js';

// class NavBar extends React.Component {
    
//     render () {
//         return (

//         )
//     }
// }

export default function NavBar() {

    return (
        <ThemeContextConsumer>
            {
                ({ theme }) => (
                    <ul className={`${theme}NavBar`}>
                        <li>
                            <ThemeToggler/>
                        </li>
                    </ul>
                )
            }
        </ThemeContextConsumer>
    )
}
