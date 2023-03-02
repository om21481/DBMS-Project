import Trips from "./Components/Make_Trip/Trips.jsx";
import Make_Trips from "./Components/Make_Trip/Make_Trips.jsx";
import BookARide from "./Components/Book/book_a_ride.jsx";
import Navbar from "./Components/Navbar.jsx";

import Test from "./Components/test.js";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";



import Client from "./Pages/Client.js";

function App() {
  return (
    <>
    {/* <BrowserRouter>
      <Routes>

      <Route path='/' element={<BookARide/>}/>
      <Route path="/MakeTrips" element={<Make_Trips/>}/>
      
      </Routes>
    </BrowserRouter>

    <Test/> */}

    <Client/>
    </>
  );
}

export default App;
