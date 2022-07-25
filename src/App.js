import './App.css';
import Home from './Components/Home/Home';
import Sidebar from './Components/Sidebar/Sidebar';
import Widgets from './Components/Widgets/Widgets';
import {useSelector} from 'react-redux';
import Login from './Components/Login/Login';
function App() {

  const user = useSelector((state) => state.login.user)
  console.log(user)
  
  return (
    <>
    {
      user ? <div className="App">
      <Sidebar />
      <Home />
      <Widgets />
     </div> : <Login />
    }
    </>
  );
}

export default App;
