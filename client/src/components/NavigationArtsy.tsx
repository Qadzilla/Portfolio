import { motion } from "framer-motion";
import { useView } from "@/components/ViewProvider";
import orangutanCouch from "@assets/ChatGPT_Image_Feb_1,_2026_at_10_46_23_PM_1770004001470.png";
import orangutanBinoculars from "@assets/ChatGPT_Image_Feb_5,_2026_at_12_44_36_AM_1770270374434.png";

export function NavigationArtsy() {
  const { views, currentView, setView } = useView();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Classic view button - orangutan on couch */}
          <button
            onClick={() => {
              setView("default");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center cursor-pointer"
            aria-label="Switch to Classic view"
            data-testid="button-view-classic-artsy"
          >
            <img
              src={orangutanCouch}
              alt="Orangutan on couch - Classic view"
              className="w-20 h-20 object-contain"
            />
          </button>

          {/* Immersive view button - orangutan with binoculars */}
          <button
            onClick={() => {
              setView("artsy");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center cursor-pointer"
            aria-label="Switch to Immersive view"
            data-testid="button-view-immersive-artsy"
          >
            <img
              src={orangutanBinoculars}
              alt="Orangutan with binoculars - Immersive view"
              className="w-24 h-24 object-contain"
            />
          </button>
        </div>

      </nav>
    </motion.header>
  );
}
