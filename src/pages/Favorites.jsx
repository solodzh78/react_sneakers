import React from "react";

import Card from "../components/Card";
import { Search } from "../components/Search";
import { AppContext } from '../components/context';

function Favorites() {

  const { favoriteItems, cartItems, onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [searchValue, setSearchValue] = React.useState('');

  return(
    <div className="content p-40">
        <h1>Мои закладки</h1>
      <Search 
        searchTitle={"закладки"}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

        <div className="d-flex flex-wrap">
          {favoriteItems.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item) => (
            <Card
              key={item.id} 
              id={item.id}
              parentId={item.parentId}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={(obj) => onAddToFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              favorited={favoriteItems.some(elem => elem.parentId === item.parentId)}
              cartAdded={cartItems.some(elem => elem.parentId === item.parentId)} 
            />
          ))}
        </div>
      </div>
  );
}

export default Favorites;