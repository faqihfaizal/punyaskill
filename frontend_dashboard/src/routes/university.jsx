import University from 'views/university/Dashboard/University.jsx';
import Professor from 'views/university/Professor/Professor.jsx';
import AddProfessor from 'views/university/Professor/AddProfessor.jsx';
import EditProfessor from 'views/university/Professor/EditProfessor.jsx';
import ProfessorProfile from 'views/university/Professor/ProfessorProfile.jsx';
import Student from 'views/university/Student/Student.jsx';
import AddStudent from 'views/university/Student/AddStudent.jsx';
import EditStudent from 'views/university/Student/EditStudent.jsx';
import StudentProfile from 'views/university/Student/StudentProfile.jsx';
import Course from 'views/university/Course/Course.jsx';
import AddCourse from 'views/university/Course/AddCourse.jsx';
import EditCourse from 'views/university/Course/EditCourse.jsx';
import CourseView from 'views/university/Course/CourseView.jsx';

var BASEDIR = import.meta.env.VITE_REACT_APP_BASEDIR || '';
var dashRoutes = [
   //{ path: "#", name: "Main", type: "navgroup"},

    { path: BASEDIR+"/university/dashboard", name: "Dashboard", icon: "speedometer", badge: "", component: University },
    {
        path: "#", name: "Professors", icon: "user", type: "dropdown", parentid: "professors",

            child: [

                { path: BASEDIR+"/university/professors", name: "Professors"},

                { path: BASEDIR+"/university/add-professor", name: "Add Professor"},
            ]
    },
        { path: BASEDIR+"/university/professors", component: Professor, type: "child"},

        { path: BASEDIR+"/university/add-professor", component: AddProfessor, type: "child"},

        { path: BASEDIR+"/university/edit-professor/:id_instruktur", component: EditProfessor, type: "child"},

        { path: BASEDIR+"/university/professor-profile/:id_instruktur", component: ProfessorProfile, type: "child"},
    {
        path: "#", name: "Students", icon: "people", type: "dropdown", parentid: "students",

            child: [

                { path: BASEDIR+"/university/students", name: "Students"},
            ]

    },

        { path: BASEDIR+"/university/students", component: Student, type: "child"},

        { path: BASEDIR+"/university/add-student", component: AddStudent, type: "child"},

        { path: BASEDIR+"/university/edit-student", component: EditStudent, type: "child"},

        { path: BASEDIR+"/university/student-profile/:id_siswa", component: StudentProfile, type: "child"},





    {

        path: "#", name: "Courses", icon: "folder-alt", type: "dropdown", parentid: "courses",

            child: [

                { path: BASEDIR+"/university/courses", name: "Courses"},

                { path: BASEDIR+"/university/add-course", name: "Add Course"},

                // { path: BASEDIR+"/university/edit-course", name: "Edit Course"},

            ]

    },

        { path: BASEDIR+"/university/courses", component: Course, type: "child"},

        { path: BASEDIR+"/university/add-course", component: AddCourse, type: "child"},

        { path: BASEDIR+"/university/edit-course/:slug", component: EditCourse, type: "child"},

        { path: BASEDIR+"/university/course-view/:slug", component: CourseView, type: "child"},





        { path: BASEDIR+"/university/dashboard", component: University, type: "child"},




];

export default dashRoutes;