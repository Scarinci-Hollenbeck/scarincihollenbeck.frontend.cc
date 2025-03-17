import SubHeaderKeyContacts from 'layouts/SubHeader/SubHeaderKeyContacts';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CURRENT_DOMAIN } from 'utils/constants';
import {
  SubHeaderMain,
  SubHeaderPrintVersionContainer,
} from 'styles/practices/PracticePrintPage.style';
import { Title32 } from 'styles/common/Typography.style';
import SubHeaderAuthors from 'layouts/SubHeader/SubHeaderAuthors';
import SubHeaderDate from 'layouts/SubHeader/SubHeaderDate';
import SubHeaderCategory from 'layouts/SubHeader/SubHeaderCategory';

const PostSubheaderPrint = ({
  title,
  keyContacts,
  authors,
  category,
  date,
}) => {
  const { asPath } = useRouter();

  const cleanedPathname = asPath.split('#')[0];

  return (
    <SubHeaderPrintVersionContainer className="post-print-container">
      <SubHeaderKeyContacts keyContacts={keyContacts} isPrint />

      <SubHeaderMain>
        <SubHeaderCategory
          categoryTitle={category?.name}
          categoryColor={category?.categoryFields?.color}
        />
        <Title32 as="h1">{title}</Title32>

        <Link href={`${CURRENT_DOMAIN}${cleanedPathname}`}>
          {`${CURRENT_DOMAIN}${cleanedPathname}`}
        </Link>

        <SubHeaderAuthors authors={authors} />

        <SubHeaderDate date={date} />
      </SubHeaderMain>
    </SubHeaderPrintVersionContainer>
  );
};

export default PostSubheaderPrint;
