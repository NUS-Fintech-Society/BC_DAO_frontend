import React from 'react';
import NavBar from '../components/Layout/NavBar';
import Header from '../components/LandingPage/Header';
import BlockChainDescription from '../components/LandingPage/BlockChainDescription';
import CoinInfo from '../components/LandingPage/CoinInfo';

export default function index() {
  return (
    <div>
      <NavBar />
      <Header />
      <BlockChainDescription />
      <CoinInfo />
    </div>
  );
}
