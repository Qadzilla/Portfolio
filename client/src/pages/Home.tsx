import { useView } from "@/components/ViewProvider";
import HomeDefault from "@/pages/HomeDefault";
import HomeArtsy from "@/pages/HomeArtsy";
import HomeBrutalist from "@/pages/HomeBrutalist";

export default function Home() {
  const { currentView } = useView();

  switch (currentView) {
    case "artsy":
      return <HomeArtsy />;
    case "brutalist":
      return <HomeBrutalist />;
    case "default":
    default:
      return <HomeDefault />;
  }
}
