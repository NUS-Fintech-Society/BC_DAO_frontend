import BlockchainDescription from '../components/LandingPage/BlockChainDescription';
import CoinInfo from '../components/LandingPage/CoinInfo';
import HeroBanner from '../components/LandingPage/HeroBanner';

export default function Index() {
  return (
    <>
      <HeroBanner />
      <BlockchainDescription />
      <CoinInfo />
    </>
  );
}
