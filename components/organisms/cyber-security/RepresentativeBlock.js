import Image from 'next/image';
import Link from 'next/link';
import React, { useId } from 'react';

import { ContainerContent } from 'styles/practices-special-style/commonForSpecial.style';
import {
  RepresentativeBg, RepresentativeHolder, RepresentativeInfo, RepresentativeSection,
} from 'styles/practices-special-style/cyber-security/Representative.style';

const RepresentativeBlock = ({ representativeData }) => {
  const {
    title, text, list, bg,
  } = representativeData;
  return (
    <RepresentativeSection>
      <RepresentativeBg>
        <Image src={bg.sourceUrl} alt={bg.alt} width={bg.width} height={bg.height} />
      </RepresentativeBg>
      <ContainerContent>
        <RepresentativeHolder>
          <div className="bage">Safeguarding Your Business</div>
          <h2>{title}</h2>
          <p>{text}</p>
          <RepresentativeInfo>
            <ul>
              {list.map((item) => (
                <li key={useId()}>{item}</li>
              ))}
            </ul>
            <Link href="#">
              See more
            </Link>
          </RepresentativeInfo>
        </RepresentativeHolder>
      </ContainerContent>
    </RepresentativeSection>
  );
};

export default RepresentativeBlock;
