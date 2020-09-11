import Router from 'next/router';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';

function onCategorySelection(event) {
  Router.push({ pathname: event.target.value });
}

const Categories = () => (
  <div>
    <h4 className="red-title h5">Firm Insights</h4>
    <hr />
    <p className="text-muted">Firm Insights is Scarinci Hollenbeck&apos;s library of articles written by our attorneys. It is our way of providing you with the most critical legal updates that could impact your business.</p>
    <Form onChange={onCategorySelection}>
      <Form.Group controlId="firmInsightSelection">
        <Form.Label>
          <p className="text-muted">
            Know what you&apos;re looking for? Select a category below:
          </p>
        </Form.Label>
        <Form.Control as="select" className="home-select w-100 p-2">
          <option>Select Category</option>
          <option value="/category/business-law/" role="button">Business Law</option>
          <option value="/category/cannabis-law/" role="button">Cannabis Law</option>
          <option value="/category/commercial-real-estate/" role="button">Commercial Real Estate</option>
          <option value="/category/entertainment-and-media/" role="button">Entertainment and Media</option>
          <option value="/category/environmental-land-use/" role="button">Environmental and Land Use</option>
          <option value="/category/intellectual-property/" role="button">Intellectual Property</option>
          <option value="/category/labor-employment/" role="button">Labor and Employment</option>
          <option value="/category/litigation/" role="button">Litigation</option>
          <option value="/category/public-law/" role="button">Public Law</option>
          <option value="/category/tax/" role="button">Tax</option>
          <option value="/category/technology/" role="button">Technology</option>
        </Form.Control>
      </Form.Group>
    </Form>
    <p className="my-3 small-excerpt mb-0">Not sure? Feel free to browse here.</p>
    <Link href="/category[slug]" as="/category/law-firm-insights/">
      <a className="red-title proxima-bold">
        <u>
          Firm Insights &gt;&gt;
        </u>
      </a>
    </Link>
  </div>
);

export default Categories;
