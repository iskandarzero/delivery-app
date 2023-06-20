import React from 'react';
import imgBanner from '../imgs/bannerProduct.png';

function BannerProducts() {
  return (
    <div
      className="max-w-[1300px] relative mx-auto
    h-[330px] rounded-xl overflow-hidden"
    >
      <div className="w-full h-full bg-[#060606] opacity-85">
        <img
          className="w-full h-full absolute
        object-cover opacity-40 animation"
          src={ imgBanner }
          alt="banner "
        />

      </div>
      <div className="absolute top-10 left-20 text-white opacity-85">
        <h1
          className="font-bold text-6xl
         tracking-wide leading-normal"
        >
          Bem Vindo ao

        </h1>
        <span
          className="font-bold text-6xl
        animate-pulse text-[#F81127] tracking-wide"
        >
          IDrinks

        </span>
        <p
          className="font-light w-[60%]
        mt-[10px]"
        >
          Compre sua bebida com um simples clique !

        </p>
      </div>
    </div>
  );
}

export default BannerProducts;
