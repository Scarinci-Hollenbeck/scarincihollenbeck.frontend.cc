import { render, screen, within } from '@testing-library/react';
import { act } from 'react-test-renderer';
import ReduxProvider from '../../../hoks/reduxTestHoc';
import AttorneyFilters from '../../../components/organisms/attorneys/AttorneyFilters';
import AttorneyCards from '../../../components/atoms/AttorneyCards';
import AttorneysPage from '../../../components/pages/AttorneysDirectory';
import {
  AttorneyPagepropsMock,
  attorneysFilterMock,
} from '../../../__mocks__/attorneysFilter.mock';

const mockDataAttorneys = Object.entries(attorneysFilterMock);

const renderAttorneyFilters = (props) => render(
  <ReduxProvider>
    <AttorneyFilters {...props} />
  </ReduxProvider>,
);

const renderAttorneyCards = (props) => render(
  <ReduxProvider>
    <AttorneyCards {...props} />
  </ReduxProvider>,
);

const renderAttorneysPage = (props) => render(
  <ReduxProvider>
    <AttorneysPage {...props} />
  </ReduxProvider>,
);

describe('Attorneys page', () => {
  it('The filter renders', () => {
    renderAttorneyFilters();
    const filter = screen.getByTestId('attorneys-filter');
    expect(filter).toBeInTheDocument();
  });

  it('The attorneys section renders', async () => {
    await act(async () => {
      renderAttorneyCards({
        title: mockDataAttorneys[0][0],
        pathname: '/attorneys',
        content: mockDataAttorneys[0][1]?.attorneys,
      });
    });
    const section = screen.getByText('Firm management');
    expect(section).toBeInTheDocument();
  });

  it('The FAQ renders', () => {
    renderAttorneysPage(AttorneyPagepropsMock);
    // Get the FaqBox container by testId
    const faqBox = screen.getByTestId('FAQ-container');

    // Use within() to query the elements inside the FaqBox container
    const faq = within(faqBox).getByTestId('faq-wrapper');
    expect(faq).toBeInTheDocument();
  });
});
