import { Suspense, lazy } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const IntroSpotlightMobile = lazy(() => import("./IntroSpotlightMobile"));
const IntroSpotlightDesktop = lazy(() => import("./IntroSpotlightDesktop"));

function IntroSpotlight() {
  const isMobile = useIsMobile();

  return (
    <Suspense fallback={null}>
      {isMobile ? <IntroSpotlightMobile /> : <IntroSpotlightDesktop />}
    </Suspense>
  );
}

export default IntroSpotlight;
