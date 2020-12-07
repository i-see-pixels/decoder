import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './screens/Home';
import Signin from './screens/Signin';
import Signup from './screens/Signup';
import ViewPost from './screens/ViewPost';
import CreatePost from './screens/CreatePost';
import ForkedPost from './screens/ForkedPost';
import Navbar from './Navbar';
import CategoryA from './screens/category/CategoryA';
import CategoryB from './screens/category/CategoryB';
import CategoryC from './screens/category/CategoryC';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Navbar />
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <Route exact path="/"><Home/></Route>
        <Route exact path="/signin"><Signin/></Route>
        <Route exact path="/signup"><Signup/></Route>
        <Route exact path="/create"><CreatePost/></Route>
        <Route exact path="/forked"><ForkedPost/></Route>
        <Route exact path="/categoryA"><CategoryA/></Route>
        <Route exact path="/categoryB"><CategoryB/></Route>
        <Route exact path="/categoryC"><CategoryC/></Route>
        <Route exact path="/viewpost/:postId"><ViewPost/></Route>
      </BrowserRouter>
    </div>  
  );
}

export default App;
