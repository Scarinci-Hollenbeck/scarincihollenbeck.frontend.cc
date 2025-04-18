import dynamic from 'next/dynamic';
import { LocationsHomeSection, LocationTitle } from 'styles/LocationCard.style';
import { useState } from 'react';
import { ContainerDefault } from '../../../styles/Containers.style';

const LocationCard = dynamic(() => import('components/molecules/home/LocationCard'));

const AllOfficeLocations = ({ offices }) => {
  if (!offices) return null;
  const [officeTitle, setOfficeTitle] = useState(offices[0].title);
  return (
    <LocationsHomeSection>
      <ContainerDefault>
        <LocationTitle>{officeTitle}</LocationTitle>
        <LocationCard setTitle={setOfficeTitle} officesData={offices} />
      </ContainerDefault>
    </LocationsHomeSection>
  );
};
export default AllOfficeLocations;
