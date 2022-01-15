import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders'
import Header from './components/Header';
import Drawer from './components/Drawer/Drawer';
import { AppContext } from './components/context';
import database from './components/database';
import { hideScroll } from './components/function';

function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const items = () => axios.get(`${database}/items`);
    const cart = () => axios.get(`${database}/cart`);
    const favorites = () => axios.get(`${database}/favorites`);
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const fetchDataFromDatabase = async() => {

      try {
        setLoading(true);
        const [itemsResuls, cartResuls, favoritesResuls] = await Promise.all(
          [items(), cart(), favorites(), delay(0)]);
        
        setCartItems(cartResuls.data);
        setFavoriteItems(favoritesResuls.data);
        setItems(itemsResuls.data);
      } catch(e) {
        alert("Ошибка загрузки данных с сервера");
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDataFromDatabase();
  }, []);

  // React.useEffect(() => document.body.style.overflow = cartOpened ? 'hidden' : '', [cartOpened])

  const onAddToCart = (obj) => {
    try {
      const resultFind = cartItems.find(elem => elem.parentId === obj.parentId);
      if (resultFind) {
        onRemoveFromCart(resultFind.id);
      } else {
        axios.post(`${database}/cart`, obj)
        .then(res => setCartItems(prev => [...prev, res.data]));
      }
    } catch(e) {
      console.log(e);
      alert("Не удалось изменить Корзину");
    }
  };

  const onAddToFavorite = (obj) => {
    try {
      const resultFind = favoriteItems.find(elem => elem.parentId === obj.parentId);
      if (resultFind) {
        onRemoveFromFavorites(resultFind.id);
      } else
      axios.post(`${database}/favorites`, obj)
        .then(res => setFavoriteItems(prev => [...prev, res.data]));
    } catch(e) {
      console.log(e);
      alert("Не удалось изменить Закладки");
    }
  };

  const onRemoveFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    axios.delete(`${database}/cart/${id}`);
  }

  const onRemoveFromFavorites = (id) => {
    setFavoriteItems(prev => prev.filter(item => item.id !== id));
    axios.delete(`${database}/favorites/${id}`);
  }

  return (
    <AppContext.Provider value={{ 
      items, favoriteItems, cartItems, setCartItems,  
      onAddToFavorite, onAddToCart, setCartOpened, 
      loading, setLoading }}>

      <div className="wrapper clear">
        {cartOpened && <Drawer 
                        onRemoveFromCart={onRemoveFromCart} 
                        onClose={() => {
                          hideScroll(false);
                          setCartOpened(false);
                        }}
                        cartOpened={cartOpened}
                      />}
        <Header 
          onClickCart={() => {
            hideScroll(true);
            setCartOpened(true);
          }} 
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>

    </AppContext.Provider>
  );
    
}

export default App;
