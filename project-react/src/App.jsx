import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './component/Login';
import Categories from './component/Categories';
import Professionals from './component/Professionals';
import store from './store/store';
import { Provider } from 'react-redux';
import Chat from './component/Chat';
import Navbar from './component/Navbar';
import HomePage from './component/HomePage';
import Category from './component/Category';
import UploadConect from './component/UploadConect'
import Upload from './component/Upload';
import PageMan from './component/PageMan';
import UpdateProfessional from './component/UpdateProfessional'
import LoginProfessional from './component/LoginProfessional'
import Contact from './component/contact';
import CommentsSite from './component/CommentsSite';
import DeleteProfessional from './component/DeleteProfessional'
import ProfessionalArea from './component/ProfessionalArea'
import UserProfile from './component/UserProfile';
import FavouriteUser from './component/FavoriteUser'
import AdminArea from './component/AdminArea';
import AddCategory from './component/AddCategory';
import ProtectedRoute from './component/ProtectedRoute';
import DeleteCategory from './component/DeleteCategory';
import CategoryForDelete from './component/CategoryForDelete';
import './App.css';
// import Needed from './component/Needed';
function App() {
  return (
    <Provider store={store}>
      <div className="container"></div>
      <Router>
        <Routes>
          <Route path="/CategoryForDelete" element={<ProtectedRoute element={<CategoryForDelete />} />} />
          <Route path="/DeleteCategory/:id" element={<ProtectedRoute element={<DeleteCategory />} />} />
          <Route path="/AdminArea" element={<ProtectedRoute element={<AdminArea />} />} />
          <Route path="/AddCategory" element={<ProtectedRoute element={<AddCategory />} />} />
          <Route path="/CommentsSite" element={<ProtectedRoute element={<CommentsSite />} />} />
          <Route path="/contact" element={<ProtectedRoute element={<Contact />} />} />
          <Route path="/updateProfessional/:id" element={<ProtectedRoute element={<UpdateProfessional />} />} />
          <Route path="LoginProfessional" element={<LoginProfessional />} />
          <Route path="Login" element={<Login />} />
          <Route path="Professionals" element={<Professionals />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/HomePage" element={<ProtectedRoute element={<HomePage />} />} />
          <Route path="/Categories" element={<ProtectedRoute element={<Categories />} />} />
          <Route path="/Category" element={<ProtectedRoute element={<Categories />} />} />
          <Route path="/category/:id" element={<ProtectedRoute element={<Category />} />} />
          <Route path="/UploadConect/" element={<ProtectedRoute element={<UploadConect />} />} />
          <Route path="/Upload" element={<ProtectedRoute element={<Upload />} />} />
          <Route path="/categories" element={<ProtectedRoute element={<Categories />} />} />
          <Route path="/category/:id" element={<ProtectedRoute element={<Category />} />} />
          <Route path="/UploadConect" element={<ProtectedRoute element={<UploadConect />} />} />
          <Route path="/professional/:id" element={<ProtectedRoute element={<PageMan />} />} />
          <Route path="/PageMan/:id" element={<ProtectedRoute element={<PageMan />} />} />
          <Route path="/DeleteProfessional/:id" element={<ProtectedRoute element={<DeleteProfessional />} />} />
          <Route path="/DeleteProfessional" element={<ProtectedRoute element={<DeleteProfessional />} />} />
          <Route path="/ProfessionalArea/:id" element={<ProtectedRoute element={<ProfessionalArea />} />} />
          <Route path='/UserProfile' element={<UserProfile />} />
          <Route path='/FavouriteUser' element={<ProtectedRoute element={<FavouriteUser />} />} />
          <Route path='/FavouriteUser/:id' element={<ProtectedRoute element={<PageMan />} />} />
          {/* <Route path='/Needed' element={<ProtectedRoute element={<Needed/>}/>}/>  */}
          <Route path='/Chat' element={<Chat />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
      {/* <Chat /> */}
    </Provider>
  );
}

export default App;

