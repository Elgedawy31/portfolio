import { useEffect, useState } from "react";
import { Globe, Star, MapPin } from "lucide-react";
import InfoCard from "./InfoCard";

function LocationInfo() {
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // Show info after 2700ms
    const timer = setTimeout(() => {
      setShowInfo(true);
    }, 2700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 relative -top-6">
      {/* Location Section */}
      <InfoCard
        show={showInfo}
        icon={<MapPin className="w-6 h-6 text-green-400"  />}
        firstLine="BASED IN DUBAI"
        secondLine="UAE"
      />
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

