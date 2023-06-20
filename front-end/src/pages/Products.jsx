import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BannerProducts from '../components/BannerProducts';
import NavBar from '../components/Navbar';
import Product from '../components/Product';
import { getProducts } from '../services/product';
import datatestids from '../utils/dataTestIds';
import iconCart from '../imgs/iconCart.svg';

export default function Products() {
  const [products, setProducts] = useState([]);
  const { token } = JSON.parse(localStorage.getItem('user'));
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const saveProducts = async () => {
      const data = await getProducts(token);
      setProducts([...data]);
    };
    saveProducts();
  }, [token]);

  const checkoutPage = () => {
    if (totalPrice > 0) {
      navigate('/customer/checkout');
    }
  };

  return (
    <div className="container mx-auto w-full min-h-screen">
      <NavBar />
      <BannerProducts />
      <div
        className="flex flex-wrap py-5 justify-evenly
        max-w-[1300px] mx-auto items-center"
      >
        {products.map((product) => (
          <Product
            key={ product.id }
            product={ product }
            totalPriceFunc={ setTotalPrice }
            totalPrice={ totalPrice }
          />
        ))}
      </div>
      <button
        onClick={ () => checkoutPage() }
        type="button"
        className="bg-[#F81127] flex items-center
        justify-around w-[270px] h-16 rounded-[20px] fixed right-5
        bottom-5"
        disabled={ totalPrice === 0 }
        data-testid={ datatestids[21] }
      >
        <img src={ iconCart } alt="cart icon" />
        <p
          data-testid="customer_products__checkout-bottom-value "
          className="text-white"
        >
          Subtotal:
          <span className="font-bold">
            {` R$ ${totalPrice.toFixed(2).replace('.', ',')}`}
          </span>
        </p>
      </button>
    </div>
  );
}
