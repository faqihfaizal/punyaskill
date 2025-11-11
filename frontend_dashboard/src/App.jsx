import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import UniversityLayout from './layouts/University'

// --- Impor Student ---
import Student from 'views/university/Student/Student.jsx';
import AddStudent from 'views/university/Student/AddStudent.jsx'; // 👈 Tambahkan ini
import EditStudent from 'views/university/Student/EditStudent.jsx'; // 👈 Tambahkan ini
import StudentProfile from './views/university/Student/StudentProfile'

// --- Impor Professor ---
import Professor from 'views/university/Professor/Professor.jsx'; 
import AddProfessor from 'views/university/Professor/AddProfessor.jsx'; // 👈 Tambahkan ini
import EditProfessor from './views/university/Professor/EditProfessor.jsx';
import ProfessorProfile from 'views/university/Professor/ProfessorProfile.jsx';

// =========================================================================
// !! TAMBAHKAN IMPOR DI BAWAH INI !!
// (Path ini diambil dari file university.jsx Anda)
// =========================================================================
import Course from 'views/university/Course/Course.jsx';
import AddCourse from 'views/university/Course/AddCourse.jsx';
import EditCourse from 'views/university/Course/EditCourse.jsx';
import CourseView from 'views/university/Course/CourseView.jsx';
// =========================================================================


// basic routing: root -> university layout
export default function App(){

  return (
    <Routes>
      {/* Route ini menangkap semua URL dan menampilkannya 
        DI DALAM UniversityLayout 
      */}
      <Route path='/*' element={<UniversityLayout />}>

        {/* Ubah 'index' agar mengarah ke 'university/dashboard' 
          atau biarkan ke 'university/students' jika itu yang Anda mau
        */}
        <Route index element={<Navigate to='university/students' replace />} />

        {/* --- Rute Student (Lengkap) --- */}
        {/* Path Anda harus lengkap 'university/...' agar konsisten 
          dengan file university.jsx
        */}
        <Route path='university/students' element={<Student />} />
        <Route path='university/add-student' element={<AddStudent />} />
        {/* Asumsi 'edit-student' dan 'student-profile' menggunakan :id */}
        <Route path='university/edit-student/:id' element={<EditStudent />} /> 
        <Route path='university/student-profile/:id' element={<StudentProfile />} />

        {/* --- Rute Professor (Lengkap) --- */}
        <Route path='university/professors' element={<Professor />} />
        <Route path='university/add-professor' element={<AddProfessor />} />
        {/* Path ini sudah benar sesuai link Anda: 'admin/university/edit-professor/:id'
          Ini sedikit tidak konsisten, tapi kita ikuti yang sudah jalan
        */}
        <Route path='admin/university/edit-professor/:id' element={<EditProfessor />} />
        <Route path='university/professor-profile/:id' element={<ProfessorProfile />} />

        {/* ======================================================== */}
        {/* !! TAMBAHKAN RUTE COURSE BARU DI BAWAH INI !!            */}
        {/* ======================================================== */}

        <Route path='university/courses' element={<Course />} />
        <Route path='university/add-course' element={<AddCourse />} />
        
        {/* PENTING: Controller dan Courselist Anda menggunakan :slug.
          Jadi, kita harus pakai :slug di sini agar dinamis.
        */}
        <Route path='university/edit-course/:slug' element={<EditCourse />} />
        <Route path='university/course-view/:slug' element={<CourseView />} />
        {/* ======================================================== */}
        {/* !! AKHIR TAMBAHAN !!                                  */}
        {/* ======================================================== */}

      </Route>
    </Routes>
  )
}