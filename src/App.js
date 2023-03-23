import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home  from './Pages/Home.js'
import Chat  from './Pages/Chat.js'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
           <Route path="/" element= {<Login/>}/>
           <Route path="/newuser" element= {<Signup/>}/>
           <Route path="/home" element= {<Home/>}/>
           <Route path="/chats" element= {<Chat/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
