import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import Header from "./Components/Header";
import Coins from "./Components/Coins";
import Home from "./Components/Home";
import CoinDetais from "./Components/CoinDetais";
import Exchanges from "./Components/Exchanges";
import Footer from "./Components/Footer";

function App() {
  return (
     <Router>
     <Header/>
     
      <Routes>
        <Route path="/" element= {<Home/>} />
        <Route path="/coins" element= {<Coins/>} />
        <Route path="/exchanges" element= {<Exchanges/>} />
        <Route path="/coin/:id" element= {<CoinDetais/>} />
      </Routes>

      <Footer/>

     </Router>
  );
}

export default App;
