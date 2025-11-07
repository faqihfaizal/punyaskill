// src/main.jsx

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css' 
import 'bootstrap/dist/css/bootstrap.min.css'; 

// 👇 TAMBAHKAN DUA BARIS INI:

// 1. CSS Tema Zest Admin (Ditemukan di: src/assets/scss/zest-admin.css)
import './assets/scss/zest-admin.css'; 

// 2. CSS Font Ikon (Ditemukan di: src/assets/fonts/simple-line-icons.css)
import './assets/fonts/simple-line-icons.css'; 

// ...
createRoot(document.getElementById('root')).render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
)