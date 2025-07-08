import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home';
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { useSetAtom } from 'jotai';
import { currentUserAtom } from "./modules/auth/current-user.state";
import { authRepository } from "./modules/auth/auth.repository";
import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const setCurrentUser = useSetAtom(currentUserAtom);

  useEffect(() => {
    fetchCurrentUser()
  },[]);


  const fetchCurrentUser = async() => {
    try {
      const user = await authRepository.getCurrentUser();
      setCurrentUser(user);
    } catch (error){
      console.error("ユーザー情報の取得に失敗しました。", error);
    } finally {
      setIsLoading(false)
    }
  };
  if(isLoading) return <div />

  return (
   <BrowserRouter>
   <div>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
   </div>
   </BrowserRouter>
  )
}

export default App
