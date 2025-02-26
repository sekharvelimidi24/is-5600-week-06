import Header from './components/Header';
import CardList from './components/CardList';
import { Route, Routes } from 'react-router-dom';
import productData from './data/full-products';
import SingleView from './components/SingleView';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<CardList data={productData} />} />
        <Route path="/product/:id" element={<SingleView data={productData} />} />
      </Routes>
    </div>
  );
}

export default App;
