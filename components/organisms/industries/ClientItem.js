import Image from 'next/image';
import React from 'react';
import {
  ClientContent,
  ClientContentWrapper,
  ClientImage,
  ClientLabel,
  ClientOpener,
  ClientOpenerIcon,
  ClientOpenerWrapper,
  ClientTexts,
  ClientTitle,
  IndustryClientsItem,
} from 'styles/industries/IndustryClients.style';

const ClientItem = ({
  label, title, image, isActive, onClick,
}) => (
  <IndustryClientsItem className={isActive ? 'active' : ''} onClick={onClick}>
    <ClientOpener>
      <ClientOpenerWrapper>
        <ClientTexts>
          <ClientLabel>{label}</ClientLabel>
          <ClientTitle>{title}</ClientTitle>
        </ClientTexts>

        <ClientOpenerIcon $isActive />
      </ClientOpenerWrapper>
    </ClientOpener>
    <ClientContent>
      <ClientContentWrapper>
        <ClientTexts>
          <ClientLabel>{label}</ClientLabel>
          <ClientTitle as="p">{title}</ClientTitle>
        </ClientTexts>

        <ClientImage>
          <Image src={image} alt={title} width={240} height={240} />
        </ClientImage>

        <ClientOpenerIcon $isActive />
      </ClientContentWrapper>
    </ClientContent>
  </IndustryClientsItem>
);

export default ClientItem;
