import React from 'react';
import empty from 'is-empty';
import {
  ProfileAccordionBody,
  ProfileClientsWrapper,
} from 'styles/attorney-page/ProfileAccordion.style';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import AccordionItem from './AccordionItem';

const ClientSlider = dynamic(() => import('./ClientSlider'));

const ProfileClients = ({ clients, name }) => {
  if (empty(clients)) return null;

  return (
    <ProfileClientsWrapper as="li">
      <ClientSlider clients={clients} />
      <AccordionItem
        eventKey={`profile-clients-list-${name}`}
        title="Clients List"
      >
        <ProfileAccordionBody $columnsCountUl={3}>
          <ul>
            {clients.map(({ clientLink, clientTitle }) => (
              <li key={clientTitle}>
                {!empty(clientLink) ? (
                  <Link href={clientLink}>{clientTitle}</Link>
                ) : (
                  clientTitle
                )}
              </li>
            ))}
          </ul>
        </ProfileAccordionBody>
      </AccordionItem>
    </ProfileClientsWrapper>
  );
};

export default ProfileClients;
