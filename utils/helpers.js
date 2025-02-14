import empty from 'is-empty';
import FirmIcon from 'components/common/icons/FirmIcon';
import LibraryIcon from 'components/common/icons/LibraryIcon';
import LocationsIcon from 'components/common/icons/LocationsIcon';
import IndustriesIcon from 'components/common/icons/IndustriesIcon';
import PracticesIcon from 'components/common/icons/PracticesIcon';
import AttorneysIcon from 'components/common/icons/AttorneysIcon';
import HomeIcon from 'components/common/icons/HomeIcon';
import CareersIcon from 'components/common/icons/CareersIcon';
import CannabisIcon from 'components/common/icons/CannabisIcon';
import FoodIcon from 'components/common/icons/FoodIcon';
import MailingListIcon from 'components/common/icons/MailingListIcon';
import MediaIcon from 'components/common/icons/MediaIcon';
import PaymentIcon from 'components/common/icons/PaymentIcon';
import PostsIcon from 'components/common/icons/PostsIcon';
import RealEstateIcon from 'components/common/icons/RealEstateIcon';
import TransportationIcon from 'components/common/icons/TransportationIcon';
import BankingIcon from 'components/common/icons/BankingIcon';
import BrainIcon from 'components/common/icons/BrainIcon';
import BriefcaseIcon from 'components/common/icons/BriefcaseIcon';
import DocumentsIcon from 'components/common/icons/DocumentsIcon';
import EnvironmentalIcon from 'components/common/icons/EnvironmentalIcon';
import TaxIcon from 'components/common/icons/TaxIcon';
import GlobeIcon from 'components/common/icons/GlobeIcon';
import BulbIcon from 'components/common/icons/BulbIcon';
import GovernmentIcon from 'components/common/icons/GovernmentIcon';
import GamingIcon from 'components/common/icons/GamingIcon';
import CultureIcon from 'components/common/icons/CultureIcon';
import BalanceIcon from 'components/common/icons/BalanceIcon';
import BenefitsIcon from 'components/common/icons/BenefitsIcon';
import CollaborativeIcon from 'components/common/icons/CollaborativeIcon';
import {
  CLOUDINARY_BASE_URL,
  IMAGE_UPLOAD_CLOUDINARY,
  FIRM_PAGES,
  PRODUCTION_URL,
  readyIndustriesUrls,
} from './constants';
import CheckIcon from '../components/common/icons/CheckIcon';
import MapIcon from '../components/common/icons/MapIcon';
import ScopeIcon from '../components/common/icons/ScopeIcon';

// sort a list by its key
export function sortByKey(list, key) {
  if (list !== undefined) {
    list.sort((a, b) => {
      if (a[key] > b[key]) {
        return 1;
      }
      if (a[key] < b[key]) {
        return -1;
      }
      return 0;
    });
  }

  return list;
}

export const convertBooleanToString = (booleanArg) => (booleanArg ? 'true' : '');

// create mark up
export const createMarkup = (content) => ({ __html: content });

export const cutDomain = (url) => url.replace(PRODUCTION_URL, '');

export const cutAnchorUrl = (slug) => {
  const index = slug.indexOf('#');

  if (index !== -1) {
    return slug.substring(0, index);
  }

  return slug;
};

// filter by key
export function filterByKey(list, key) {
  const results = [];
  for (let i = 0; i < list.length; i += 1) {
    if (list[i].key) {
      if (list[i].key === key) {
        results.push(list[i].selected);
      }
    }
  }
  return results;
}

// format GMT date
export function formatDate(date) {
  const dateObj = new Date(date);

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return `${
    month[dateObj.getMonth()]
  } ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
}

// print screen event
export function printScreen() {
  if (typeof window !== 'undefined') {
    window.print();
  }
  return false;
}

// external blog fetch helper
export const fetchExternalPosts = async (site, authorId, amount) => {
  try {
    const url = `${site}/wp-json/wp/v2/posts?author=${authorId}&per_page=${amount}&orderby=date`;
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

// Format image src into a cloudinary url
export const formatSrcToCloudinaryUrl = (src) => {
  if (src) {
    const splitSrc = src.split('/');
    const file = splitSrc[splitSrc.length - 1];
    return CLOUDINARY_BASE_URL + file;
  }
  return '/images/no-image-found-diamond-750x350.png';
};

// Format image src into a cloudinary url
export const formatPageImageToCloudinaryUrl = (page) => {
  if (empty(page)) return '';
  const tossUrl = 'https://wp.scarincihollenbeck.com/wp-content/uploads/';
  if (page.includes(tossUrl)) {
    return page
      .replace(
        /https:\/\/wp.scarincihollenbeck.com\/wp-content\/uploads\//g,
        CLOUDINARY_BASE_URL,
      )
      .replace(/-\d{3,}x\d{3,}\./g, '.');
  }

  return page;
};

export const getCloudinaryImageUrl = (dataVersion, dataPublicId) => `${IMAGE_UPLOAD_CLOUDINARY}${dataVersion}/${dataPublicId}`;

export const sanitizeExternalArticles = (arr) => arr.map(({
  id, link, title, date,
}) => ({
  id,
  link: {
    url: link,
    target: '_blank',
  },
  title: title.rendered,
  date,
}));

export const concatNameUser = (name, abbreviation) => {
  if (abbreviation) {
    return `${name}, ${abbreviation}`;
  }

  return name;
};

export const getSubTitleFromHTML = (htmlContent) => {
  const extractSubTitle = htmlContent.match(/<h2(.*?)>(.*?)<\/h2>/g);
  const subTitle = extractSubTitle !== null
    ? extractSubTitle[0].replace(/<[^>]*>?/gm, '')
    : '';
  const bodyContentCutSubTitle = htmlContent.replace(subTitle, '');
  return {
    clearBody: bodyContentCutSubTitle.replace(/<h2(.*?)><\/h2>/gim, ''),
    subTitle,
  };
};

export const changeTitle = (title, isH1) => {
  if (!title) return '';
  const symbolCheckObject = {
    '&#8220;': '"',
    '&#8221;': '"',
    '&amp;': '&',
  };
  Object.keys(symbolCheckObject).map(
    (symbol) => (title = title.replace(symbol, symbolCheckObject[symbol])),
  );

  const pattern = /(\d+)th/g;
  title = title.replace(pattern, (match, number) => `${number}<span>th</span>`);

  if (!isH1 || typeof isH1 === 'undefined') {
    return title;
  }

  title = `<h1>${title}</h1>`;
  return title;
};

export const getSlugFromUrl = (inputString) => {
  const pattern = /\/([^/]+)$/; // Match the last slash and capture non-slash characters after it
  const match = pattern.exec(inputString);

  if (match && match[1]) {
    return match[1];
  }

  return inputString;
};

export const cutSlashFromTheEnd = (url) => (url.endsWith('/') ? url.slice(0, -1) : url);

export const convertUnixTimestampToISO = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
  return date.toISOString(); // Convert to ISO 8601 string
};

export const deleteReviewsWithoutComment = (reviews) => reviews.filter((review) => !empty(review.text));

export const changePostLink = (url) => {
  if (empty(url)) return null;
  const parts = url?.replace(`${PRODUCTION_URL}/`, '').split('/');
  if (empty(parts?.[0])) return url;
  const result = `/${parts[0]}/${parts[parts.length - 1]}`;
  return result;
};

export const checkOnPublish = (array) => array.filter((item) => item?.status === 'publish') || [];

export const sortAttorneysByCategory = (attorneys, titles) => {
  if (!attorneys || !titles) return null;
  const results = {};

  titles.forEach((title) => {
    results[title.name] = {
      attorneys: [],
    };
  });

  attorneys.forEach((attorney, idx) => {
    if (
      typeof attorney.designation === 'string'
      && !attorney.designation.includes('Firm Managing Partner')
      && !attorney.designation.includes('Deputy Managing Partner')
      && !attorney.designation.includes('Chief Executive Officer')
      // In a pause. That code is adding mr.Warren to Firm Managing Partner section.
      // && !attorney.designation.includes('NYC Managing Partner')
      && attorney.designation.includes(' Managing Partner')
    ) {
      results.Partners?.attorneys.push(attorney);
    }
    if (attorney.designation === 'Chief Executive Officer') {
      results['Firm Managing Partner']?.attorneys.push(attorney);
      results['Firm Leaders']?.attorneys.unshift(attorney);
      results['Firm management']?.attorneys.unshift(attorney);
    }
    if (typeof attorney.designation !== 'string') {
      results['Practice Leaders']?.attorneys.push(attorney);
    }
    if (attorney.designation === 'Deputy Managing Partner') {
      results['Firm Managing Partner']?.attorneys.push(attorney);
      results['Firm management']?.attorneys.push(attorney);
    }
    // In a pause. That code is adding mr.Warren to Firm Managing Partner section.
    // if (attorney.designation === 'NYC Managing Partner') {
    //   results['Firm Managing Partner']?.attorneys.push(attorney);
    //   results.Partners?.attorneys.push(attorney);
    // }
    if (attorney.designation === 'Chief Growth Officer') {
      results['Administrative Management']?.attorneys.push(attorney);
      results.Directors?.attorneys.push(attorney);
    }
    if (
      typeof attorney.designation === 'string'
      && attorney?.designation?.includes('Director ')
    ) {
      results['Administrative Management']?.attorneys.push(attorney);
    }
    Object.keys(results).forEach((key) => {
      if (
        attorney.designation[0] === key[0]
        && attorney.designation[0]
        && !attorney.designation.includes('Deputy Managing Partner')
        && !attorney.designation.includes('NYC Managing Partner')
        && !attorney.designation.includes('Chief Executive Officer')
      ) {
        results[key].attorneys.push(attorney);
      }
    });
  });

  const recreatedPositions = results['Firm Managing Partner']?.attorneys.reverse();

  const designationIndex = recreatedPositions?.findIndex(
    (attorney) => attorney.designation === 'NYC Managing Partner',
  );

  if (!empty(recreatedPositions) && designationIndex !== -1) {
    const removedDesignation = recreatedPositions.splice(
      designationIndex,
      1,
    )[0];
    recreatedPositions.push(removedDesignation);
  }

  return results;
};

export const setResponseHeaders = (res, revalidateTime, cacheStatus) => {
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${revalidateTime}, stale-while-revalidate`,
  );
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Cache-Status', cacheStatus);
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const createMenuData = (practices, locations, industries) => [
  {
    databaseId: 'menu-01',
    title: 'Homepage',
    icon: <HomeIcon />,
    href: '/',
  },
  {
    databaseId: 'menu-02',
    title: 'Attorneys',
    icon: <AttorneysIcon />,
    href: '/attorneys',
  },
  {
    databaseId: 'menu-03',
    title: 'Legal Practices',
    icon: <PracticesIcon />,
    href: '/services',
    list: [
      {
        databaseId: 'menu-all-practices',
        uri: '/services',
        title: 'View all practices',
        additionalClass: 'bolder',
      },
      ...practices,
    ],
  },
  {
    databaseId: 'menu-04',
    title: 'Industries',
    icon: <IndustriesIcon />,
    href: '/services',
    list: [
      {
        databaseId: 'menu-all-industries',
        uri: '/services#industries',
        title: 'View all industries',
        additionalClass: 'bolder',
      },
      ...industries,
    ],
  },
  {
    databaseId: 'menu-05',
    title: 'Locations',
    icon: <LocationsIcon />,
    href: '/location/new-york',
    list: !empty(locations) ? [...locations] : [],
  },
  {
    databaseId: 'menu-06',
    title: 'Library',
    icon: <LibraryIcon />,
    href: '/',
    list: [
      {
        databaseId: 'menu-lib-00',
        title: 'Library overview',
        uri: '/library',
      },
      {
        databaseId: 'menu-lib-01',
        title: 'Client Alerts',
        uri: '/library/category/client-alert',
      },
      {
        databaseId: 'menu-lib-02',
        title: 'Firm News',
        uri: '/library/category/firm-news',
      },
      {
        databaseId: 'menu-lib-03',
        title: 'Firm Events',
        uri: '/library/category/firm-events',
      },
      {
        databaseId: 'menu-lib-04',
        title: 'Firm Insights',
        uri: '/library/category/law-firm-insights',
      },
    ],
  },
  {
    databaseId: 'menu-07',
    title: 'The Firm',
    icon: <FirmIcon />,
    href: '/',
    list: FIRM_PAGES,
  },
  {
    databaseId: 'menu-08',
    title: 'Careers',
    icon: <CareersIcon />,
    href: '/careers',
  },
];

export const createOverviewLinks = (practices, isAllLinks) => {
  if (empty(practices)) return null;

  return practices.map((practice) => {
    if (empty(practice?.childPractice) && !isAllLinks) return practice;

    const overviewChild = {
      databaseId: `${practice.databaseId}_${practice.title}`,
      title: `${practice.title} overview`,
      uri: practice.uri,
    };

    const updatedChildPractice = [overviewChild, ...practice.childPractice];

    return {
      ...practice,
      childPractice: updatedChildPractice,
    };
  });
};

export const getIcon = (name) => {
  const icons = {
    Attorneys: <AttorneysIcon />,
    Banking: <BankingIcon />,
    Cannabis: <CannabisIcon />,
    Careers: <CareersIcon />,
    Firm: <FirmIcon />,
    Food: <FoodIcon />,
    Home: <HomeIcon />,
    Industries: <IndustriesIcon />,
    'News paper': <LibraryIcon />,
    Locations: <LocationsIcon />,
    MailingList: <MailingListIcon />,
    Media: <MediaIcon />,
    Payment: <PaymentIcon />,
    Posts: <PostsIcon />,
    Practices: <PracticesIcon />,
    'Real Estate': <RealEstateIcon />,
    Transportation: <TransportationIcon />,
    Brain: <BrainIcon />,
    Briefcase: <BriefcaseIcon />,
    Documents: <DocumentsIcon />,
    Environmental: <EnvironmentalIcon />,
    Tax: <TaxIcon />,
    Check: <CheckIcon />,
    Map: <MapIcon />,
    Scope: <ScopeIcon />,
    Globe: <GlobeIcon />,
    Bulb: <BulbIcon />,
    Government: <GovernmentIcon />,
    Gaming: <GamingIcon />,
    Culture: <CultureIcon />,
    Balance: <BalanceIcon />,
    Benefits: <BenefitsIcon />,
    Collaborative: <CollaborativeIcon />,
  };

  return icons[name];
};

export const filterAttorneysByDesignation = (attorneys) => {
  if (empty(attorneys)) return [];
  return attorneys.filter((attorney) => attorney.designation.includes('Partner'));
};

export const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

export const attorneysSanitize = (attorneysArr) => {
  const designationOrder = [
    'Firm Managing Partner',
    'Deputy Managing Partner',
    'Partner',
    'Counsel',
    'Of Counsel',
    'Senior Associate',
    'Associate',
  ];

  return attorneysArr
    .map((attorney) => {
      attorney.attorneyMainInformation.profileImage = !empty(
        attorney.attorneyMainInformation?.profileImage?.sourceUrl,
      )
        ? attorney.attorneyMainInformation.profileImage.sourceUrl
        : '/images/no-image-found-diamond-750x350.png';
      return {
        databaseId: attorney.databaseId,
        link: attorney.uri,
        title: attorney.title,
        status: attorney.status,
        ...attorney.attorneyMainInformation,
        ...attorney.attorneyPrimaryRelatedPracticesLocationsGroups,
      };
    })
    .sort((a, b) => {
      const indexA = designationOrder.indexOf(a.designation);
      const indexB = designationOrder.indexOf(b.designation);

      if (indexA !== indexB) {
        return indexA - indexB; // Sort by designation order first
      }
      return a.lastName?.localeCompare(b.lastName); // If designations are the same, sort by last name
    });
};

export const getIndustryLink = (uri, defaultUri = '/services#industries') => (readyIndustriesUrls.includes(uri) ? uri : defaultUri);

export const filterTunePractices = (practice) => {
  const titleMap = {
    'Employment Defense Attorney': true,
  };

  return !titleMap[practice.title];
};

// eslint-disable-next-line
export const isMobileCheck = () => {
  if (typeof window === 'undefined') return null;
  let check = false;
  (function detectMobile(a) {
    if (
      // eslint-disable-next-line no-useless-escape
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a,
      )
      // eslint-disable-next-line no-useless-escape
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4),
      )
    ) check = true;
  }(navigator.userAgent || navigator.vendor || window.opera));
  return check;
};

// Formate awards
export const formateAwards = (awards) => {
  if (empty(awards)) return [];

  return awards
    ?.map(
      (
        {
          appearanceOrder,
          imageHeight,
          imageWidth,
          label,
          awardImage,
          year,
          awardTitle,
          awardLink,
        },
        index,
      ) => ({
        id: label || awardTitle,
        order: appearanceOrder || index,
        year,
        label: label || awardTitle,
        image: {
          src: formatSrcToCloudinaryUrl(awardImage.sourceUrl),
          alt: label || awardTitle,
          width: imageWidth || 200,
          height: imageHeight || 200,
        },
        link: awardLink || null,
      }),
    )
    .sort((a, b) => (a.order > b.order ? 1 : -1));
};

export const sanitizeCategories = (categories) => categories?.map((category) => ({
  databaseId: category.databaseId,
  title: category?.name || category.title,
  description: category?.description || category?.pagesFields?.description,
  uri: category?.uri ? `/library${category?.uri}` : '/library',
  image:
      category?.categoryFields?.image?.sourceUrl
      || category?.featuredImage?.node?.sourceUrl,
  posts: category?.posts?.nodes || [],
}));

export const generateYearOptions = (startYear) => {
  const currentYear = new Date().getFullYear();
  const yearOptions = [];

  for (let year = startYear; year <= currentYear; year++) {
    yearOptions.push({
      databaseId: year,
      title: year,
    });
  }

  return yearOptions;
};
