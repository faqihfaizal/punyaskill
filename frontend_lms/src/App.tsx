
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import HomeOne from "./components/homes/home";
// import HomeTwo from "./components/homes/home-2";
import About from "./components/about";
import Courses from "./components/courses";
// import CoursesTwo from "./components/courses-2";
import CourseDetails from "./components/course-details";
// import GridBlog from "./components/grid-blog";
// import StandardBlog from "./components/standard-blog";
// import BlogDetails from "./components/blog-details";
// import Cart from "./components/cart";
// import Checkout from "./components/checkout";
import Login from "./components/login";
import Register from "./components/register";
import Instructors from "./components/instructors";
import Error from "./components/error";
import Contact from "./components/contact"; 


const router = createBrowserRouter([
  { path: "/", element: <HomeOne /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  // { path: "/home-2", element: <HomeTwo /> },
  { path: "/about", element: <About /> },
  { path: "/courses", element: <Courses /> },
  // { path: "/courses-2", element: <CoursesTwo /> },
  { path: "/course-details/:slug", element: <CourseDetails /> },
  // { path: "/grid-blog", element: <GridBlog /> },
  // { path: "/standard-blog", element: <StandardBlog /> },
  // { path: "/blog-details", element: <BlogDetails /> },
  // { path: "/cart", element: <Cart /> },
  // { path: "/checkout", element: <Checkout /> },

  { path: "/instructors", element: <Instructors /> },
  { path: "/contact", element: <Contact /> },
  { path: "*", element: <Error /> },

]);





function App() {

  return (
    <> 
      <RouterProvider router={router} />
    </>
  )
}

export default App
