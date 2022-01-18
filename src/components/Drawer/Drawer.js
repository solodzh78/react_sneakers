import React from 'react';
import axios from 'axios';

import Info from '../Info';
import { useCart } from '../Hooks/useCart'
import database from '../database';

import styles from './Drawer.module.scss';

function Drawer({ onClose, onRemoveFromCart, cartOpened }) {

  const { cartItems, setCartItems, total } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [goVisible, setGoVisible] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {setGoVisible(true)}, 0)
  }, []);

  const makeOrder = () => {

    (async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.post(`${database}/orders`, {items: cartItems});
        for (let i = 0; i < cartItems.length; i++) {
          await axios.delete(`${database}/cart/${(cartItems[i].id)}`);
          await new Promise(resolve => setTimeout(resolve, 500));
        } 
        setOrderId(data.id);
        setIsOrderComplete(true);
        setCartItems([]);   
      } catch (e) {
        console.log(e);
        alert("Не удалось оформить заказ");
      }
      setIsLoading(false);
    })()
  };

  const onClickClose = () => {
    setGoVisible(false);
    setTimeout(onClose, 300);
    setIsOrderComplete(false);
  }

  return (
    <div 
      className={`${styles.overlay} ${goVisible ? styles.overlayVisible : ''}`}
    >
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина <img onClick={onClickClose} className="cu-p" src="img/btn-remove.svg" alt="Close" />
        </h2>

        {cartItems.length > 0 ? <><div className={styles.items}>
          {cartItems.map((obj) => {
            return(
            <div key={obj.id} className="cartItem d-flex align-center mb-20">
              <div
                style={{ backgroundImage: `url(${obj.imageUrl})` }}
                className="cartItemImg"></div>

              <div className="mr-20 flex">
                <p className="mb-5">{obj.title}</p>
                <b>{obj.price} руб.</b>
              </div>
              <img onClick={() => onRemoveFromCart(obj.id)} className="removeBtn" src="img/btn-remove.svg" alt="Remove" />
            </div>
          )})}
        </div>

        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>{total} руб. </b>
            </li>
            <li>
              <span>Налог 5%:</span>
              <div></div>
              <b>{Math.round(0.05 * total)} руб. </b>
            </li>
          </ul>
          <button disabled={isLoading} className="greenButton" onClick={makeOrder}>
            Оформить заказ <img src="img/arrow.svg" alt="Arrow" />
          </button>
        </div></> : 
        <Info
          title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'}
          description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
          }
          image={isOrderComplete ? 'img/complete-order.jpg' : 'img/empty-cart.jpg'}
          onClose={onClickClose}
        />
        }
      </div>
    </div>
  );
}

export default Drawer;
