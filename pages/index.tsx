import BlockchainDescription from '../components/LandingPage/BlockchainDescription';
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
