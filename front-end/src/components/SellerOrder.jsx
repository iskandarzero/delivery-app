import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import dataTestIds from '../utils/dataTestIds';

export default function SellerOrder({ order }) {
  const { id, status, saleDate, totalPrice, deliveryAddress, deliveryNumber } = order;

  return (
    <div className="w-[500px]">
      <div className="max-w-sm rounded-sm overflow-hidden shadow-lg m-16">
        <div className="mx-6 my-4 border-b border-gray-light">
          <div className="font-medium text-base text-gray-darker mb-4">
            {` Pedido ${id}`}
          </div>
          <p
            className="font-normal text-gray-dark text-sm mb-2"
            data-testid={ `${dataTestIds[49]}${id}` }
          >
            {`Status : ${status}`}
          </p>
          <p
            className="font-normal text-gray-dark text-sm mb-4"
            data-testid={ `${dataTestIds[50]}${id}` }
          >
            {`Data do pedido: ${moment(new Date(saleDate)).format(
              'DD/MM/YYYY',
            )}`}
          </p>
          <p data-testid={ `${dataTestIds[52]}${id}` }>
            {`Endereço: ${deliveryAddress}, Nº ${deliveryNumber}`}
          </p>
        </div>
        <div className="mx-6 my-4 flex">
          <span
            data-testid={ `${dataTestIds[51]}${id}` }
            className={ `inline-block bg-red-light 
                  rounded-full p-1 pb-0 mr-[150px]` }
          >
            {`Total: R$${totalPrice}`}
          </span>

          <Link
            to={ `/seller/orders/${id}` }
            data-testid={ `${dataTestIds[48]}${id}` }
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
}

SellerOrder.propTypes = {
  order: PropTypes.object,
}.isRequired;
