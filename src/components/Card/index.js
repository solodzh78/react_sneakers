import React from 'react';
import styles from './Card.module.scss';

function Card(props) {

  const { id, parentId, title, imageUrl, price, onFavorite, onPlus, favorited, cartAdded } = props;
  
  const onClickPlus = () => {
    onPlus({ id, parentId, title, imageUrl, price });
  };

  const onClickFavorite = () => {
    onFavorite({ id, parentId, title, imageUrl, price });
  };

  console.log("Render card " + id);

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img src={favorited ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="Unliked" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={cartAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
          alt="Plus"
        />
      </div>
    </div>
  );
}

export default React.memo(Card);
