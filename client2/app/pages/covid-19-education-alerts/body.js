import Link from 'next/link';
import ContactForm from '../../components/contact-form';
import Breadcrumbs from './breadcrumbs';
import ArticleDetails from './article-details';
import SocialShareFooter from './social-share-footer';
import AuthorBio from './author-bio';
import { createMarkup, urlify } from '../../utils/helpers';


export default function Body(props) {
  const {
    featuredImage,
    content,
    author,
    eventCat,
    date,
    title,
    tags,
  } = props;



  return (
    <>
      <Breadcrumbs title={title} />
      <img src={featuredImage} className="w-100" alt={title} />
      {/* Author & date & Category */}
      <ArticleDetails author={author} date={date} />
      <hr />
      <div className="post-content" dangerouslySetInnerHTML={createMarkup(content)} />
      {(tags.length > 0) && (
        <div className="small-excerpt ml--21px mb-0">
          <ul className="no-dots list-inline">
            <li className="list-inline-item"><strong>Tag: </strong></li>
            {tags.map((tag, index) => (
              <li key={tag.term_id || tag.ID} className="list-inline-item">
                <Link href="/archives/[slug]" as={`/archives/${urlify(tag.name)}`}> 
                  <a className="blue-link">
                    <u>{tag.name}</u>
                  </a>
                </Link>
                {(index !== tags.length - 1) && ',' }
              </li>
            ))}
          </ul>
        </div>
      )}
      <SocialShareFooter title={title} />
      {/*Author bios */}
      <AuthorBio author={author} />
      {/* Contact form */}
      <div className="w-100 mt-5 hide-print">
        <h4 className="bg-light-gray">{(eventCat) ? 'Contact Us For More Information On This Event' : 'Contact Practice Representative'}</h4>
        <div className="mt-5">
          <ContactForm />
        </div>
      </div> 
    </>
  );
}