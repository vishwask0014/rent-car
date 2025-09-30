import { DetailCard, HeroSection } from "./components/HomeComp/HomeComp";
import GetCars from "./components/lib/api";

export default function Home() {
  return (
    <>
      <HeroSection />
      <DetailCard />
      {/* <GetCars /> */}
    </>
  );
}
