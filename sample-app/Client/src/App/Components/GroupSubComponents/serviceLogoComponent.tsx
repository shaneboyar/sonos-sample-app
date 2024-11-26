import React, { useState, useEffect } from "react";
import GetServiceProviderLogos from "../../UserDetails/getServiceProviderLogos";

interface ServiceLogoComponentProps {
  serviceId: number;
  serviceName: string;
}

const ServiceLogoComponent: React.FC<ServiceLogoComponentProps> = ({ serviceId, serviceName }) => {
  const [logos, setLogos] = useState<{ [key: number]: string }>({});
  const [fetchFlag, setFetchFlag] = useState(true);

  const serviceProviderLogosHandler = (data: { [key: number]: string }) => {
    setLogos(data);
    setFetchFlag(false);
  };

  useEffect(() => {
    if (fetchFlag) {
      GetServiceProviderLogos({ serviceProviderLogosHandler });
    }
  }, [fetchFlag]);

  return (
    <div>
      {!fetchFlag && logos.hasOwnProperty(serviceId) && (
        <div className="msp_logo">
          <img
            width="40px"
            height="40px"
            src={logos[serviceId]}
            alt={serviceName}
          />
        </div>
      )}
    </div>
  );
};

export default ServiceLogoComponent;
