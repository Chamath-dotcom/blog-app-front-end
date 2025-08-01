
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/admin/adminPage';
import HomePage from './pages/home/homePage';
import Login from './pages/login/login';
import { Toaster } from 'react-hot-toast';
import Register from './pages/register/register';
import ProfilePage from './pages/profile/ProfilePage';
import PostDetail from "./pages/post/PostDetail";
import AuthorProfilePage from './pages/profile/AuthorProfilePage';

function App() {


  return (
    <BrowserRouter>
      <Toaster/>
      <Routes>
        <Route path='/admin/*' element={<AdminPage/>}/>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login/*' element={<Login/>}/>
        <Route path='/register/*' element={<Register/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='*' element={<h1>not found</h1>}/>
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/profile/:author" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
