import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import UniversityLayout from './layouts/University'

// Impor Student (Sudah ada)
import StudentProfile from './views/university/Student/StudentProfile'
import Student from './views/university/Student/Student'

// =========================================================================
// !! TAMBAHKAN IMPOR DI BAWAH INI !!
// (Path ini diambil dari file university.jsx Anda)
// =========================================================================

// Ini adalah komponen Professorslist.jsx Anda
// (di file university.jsx Anda, ini diimpor sebagai 'Professor')
import Professor from 'views/university/Professor/Professor.jsx'; 

// Ini adalah komponen EditProfessor.jsx Anda
import EditProfessor from 'views/university/Professor/EditProfessor.jsx';

// Ini adalah komponen Profile (untuk NavLink di nama instruktur)
import ProfessorProfile from 'views/university/Professor/ProfessorProfile.jsx';
// =========================================================================


// basic routing: root -> university layout
export default function App(){

  return (
    <Routes>
      {/* Route ini menangkap semua URL dan menampilkannya 
        DI DALAM UniversityLayout 
      */}
      <Route path='/*' element={<UniversityLayout />}>

        <Route index element={<Navigate to='students' replace />} />

        {/* Rute Student Anda (Biarkan saja) */}
        <Route path='students' element={<Student />} />
        <Route path='students/:id' element={<StudentProfile />} />

        {/* ======================================================== */}
        {/* !! TAMBAHKAN RUTE BARU DI BAWAH INI !!                  */}
        {/* ======================================================== */}

        {/* 1. Rute untuk menampilkan daftar instruktur (Professorslist.jsx) */}
        <Route path='professors' element={<Professor />} />

        {/* 2. Rute untuk halaman EDIT.
             Path ini HARUS SAMA PERSIS dengan link di Professorslist.jsx
             Link Anda: /university/professors/edit/:id
             Karena 'App.jsx' menangani '/*', kita harus menulis path lengkapnya
             agar cocok.
        */}
        <Route 
  // SAMAKAN DENGAN LINK ANDA
  path='university/edit-professor/:id' 
  element={<EditProfessor />} 
/>

        {/* 3. Rute untuk halaman PROFIL (dari NavLink di nama instruktur)
             Link Anda: /university/professor-profile/:id
        */}
        <Route 
          path='university/professor-profile/:id' 
          element={<ProfessorProfile />} 
        />
        {/* ======================================================== */}
        {/* !! AKHIR TAMBAHAN !!                                  */}
        {/* ======================================================== */}

      </Route>
    </Routes>
  )
}