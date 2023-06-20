import { useEffect, useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar';
import { getAllOrders } from '../services/customerOrders';
import dataTestIds from '../utils/dataTestIds';

export default function OrderCustomer() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const apiOrders = await getAllOrders();
      setOrders(apiOrders);
    };
    getOrders();
  }, []);
  return (
    <div className="container  mx-auto w-full min-h-screen">
      <NavBar />
      <div className="flex justify-center flex-wrap">
        {orders
          && orders.map((sale) => {
            const { id, saleDate, status, totalPrice } = sale;
            const priceTotal = totalPrice.replace('.', ',');
            const date = moment(new Date(saleDate)).format('DD/MM/YYYY');
            return (
              <div key={ id } className="w-[500px]">
                <div className="max-w-sm rounded-sm overflow-hidden shadow-lg m-16">
                  <div className="mx-6 my-4 border-b border-gray-light">
                    <div className="font-medium text-base text-gray-darker mb-4">
                      {` Pedido ${id}`}
                    </div>
                    <p
                      className="font-normal text-gray-dark text-sm mb-2"
                      data-testid={ `${dataTestIds[34]}${id}` }
                    >
                      {`Status : ${status}`}
                    </p>
                    <p
                      className="font-normal text-gray-dark text-sm mb-4"
                      data-testid={ `${dataTestIds[35]}${id}` }
                    >
                      {`Data do pedido: ${date}`}
                    </p>
                  </div>
                  <div className="mx-6 my-4 flex">
                    <span
                      className={ `inline-block bg-red-light 
                  rounded-full p-1 pb-0 mr-[150px]` }
                    >
                      {`Total: R$${priceTotal}`}
                    </span>

                    <Link
                      to={ `/customer/orders/${id}` }
                      className="no-underline"
                    >
                      <button
                        type="button"
                        className={ `text-white bg-gradient-to-r from-red-400
                       via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 
                       focus:outline-none focus:ring-red-300
                       dark:focus:ring-red-800 shadow-lg shadow-red-500/50
                       dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg
                       text-sm px-5 py-2.5 text-center mr-2 mb-2` }
                      >
                        Detalhes
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
