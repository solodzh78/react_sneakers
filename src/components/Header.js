import { Link } from 'react-router-dom';
import useCart from './Hooks/useCart';

function Header({ onClickCart }) {

  const { total, cartCount } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="Logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={onClickCart} className="mr-30 cu-p">
          <div className='cart'>
            <img width={18} height={18} src="/img/cart.svg" alt="Cart" />
            {!!cartCount && <div className="cartCount">{cartCount}</div>}
            <span>{total} руб.</span>
          </div>
        </li>
        <Link to="/favorites">
          <li>
          <img className="cu-p mr-20" width={18} height={18} src="/img/heart.svg" alt="Favotites" />
          </li>
        </Link>
        <Link to="/orders">
          <li>
          <img width={18} height={18} src="/img/user.svg" alt="User" />
        </li>
        </Link>
      </ul>
    </header>
  );
}

export default Header;
