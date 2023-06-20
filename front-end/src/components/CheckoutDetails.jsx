import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getUserSalles } from '../services/user';
import dataTestIds from '../utils/dataTestIds';
import { selectProduct } from '../redux/userProducts';

export default function CheckoutDetails({ props }) {
  const [userSelles, setUserSelles] = useState([]);
  const products = useSelector(selectProduct);
  const { infos, setInfos } = props;

  const handdleInput = ({ target }) => {
    setInfos({ ...infos, [target.name]: target.value });
  };

  useEffect(() => {
    const getSelles = async () => {
      const response = await getUserSalles();
      setUserSelles(response.data);
    };
    getSelles();
  }, []);

  const totalPrice = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total.toFixed(2).replace('.', ',');
  };

  return (
    <div className="flex flex-col ml-6">
      <h3 className="text-white text-xl mt-10">Endereços e entrega</h3>
      <label htmlFor="seller" className="text-[#7b7a7a] flex flex-col mb-6 mt-10 w-[90%]">
        P. Vendedora Responsável
        <select
          data-testid={ dataTestIds[29] }
          onChange={ handdleInput }
          name="seller"
          className="text-white text-xl bg-transparent border-b h-[46px]"
        >
          <option>Escolha um vendedor</option>
          {userSelles
            && userSelles.map((seller) => (
              <option key={ seller.id } value={ seller.id }>
                {seller.name}
              </option>
            ))}
        </select>
      </label>
      <label htmlFor="address" className="text-[#7b7a7a] flex flex-col mb-6 w-[90%]">
        Endereço
        <input
          data-testid={ dataTestIds[30] }
          type="text"
          onChange={ handdleInput }
          name="deliveryAddress"
          value={ userSelles.deliveryAddress }
          className="text-white bg-transparent border-b text-xl h-[46px]"
        />
      </label>
      <label htmlFor="number" className="text-[#7b7a7a] flex flex-col mb-[90px] w-[90%]">
        Número
        <input
          data-testid={ dataTestIds[31] }
          type="text"
          onChange={ handdleInput }
          name="deliveryNumber"
          value={ userSelles.deliveryNumber }
          className="text-white bg-transparent border-b text-xl h-[46px]"
        />
      </label>
      <h2
        data-testid={ dataTestIds[28] }
        className="text-white font-bold text-3xl ml-auto mr-auto mb-10"
      >
        {`Total: R$ ${totalPrice()}`}
      </h2>
    </div>
  );
}

CheckoutDetails.propTypes = {
  props: PropTypes.object,
}.isRequired;
