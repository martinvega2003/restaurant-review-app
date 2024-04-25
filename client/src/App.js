import logo from './logo.svg';
import './App.css';

// IMPORTS DE COMPONENTES:
import Home from './pages/home';
import RestaurantDetails from './pages/restauraqntDetails';
import RestaurantUpdate from './pages/restaurantUpdate';

//IMPORTS DE REACT-ROUTER
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { RestaurantsContextProvider } from './context/RestaurantsContext';

function App() {
  return (
    <RestaurantsContextProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />}/>
            <Route exact path='/restaurants/:id/update' element={<RestaurantUpdate />}/>
            <Route exact path='/restaurants/:id' element={<RestaurantDetails />}/>
          </Routes>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
}

export default App;
