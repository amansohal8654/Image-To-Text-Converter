import React from 'react'
import './Navbar.css'

function Navbar() {
    return (
        <header class="header">
            <nav class="navbar">
                <a href="#" class="nav-logo">Image To Text Converter</a>
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a href="#" class="nav-link">Contact</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
