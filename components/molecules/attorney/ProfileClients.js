import React from 'react';
import empty from 'is-empty';
import {
  ProfileClientsList,
  ProfileClientsListItem,
} from 'styles/attorney-page/ProfileClients.style';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ClientSlider = dynamic(() => import('./ClientSlider'));

const ProfileClients = ({ clients }) => {
  const { clientsImages, clientsList } = clients;
  if (empty(clientsImages) && empty(clientsList)) return null;

  return (
    <>
      {!empty(clientsImages) && <ClientSlider clients={clientsImages} />}

      {!empty(clientsList) && (
        <ProfileClientsList>
          {clientsList.map(({ clientLink, clientTitle }) => (
            <ProfileClientsListItem key={clientTitle}>
              {!empty(clientLink) ? (
                <Link
                  href={clientLink}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {clientTitle}
                </Link>
              ) : (
                clientTitle
              )}
            </ProfileClientsListItem>
          ))}
        </ProfileClientsList>
      )}
    </>
  );
};

export default ProfileClients;
