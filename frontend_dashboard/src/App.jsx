import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider } from './views/university/context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './variables/university/LoginPage'
import UniversityLayout from './layouts/University'

import Student from 'views/university/Student/Student.jsx'
import StudentProfile from 'views/university/Student/StudentProfile'

import Professor from 'views/university/Professor/Professor.jsx'
import ProfessorProfile from 'views/university/Professor/ProfessorProfile.jsx'

import Course from 'views/university/Course/Course.jsx'
import AddCourse from 'views/university/Course/AddCourse.jsx'
import EditCourse from 'views/university/Course/EditCourse.jsx'
import CourseView from 'views/university/Course/CourseView.jsx'

export default function App() {
        return (
                <AuthProvider>
                        <Routes>
                                <Route path='/login' element={<LoginPage />} />
                                <Route
                                        path='/*'
                                        element={
                                                <ProtectedRoute>
                                                        <UniversityLayout />
                                                </ProtectedRoute>
                                        }
                                >
                                        <Route index element={<Navigate to='university/dashboard' replace />} />

                                        {/* Students */}
                                        <Route path='university/students' element={<Student />} />
                                        <Route path='university/student-profile/:id' element={<StudentProfile />} />

                                        {/* Professors */}
                                        <Route path='university/professors' element={<Professor />} />
                                        <Route path='admin/university/professor-profile/:id' element={<ProfessorProfile />} />

                                        {/* Courses */}
                                        <Route path='university/courses' element={<Course />} />
                                        <Route path='university/add-course' element={<AddCourse />} />
                                        <Route path='university/edit-course/:slug' element={<EditCourse />} />
                                        <Route path='admin/university/course-view/:slug' element={<CourseView />} />
                                </Route>
                        </Routes>
                </AuthProvider>
        )
}