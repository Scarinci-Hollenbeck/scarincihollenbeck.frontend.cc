import Link from 'next/link';
import { Container } from 'react-bootstrap';
import Image from 'next/image';
import TileContact from 'components/molecules/contact-us/TileContact';
import {
  ArticleBox,
  ErrorContent,
  ErrorHolder,
  ErrorWrapper,
  ImageBlindLady,
  LinkListBox404,
  TilesBox,
} from '../../styles/404.style';
import BreadCrumbs from '../organisms/common/BreadCrumbs';
import {
  tile404ContentArr,
  tilesErrorContentArr,
} from '../../utils/tileContent';
import { Links404NavArr } from '../../utils/constants';

const ErrorPage = ({
  title, subTitle, mainMessage, isErrorContent,
}) => {
  const linkTiles = !isErrorContent ? tile404ContentArr : tilesErrorContentArr;
  const isErrorContentStyled = isErrorContent ? 'true' : '';
  return (
    <ErrorWrapper>
      <Container>
        <BreadCrumbs />

        <ErrorHolder>
          <ErrorContent>
            <ArticleBox>
              <h1>{title}</h1>
              <p className="error-subtitle">{subTitle}</p>
              <p className="error-message">{mainMessage}</p>
            </ArticleBox>
            <TilesBox isErrorContent={isErrorContentStyled}>
              {linkTiles.map((tile) => (
                <TileContact
                  key={tile.id}
                  title={tile.title}
                  textContent={tile.textContent}
                  icon={tile.icon}
                  image={tile.image}
                />
              ))}
            </TilesBox>
            <LinkListBox404>
              <p>
                Or try visiting one of these pages on our site to narrow your
                search.
              </p>
              <ul className="text-list">
                {Links404NavArr.map((link) => (
                  <li key={link.id}>
                    <Link href={link.href}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            </LinkListBox404>
          </ErrorContent>

          <ImageBlindLady>
            <Image
              src="/images/404.webp"
              width={700}
              height={600}
              alt="Attorneys near work."
              priority
              loading="eager"
            />
          </ImageBlindLady>
        </ErrorHolder>
      </Container>
    </ErrorWrapper>
  );
};

export default ErrorPage;
