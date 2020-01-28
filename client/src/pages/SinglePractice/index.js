/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { PulseLoader } from 'react-spinners';
import PracticeHead from '../../components/Head/practice';
import SingleSubHeader from '../../layouts/SingleSubHeader';
import FullWidth from '../../layouts/FullWidth';
import NoHeaderMiniSidebar from '../../layouts/NoHeaderMiniSidebar';
import Sidebar from './Sidebar';
import Body from './Body';
import cityBackground from './citybackground.jpg';
import './index.scss';


class IndividualPractice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      content: [],
      chair: [],
      practiceList: [],
      industryTopics: [],
      attorneyList: [],
      highlightReal: [],
      searchTerm: '',
      currentTab: '',
      spinner: false,
    };
    this.handleLink = this.handleLink.bind(this);
    this.fetchPostData = this.fetchPostData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.tabClick = this.tabClick.bind(this);
  }

  componentDidMount() {
    const { practice } = this.props.match.params;
    this.setState({ spinner: true });
    console.log('practice url: ', `${process.env.API_URL}/wp-json/individual-practices/practice/${practice}`);
    this.fetchPostData(`${process.env.API_URL}/wp-json/individual-practices/practice/${practice}`);
  }

  onChange(event) {
    const searchTerm = event.target.value;
    this.setState({ searchTerm });
  }

  onSubmit() {
    const { searchTerm } = this.state;
    fetch(`${process.env.API_URL}/wp-json/search/post`,
      {
        method: 'post',
        body: searchTerm,
      })
      .then((res) => res.json());
  }

  fetchPostData(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const {
          chair,
          title,
          description,
          content,
          practiceList,
          industryTopics,
          attorneyList,
          highlightReal,
          seo,
        } = data;

        this.setState({
          chair,
          title,
          description,
          content,
          industryTopics,
          attorneyList,
          practiceList,
          highlightReal,
          seo,
          spinner: false,
          currentTab: content[0].title,
        });
      });
  }

  handleLink(e) {
    window.location = e.target.value;
  }

  tabClick(e) {
    const currentTab = e;
    this.setState({ currentTab });
  }

  render() {
    const {
      chair,
      title,
      description,
      content,
      practiceList,
      industryTopics,
      attorneyList,
      searchTerm,
      currentTab,
      highlightReal,
      seo,
      spinner,
    } = this.state;

    return (
      <div>
        <PracticeHead seo={seo} />
        {(!spinner) ? (
          <div>
            <SingleSubHeader
              title={title}
              subtitle={description}
              image={cityBackground}
              height=""
            />
            { (content.length > 0) ? (
              <div>
                <FullWidth>
                  <div className="line-header" id="nav-tab" role="tablist">
                    <h3
                      className={(currentTab === content[0].title) ? 'active' : ''}
                      id="nav-home-tab"
                      data-toggle="tab"
                      onClick={() => this.tabClick(content[0].title)}
                      onKeyPress={() => this.tabClick(content[0].title)}
                      href={`#${content[0].title}`}
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                    >
                      {content[0].title}
                    </h3>
                    { content.map((v, i) => ((i > 0) ? (
                      <h3
                        key={v.title}
                        className={(currentTab === v.title) ? 'active' : ''}
                        data-toggle="tab"
                        href={`#${v.title}`}
                        role="tab"
                        onClick={() => this.tabClick(v.title)}
                        onKeyPress={() => this.tabClick(v.title)}
                        aria-controls="nav-home"
                        aria-selected="true"
                      >
                        {v.title}
                      </h3>
                    ) : ''))}
                    { (attorneyList.length > 0) ? (
                      <h3
                        id="nav-home-tab"
                        className={(currentTab === 'team') ? 'active' : ''}
                        data-toggle="tab"
                        href="#team"
                        role="tab"
                        onClick={() => this.tabClick('team')}
                        onKeyPress={() => this.tabClick('team')}
                        aria-controls="nav-home"
                        aria-selected="true"
                      >
                        Our Team
                      </h3>
                    ) : ''}
                    { (industryTopics.length > 0) ? (
                      <h3
                        id="nav-home-tab"
                        className={(currentTab === 'blogs') ? 'active' : ''}
                        data-toggle="tab"
                        href="#blogs"
                        role="tab"
                        onKeyPress={() => this.tabClick('blogs')}
                        onClick={() => this.tabClick('blogs')}
                        aria-controls="nav-home"
                        aria-selected="true"
                      >
                        Related Updates
                      </h3>
                    ) : ''}
                  </div>
                </FullWidth>
                <NoHeaderMiniSidebar
                  body={(
                    <Body
                      currentTab={currentTab}
                      content={content}
                      attorneyList={attorneyList}
                      chair={chair}
                      handleLink={this.handleLink}
                      industryTopics={industryTopics}
                      highlightReal={highlightReal}
                      title={title}
                    />
                  )}
                  sidebar={(
                    <Sidebar
                      searchTerm={searchTerm}
                      onSubmit={this.onSubmit}
                      onChange={this.onChange}
                      practiceList={practiceList}
                    />
                  )}
                />
              </div>
            ) : '' }
          </div>
        ) : <PulseLoader color="#D02422" loading={spinner} />}
      </div>
    );
  }
}

export default IndividualPractice;
