import { useView } from "@/components/ViewProvider";
import { useIsMobileSm } from "@/hooks/use-mobile";
import HomeDefault from "@/pages/HomeDefault";
import HomeArtsy from "@/pages/HomeArtsy";
import HomeBrutalist from "@/pages/HomeBrutalist";
import HomeArtsyMobile from "@/pages/HomeArtsyMobile";
import HomeBrutalistMobile from "@/pages/HomeBrutalistMobile";

export default function Home() {
  const { currentView } = useView();
  const isMobile = useIsMobileSm();

  switch (currentView) {
    case "artsy":
      return isMobile ? <HomeArtsyMobile /> : <HomeArtsy />;
    case "brutalist":
      return isMobile ? <HomeBrutalistMobile /> : <HomeBrutalist />;
    case "default":
    default:
      return <HomeDefault />;
  }
}
