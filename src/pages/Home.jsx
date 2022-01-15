import React from "react";

import Card from "../components/Card";
import { Search } from "../components/Search";
import { AppContext } from '../components/context';
import { Loaders } from '../components/LoaderCard'

function Home() {

  const { items, favoriteItems, cartItems, onAddToFavorite, onAddToCart, loading  } = React.useContext(AppContext);
  const [searchValue, setSearchValue] = React.useState('');

  console.log("Render Home");
  
  return(
    <div className="content p-40">
        <h1>Кроссовки</h1>
      <Search 
        searchTitle={"кроссовки"}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

        <div className="d-flex flex-wrap">
          {loading ? <Loaders /> : items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item) => (
            <Card
              key={item.parentId} 
              id = {item.parentId}
              {...item}
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

export default Home;