import React from 'react';
import { Title32 } from 'styles/common/Typography.style';
import empty from 'is-empty';
import { SectionHeaderWrapper } from 'styles/SectionHeader.style';
import { StandardBlueButton } from 'styles/Buttons.style';
import Link from 'next/link';

const SectionHeader = ({
  title, linkText = 'Read more', link, titleAs,
}) => (
  <SectionHeaderWrapper>
    {!empty(title) && <Title32 as={titleAs}>{title}</Title32>}

    {!empty(link) && (
      <StandardBlueButton as={Link} href={link}>
        {linkText}
      </StandardBlueButton>
    )}
  </SectionHeaderWrapper>
);

export default SectionHeader;
