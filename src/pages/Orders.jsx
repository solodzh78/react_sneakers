import React from 'react';
import axios from 'axios';

import Card from '../components/Card';
import { Loaders } from '../components/LoaderCard'
import { AppContext } from '../components/context';
import database from '../components/database'
import { Search } from '../components/Search';

function Orders() {
  const { cartItems, favoriteItems, onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${database}/orders`);
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <h1>Мои заказы</h1>
      <Search 
        searchTitle={"заказы"}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className="d-flex flex-wrap">
        {isLoading ? <Loaders /> 
          : orders.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map((item, index) => (
              <Card 
                key={item ? String(item.parentId) + String(index) : index} 
                loading={isLoading} 
                {...item}
                favorited={favoriteItems.some(elem => elem.parentId === item.parentId)}
                cartAdded={cartItems.some(elem => elem.parentId === item.parentId)} 
                onFavorite={(obj) => onAddToFavorite(obj)}
                onPlus={(obj) => onAddToCart(obj)}
                />
            ))}
      </div>
    </div>
  );
}

export default Orders;