import Tooltip from 'components/atoms/Tooltip';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import { ContainerContent } from 'styles/practices-special-style/commonForSpecial.style';
import {
  EntertainmentActionBlockContentImage,
  EntertainmentClientsDescription,
  EntertainmentClientsItem,
  EntertainmentClientsItemCategory,
  EntertainmentClientsItemContent,
  EntertainmentClientsItemContentCategory,
  EntertainmentClientsItemContentName,
  EntertainmentClientsItemContentProfession,
  EntertainmentClientsItemContentWrapper,
  EntertainmentClientsItemName,
  EntertainmentClientsItemOpener,
  EntertainmentClientsItemOpenerWrapper,
  EntertainmentClientsItemProfession,
  EntertainmentClientsList,
  EntertainmentClientsListItems,
  EntertainmentClientsSection,
  EntertainmentClientsSubtitle,
  EntertainmentClientsTitle,
} from 'styles/practices-special-style/ent-adn-media/EntertainmentClientsBlock.style';
import PaginationButtons from '../../atoms/PaginationButtons';
import Loader from '../../atoms/Loader';

const cuttingColor = (colorString) => {
  const regex = /#[A-Fa-f0-9]{6}(?:[A-Fa-f0-9]{2})?/g;
  return colorString.match(regex);
};
const EntertainmentClientsBlock = ({
  title,
  description,
  clientsApolloProps,
}) => {
  const [openItemId, setOpenItemId] = useState(null);

  const handleShowContent = (itemId) => {
    if (openItemId === itemId) {
      setOpenItemId(null);
    } else {
      setOpenItemId(itemId);
    }
  };

  const {
    handleClientsPrevPagination,
    handleClientsNextPagination,
    data,
    loading,
    error,
  } = clientsApolloProps;

  const disablePrevBtn = !data?.clients?.pageInfo.hasPreviousPage;
  const disableNextBtn = !data?.clients?.pageInfo.hasNextPage;

  const memoData = useMemo(() => data?.clients?.edges, [data]);
  return (
    <EntertainmentClientsSection>
      <ContainerContent>
        <EntertainmentClientsSubtitle>
          Representative Clients
        </EntertainmentClientsSubtitle>
        <EntertainmentClientsTitle>{title}</EntertainmentClientsTitle>
        <EntertainmentClientsDescription>
          {description}
        </EntertainmentClientsDescription>
        <EntertainmentClientsList>
          <PaginationButtons
            justArrow
            handleNextPagination={handleClientsNextPagination}
            handlePrevPagination={handleClientsPrevPagination}
            countOfArticles={10}
            disablePrevBtn={disablePrevBtn}
            disabledNextBtn={disableNextBtn}
          />
          <EntertainmentClientsListItems>
            {!loading ? (
              <>
                {memoData.map(({ node }) => (
                  <EntertainmentClientsItem
                    onClick={() => handleShowContent(node.databaseId)}
                    key={node.databaseId}
                    color={cuttingColor(node.clientsFields.lineColor)}
                    className={
                      openItemId === node.databaseId
                        ? 'open fade-in'
                        : 'fade-in'
                    }
                  >
                    <EntertainmentClientsItemOpener>
                      <EntertainmentClientsItemOpenerWrapper>
                        <EntertainmentClientsItemCategory>
                          <Tooltip
                            textTooltip={
                              node.clientsFields.entertainmentSubcategory
                            }
                          >
                            {node.clientsFields.entertainmentSubcategory}
                          </Tooltip>
                          <div className="delimiter">/</div>
                        </EntertainmentClientsItemCategory>

                        <EntertainmentClientsItemName>
                          <Tooltip textTooltip={node.title}>
                            {node.title}
                          </Tooltip>
                        </EntertainmentClientsItemName>

                        <EntertainmentClientsItemProfession>
                          <div className="delimiter">/</div>
                          <Tooltip textTooltip={node.clientsFields.proffesion}>
                            {node.clientsFields.proffesion}
                          </Tooltip>
                        </EntertainmentClientsItemProfession>
                      </EntertainmentClientsItemOpenerWrapper>
                    </EntertainmentClientsItemOpener>
                    <EntertainmentClientsItemContent>
                      <EntertainmentClientsItemContentWrapper>
                        <EntertainmentClientsItemContentCategory>
                          {node.clientsFields.entertainmentSubcategory}
                        </EntertainmentClientsItemContentCategory>
                        <EntertainmentActionBlockContentImage>
                          <Image
                            src={node.clientsFields.clientImage.sourceUrl}
                            alt={node.title}
                            width={240}
                            height={240}
                          />
                        </EntertainmentActionBlockContentImage>
                        <EntertainmentClientsItemContentName>
                          {node.title}
                        </EntertainmentClientsItemContentName>
                        <EntertainmentClientsItemContentProfession>
                          {node.clientsFields.proffesion}
                        </EntertainmentClientsItemContentProfession>
                      </EntertainmentClientsItemContentWrapper>
                    </EntertainmentClientsItemContent>
                  </EntertainmentClientsItem>
                ))}
              </>
            ) : (
              <Loader />
            )}
          </EntertainmentClientsListItems>
        </EntertainmentClientsList>
      </ContainerContent>
    </EntertainmentClientsSection>
  );
};

export default EntertainmentClientsBlock;
