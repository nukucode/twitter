import './App.css';
import Home from './Components/Home/Home';
import Sidebar from './Components/Sidebar/Sidebar';
import Widgets from './Components/Widgets/Widgets';

function App() {
  return (
    <div className="App">
     <Sidebar />
     <Home />
     <Widgets />
    </div>
  );
}

export default App;
