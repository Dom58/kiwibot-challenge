import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from './config/names';
import Home from './pages/home';
import About from './pages/about';
import Delivery from './pages/deliveries/deliveries';
import GetDelivery from './pages/deliveries/getDelivery';
import Bots from './pages/bots';
import NotFound from './pages/notFound';
import './App.css';

toast.configure({
  autoClose: 4000,
});

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={routes.getDelivery} element={<GetDelivery />} />
          <Route path={routes.home} exact element={<Home />} />
          <Route path={routes.about} element={<About />} />
          <Route path={routes.deliveries} element={<Delivery />} />
          <Route path={routes.bots} element={<Bots />} />
          <Route path="*" element={<NotFound to ={routes.notFound} />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
