import './App.css';
import Account from './Components/account/Account.js';

import { GlobalProvider } from './context';
import { BrowserRouter ,Routes,Route, Navigate, Outlet} from 'react-router-dom';
import Header from './Components/header/Header';
import { useState } from 'react';
import Createpost from './Components/create/Createpost';
import FirstPage from './Components/FirstPage/FirstPage';
import Myblog from './Components/My-Blogs/Myblog';
import UserBlog from './Components/userblog/UserBlog';
import Editblog from './Components/editblog/Editblog';


const PrivateRoute = ({isAuthenticated,...props}) => {
  return isAuthenticated ? 
    <>
       <Header/>
      <Outlet/>
    </>
    :
    <Navigate replace to='/login' />
}
function App()


{
  const [isAuthenticated,isUserAutenticated]=useState(false)
  return (
    <GlobalProvider>
      <BrowserRouter>
       
        <div className="App">
          <Routes>
            <Route path='/login' element={<Account isUserAutenticated={isUserAutenticated} />}/>
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/" element={<FirstPage />} />
            </Route>
            <Route path='/all-blogs' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/all-blogs" element={<Myblog />} />
            </Route>
            <Route path='/My-Blogs' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/My-Blogs" element={<UserBlog />} />
            </Route>
            <Route path='/edit-blog/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/edit-blog/:id" element={<Editblog />} />
            </Route>
            <Route path='/create-blog' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/create-blog" element={<Createpost />} />
             </Route>
            </Routes>
           </div>
        </BrowserRouter>
        </GlobalProvider>
  );
}

export default App;