import AppearanceMostRead from "@/components/Home/AppearanceMostRead";
import AppearancePost from "@/components/Home/AppearancePost";
import BalanceDietMostRead from "@/components/Home/BalanceDieMostRead";
import BalanceDietPost from "@/components/Home/BalanceDiet";
import BodyBalance from "@/components/Home/BodyBalance";
import Consultation from "@/components/Home/Consultation";
import Essetials from "@/components/Home/Essetials";
import Hero from "@/components/Home/Hero";
import LatestPost from "@/components/Home/LatestPost";
import LifestylePost from "@/components/Home/LifestyePost";
import LifestyleMostRead from "@/components/Home/LifestyleMostRead";
import Medicine from "@/components/Home/Medicine";
import Radiance from "@/components/Home/Radiance";
// import ShopWithUs from "@/components/Home/ShopWithUs";

export default function Home() {
  return (
    <div>
      <Hero />
      <BodyBalance />
      <Radiance />
      <Medicine />
      {/* <ShopWithUs /> */}
      <LatestPost />
      <Consultation />
      <LifestylePost />
      <LifestyleMostRead />
      <AppearancePost />
      <AppearanceMostRead />
      <BalanceDietPost />
      <BalanceDietMostRead />
      <Essetials />
    </div>
  );
}
