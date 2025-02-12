import React, { useCallback, useMemo, useState } from 'react';
import {
  IndustryClientsBlock,
  IndustryClientsHolder,
  IndustryClientsItems,
  IndustryClientsSection,
} from 'styles/industries/IndustryClients.style';
import empty from 'is-empty';
import { ContainerDefault } from 'styles/Containers.style';
import { Title60 } from 'styles/common/Typography.style';
import ContentRender from 'components/atoms/ContentRender';
import Loader from 'components/atoms/Loader';
import CustomPagination from 'components/atoms/CustomPagination';
import ClientItem from './ClientItem';

const IndustryClients = ({
  title,
  description,
  clientsPaginationData,
  anchorId,
}) => {
  const [openItemId, setOpenItemId] = useState(null);

  const handleShowContent = useCallback((itemId) => {
    setOpenItemId((prev) => (prev === itemId ? null : itemId));
  }, []);

  const {
    clients, loading, error, page, limit,
  } = clientsPaginationData;

  const memoData = useMemo(() => clients?.edges, [clientsPaginationData]);

  if (error || (!loading && empty(memoData))) {
    return null;
  }

  return (
    <IndustryClientsSection id={anchorId} className="margin-scroll">
      <ContainerDefault>
        <IndustryClientsHolder>
          {!empty(title) && <Title60>{title}</Title60>}

          <ContentRender
            customClass="clients-description"
            content={description}
          />
          <IndustryClientsBlock>
            <CustomPagination
              totalItems={clients?.pageInfo?.offsetPagination?.total}
              currentPage={page}
              limit={limit}
              queryParam="client-page"
              between={3}
              ellipsis={1}
            />

            <IndustryClientsItems>
              {!loading ? (
                memoData?.map(({ node }) => (
                  <ClientItem
                    key={node?.databaseId}
                    title={node?.title}
                    label={node?.clientsFields?.proffesion}
                    image={node?.clientsFields?.clientImage?.sourceUrl}
                    isActive={node?.databaseId === openItemId}
                    onClick={() => handleShowContent(node?.databaseId)}
                  />
                ))
              ) : (
                <Loader />
              )}
            </IndustryClientsItems>
          </IndustryClientsBlock>
        </IndustryClientsHolder>
      </ContainerDefault>
    </IndustryClientsSection>
  );
};

export default IndustryClients;
