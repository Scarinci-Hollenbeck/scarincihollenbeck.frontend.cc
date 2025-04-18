import React, { useState } from 'react';
import {
  Contact,
  ContactInfoCard,
  ContactInfoContent,
  LocationCardMain,
  LocationHeader,
  LocationHeaderTitle,
  LocationOffices,
  MapBox,
} from 'styles/LocationCard.style';
import { BsChevronRight, BsFillGeoAltFill } from 'react-icons/bs';
import { globalColor } from 'styles/global_styles/Global.styles';
import empty from 'is-empty';
import { HiMiniPhone } from 'react-icons/hi2';
import { HiPrinter } from 'react-icons/hi';
import Map from '../location/Map';
import DirectionsFilesLink from '../../common/DirectionsFilesLink';

const colorActiveIcons = globalColor.blue.blue400;
const colorInactiveIcons = globalColor.blue.blue500;

const sizeIcons = 28;

export default function LocationCard({ officesData, setTitle }) {
  const [cardIndex, setCardId] = useState(0);
  const handleChangeTitle = (title, index) => {
    setTitle(title);
    setCardId(index);
  };

  return (
    <LocationCardMain>
      <MapBox>
        <Map
          title={
            !cardIndex
              ? officesData[0].title
              : officesData[`${cardIndex}`].title
          }
          map={
            !cardIndex
              ? officesData[0]?.mapAddress
              : officesData[`${cardIndex}`]?.mapAddress
          }
        />
      </MapBox>
      <LocationOffices>
        {officesData.map((office, idx) => (
          <ContactInfoCard
            key={office.databaseId}
            openCard={cardIndex === idx}
            onClick={() => handleChangeTitle(office.title, idx)}
          >
            <LocationHeader isActive={cardIndex === idx}>
              <LocationHeaderTitle isActive={cardIndex === idx}>
                {office.title}
              </LocationHeaderTitle>
              <BsChevronRight
                color={
                  cardIndex === idx ? colorActiveIcons : colorInactiveIcons
                }
                size={20}
              />
            </LocationHeader>
            <ContactInfoContent isOpen={cardIndex === idx}>
              <ul className="address-list">
                <Contact>
                  <BsFillGeoAltFill
                    color={globalColor.gray.gray500}
                    size={sizeIcons}
                  />
                  <span>
                    {office.streetAddress}
                    {!empty(office.streetAddress) && ', '}
                    {office.floor}
                    {!empty(office?.floor) && ', '}
                    {office.title.split(',')[0].trim()}
                    {', '}
                    {office.addressRegion}
                    {' '}
                    {office.postCode}
                  </span>
                </Contact>
                <Contact>
                  <HiMiniPhone
                    color={globalColor.gray.gray500}
                    size={sizeIcons}
                  />
                  <span>{office.phone}</span>
                </Contact>
                <Contact>
                  <HiPrinter
                    color={globalColor.gray.gray500}
                    size={sizeIcons}
                  />
                  <span>{office.fax}</span>
                </Contact>
              </ul>
            </ContactInfoContent>
          </ContactInfoCard>
        ))}
      </LocationOffices>

      <DirectionsFilesLink currentOffice={officesData[`${cardIndex}`]} />
    </LocationCardMain>
  );
}
