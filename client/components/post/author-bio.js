import Link from 'next/link';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import lineHeaderStyles from 'styles/LineHeader.module.css';
import fontStyles from 'styles/Fonts.module.css';

import { createMarkup } from 'utils/helpers';

export default function PostAuthorBio({ author }) {
  return (
    <div className="w-100 d-print-none mt-5">
      {author
        && author.map((a) => (
          <div key={a.name} className="mb-2">
            <div className={`${lineHeaderStyles.lineHeader} d-print-none mt-3`}>
              <h3>
                About
                {' '}
                {a.name}
              </h3>
            </div>
            <div className="d-flex flex-row flex-wrap mt-4 mh-160">
              <div className="mx-2 mt-4 d-block">
                <Image src={a.image} alt={a.name} width={110} height={147} />
              </div>
              <p className={`${fontStyles.smallExcerpt} w-75 m-auto`}>
                <span
                  dangerouslySetInnerHTML={createMarkup(a.bio)}
                  className="d-block"
                />
                {a.name !== 'Scarinci Hollenbeck' && (
                  <Button variant="danger" className="mt-3" size="sm">
                    <Link href={a.link ? a.link : '/attorneys/'}>
                      <a className={`${fontStyles.smallExcerpt} text-white`}>
                        Full Biography &gt;&gt;
                      </a>
                    </Link>
                  </Button>
                )}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
