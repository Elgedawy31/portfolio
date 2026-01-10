import { useEffect, useState } from "react";
import { Globe, Star, MapPin } from "lucide-react";
import { useProfile } from "@/stores/ProfileContext";
import InfoCard from "./InfoCard";

function LocationInfo() {
  const { profile } = useProfile();
  const [showInfo, setShowInfo] = useState(false);
  
  const location = profile?.location;
  const locationState = location?.state || '';
  const locationCountry = location?.country || '';
  const firstLine = locationState ? `BASED IN ${locationState.toUpperCase()}` : 'BASED IN';
  const secondLine = locationCountry || '';

  useEffect(() => {
    // Show info after 2700ms
    const timer = setTimeout(() => {
      setShowInfo(true);
    }, 2700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 absolute bottom-10 ">
      {/* Location Section */}
      {locationState && locationCountry && (
        <InfoCard
          show={showInfo}
          icon={<MapPin className="w-6 h-6 text-green-400"  />}
          firstLine={firstLine}
          secondLine={secondLine}
        />
      )}
      {/* Worldwide Section */}
      <InfoCard
        show={showInfo}
        icon={<Globe className="w-6 h-6 text-cyan-400" />}
        firstLine="AVAILABLE ALL AROUND"
        secondLine="WORLDWIDE"
      />

      {/* Happy Clients Section */}
      <InfoCard
        show={showInfo}
        icon={<Star className="w-6 h-6 text-yellow-400" fill="currentColor" />}
        firstLine="+99 HAPPY CLIENTS"
        secondLine="4.8"
      />

      
    </div>
  );
}

export default LocationInfo;

