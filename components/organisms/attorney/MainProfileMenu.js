import Table from 'components/molecules/attorney/Table';
import ContentTitle from 'components/atoms/ContentTitle';
import Videos from 'components/molecules/attorney/Videos';
import BlogList from 'components/molecules/attorney/BlogList';
import Surface from 'components/atoms/micro-templates/surface';
import MoreTab from 'components/molecules/attorney/MoreTab';
import General from './General';
import Images from './Images';
import Biography from './Biography';

const renderContentTab = (title, content, setActiveTab) => {
  switch (title) {
    case 'Biography':
      return <Biography content={content} />;
    case 'General':
      return <General content={content} />;
    case 'Media':
      return (
        <Surface>
          <ContentTitle title={title} />
          <Table content={content} />
        </Surface>
      );
    case 'Presentations':
      return (
        <Surface>
          <ContentTitle title={title} />
          <Table content={content} />
        </Surface>
      );

    case 'Publications':
      return (
        <Surface>
          <ContentTitle title={title} />
          <Table content={content} />
        </Surface>
      );
    case 'Video':
      return (
        <Surface>
          <ContentTitle title={title} />
          <Videos content={content} />
        </Surface>
      );
    case 'Government & Law':
      return (
        <Surface>
          <ContentTitle title="Articles Published on Government & Law" />
          <BlogList content={content} />
        </Surface>
      );
    case 'Images':
      return (
        <Surface>
          <Images images={content} />
        </Surface>
      );
    case 'More':
      return <MoreTab content={content} setActiveTab={setActiveTab} />;
    default:
      return <>Content not found..</>;
  }
};

const MainProfileMenu = ({ title, content, setActiveTab }) => renderContentTab(title, content, setActiveTab);

export default MainProfileMenu;
