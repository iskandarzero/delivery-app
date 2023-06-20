import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from '../components/Navbar';
import CarShop from '../components/CarShop';
import CheckoutDetails from '../components/CheckoutDetails';
import { createOrder } from '../services/customerOrders';
import { selectProduct } from '../redux/userProducts';
import datatestids from '../utils/dataTestIds';

export default function Checkout() {
  const navigate = useNavigate();
  const products = useSelector(selectProduct);
  const [infos, setInfos] = useState({
    seller: '',
    deliveryAddress: '',
    deliveryNumber: '',
    totalPrice: '',
  });

  const getTotalPrice = async () => {
    const totalPrice = products.reduce((acc, { price, quantity }) => {
      acc += price * quantity;
      return acc;
    }, 0);
    infos.totalPrice = totalPrice.toFixed(2);
  };

  const finalizedBuy = async () => {
    await getTotalPrice();
    const orderId = await createOrder({ ...infos, items: products });
    navigate(`/customer/orders/${orderId}`);
  };

  return (
    <div>
      <NavBar />
      <div className="flex flex-row w-full justify-between mt-10">
        <div className="ml-[132px]">
          <h1 className="font-bold text-2xl">Finalizar pedidos</h1>
          <div className="mt-10">
            <CarShop />
          </div>
        </div>
        <div
          className={ `flex flex-row
          bg-black px-10 h-[700px] w-[600px] mr-5` }
        >
          <div className="flex flex-col">
            <CheckoutDetails props={ { infos, setInfos } } />

            <button
              className={ `bg-[#F81127] w-[450px]
              h-16 rounded-[3px] text-white font-bold text-2xl ml-[35px]` }
              type="button"
              data-testid={ datatestids[32] }
              onClick={ finalizedBuy }
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
