export const attorneyBySlugQuery = `query AttorneyProfileBySlug($slug: String) {
  attorneyProfileBy(slug: $slug) {
    seo {
      title
      metaDesc
    }
    attorneyMainInformation {
      designation
      email
      faxNumber
      abbreviation
      phoneNumber
      profileImage {
        sourceUrl
        authorDatabaseId
      }
      socialMediaLinks {
        url
        channel
      }
      vizibility
      videoPresentation {
        videoLink
        uploadVideo {
          mediaItemUrl
          mimeType
        }
      }
      qrCodeBioPage {
        sourceUrl
      }
      qrCodeLinkedin {
        sourceUrl
      }
    }
    attorneyAdditionalInformationEducationAdmissionsAffiliations {
      additionalInformation {
        title
        content
      }
      affiliations
      barAdmissions
      education
    }
    attorneyBiography {
      biographyContent
      miniBio
    }
    attorneyAdditionalTabs {
      tabHeader1
      tabContent1
      tabHeader2
      tabContent2
      tabHeader3
      tabContent3
      tabHeader4
      tabContent4
      tabHeader5
      tabContent5
    }
    attorneyAwardsClientsBlogsVideos {
      images {
        caption
        image {
          sourceUrl
          databaseId
        }
        orientationImage
      }
      attorneyVideos {
        videoDate
        title
        video {
          videoLink
          uploadVideo {
            mediaItemUrl
            mimeType
          }
        }
      }
      awards {
        awardImage {
          sourceUrl(size: LARGE)
        }
        awardLink
        awardTitle
        year
      }
      clients {
        clientImage {
          sourceUrl
          altText
          mediaDetails {
            height
            width
          }
        }
        clientLink
        clientTitle
      }
      blogId {
        constitutionalLawReporter
        governmentLaw
        musicEsq
      }
    }
    attorneyChairCoChair {
      chair {
        ... on Practice {
          id
          uri
          title
        }
      }
      coChair {
        ... on Practice {
          id
          title
          uri
        }
      }
    }
    attorneyPrimaryRelatedPracticesLocationsGroups {
      officeLocation {
        ... on OfficeLocation {
          id
          title(format: RENDERED)
          uri
          officeMainInformation {
            addressLocality
          }
        }
      }
      relatedPractices {
        ... on Practice {
          id
          uri
          title(format: RENDERED)
        }
      }
    }
    attorneyRepresentativeMatters {
      repMatters {
        content
        title
      }
    }
    title(format: RENDERED)
    attorneyMediaSecondType {
      mediaItems {
        date
        description
        link {
          target
          url
        }
        publisher
        title
      }
    }
    attorneyPresentationsSecondType {
      presentationsItems {
        title
        link {
          url
          target
        }
        label
        description
        date
      }
    }
    attorneyPublicationsSecondType {
      publicationsItems {
        date
        description
        label
        title
        link {
          target
          url
        }
      }
    }
    attorneyAuthorId {
      authorId {
        databaseId
      }
    }
  }
}`;

export const checkAttorneyPostsQueryByIdAndSlug = `query AttorneyPostsById(
  $categoryId: [ID]
  $authorId: Int
  $first: Int
  $last: Int
  $after: String
  $before: String
  ) {
  posts(first: $first, last: $last, after: $after, before: $before, where: {categoryIn: $categoryId, author: $authorId}) {
    pageInfo {
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
  }}
`;

export const attorneysQuery = `query FirmPageQuery {
  attorneyProfiles(first: 100, where: {status: PUBLISH}) {
    nodes {
      databaseId
      slug
      title
      uri
      attorneyMainInformation {
        designation
        email
        phoneNumber
        lastName
        profileImage {
          sourceUrl(size: CATEGORY_THUMB)
        }
      }
      attorneyPrimaryRelatedPracticesLocationsGroups {
        officeLocation {
          ... on OfficeLocation {
            id
            uri
            title
            officeMainInformation {
              addressLocality
            }
          }
        }
        relatedPractices {
          ... on Practice {
            title
          }
        }
      }
      attorneyBiography {
        miniBio
      }
    }
  }
}`;

export const officeLocationsQuery = `query OfficeLocationsQuery {
  officeLocations(first: 50, where: {orderby: {field: MENU_ORDER, order: ASC}}) {
    nodes {
      databaseId
      title
      slug
      officeMainInformation {
        addressLocality
        addressRegion
        mapAddress
        phone
        streetAddress
        fax
        floor
        postCode
        autoMap {
					mediaItemUrl
					databaseId
        }
        trainStationsMap {
					mediaItemUrl
					databaseId
        }
      }
    }
  }
}
`;

export const latestAllPosts = `query latestAllPosts {
  posts(first: 19) {
    nodes {
      date
      slug
      uri
      databaseId
      featuredImage {
        node {
          sourceUrl
        }
      }
      title(format: RENDERED)
      excerpt(format: RENDERED)
      author {
        node {
          name
          slug
        }
      }
    }
  }
}`;

export const latestClientAlertsArticles = `query latestClientAlertsArticles {
  posts(first: 19, where: {categoryName: "Client Alert"}) {
    nodes {
      date
      slug
      uri
      databaseId
      featuredImage {
        node {
          sourceUrl
        }
      }
      title(format: RENDERED)
      excerpt(format: RENDERED)
      author {
        node {
          name
          slug
        }
      }
    }
  }
}`;

export const latestFirmNewsArticles = `query latestFirmNewsArticles {
  posts(first: 19, where: {categoryName: "Firm News"}) {
    nodes {
      date
      slug
      uri
      databaseId
      featuredImage {
        node {
          sourceUrl
        }
      }
      title(format: RENDERED)
      excerpt(format: RENDERED)
      author {
        node {
          name
          slug
        }
      }
    }
  }
}`;

export const latestFirmInsightsArticles = `query latestFirmInsightsArticles {
  posts(first: 19, where: {categoryId: 599}) {
    nodes {
      date
      slug
      uri
      databaseId
      featuredImage {
        node {
          sourceUrl
        }
      }
      title(format: RENDERED)
      excerpt(format: RENDERED)
      author {
        node {
          name
          slug
        }
      }
    }
  }
}`;

export const postQuery = `
query FirmPageQuery($id: ID!) {
  post(id: $id, idType: SLUG) {
    categories {
      nodes {
        databaseId
        name
        slug
        contentNodes(first: 4, where: {dateQuery: {before: {month: 2}}}) {
          nodes {
            ... on Post {
              title
              uri
              featuredImage {
                node {
                  sourceUrl
                }
              }
              databaseId
            }
          }
        }
      }
    }
    content
    title
    link
    date
    status
    seo {
      opengraphDescription
      title
      opengraphImage {
        sourceUrl
      }
    }
    selectAuthors {
      authorDisplayOrder {
        ... on AttorneyProfile {
          uri
          title
          databaseId
          attorneyMainInformation {
            profileImage {
              sourceUrl
            }
            email
            phoneNumber
            designation
          }
          attorneyBiography {
            miniBio
          }
        }
      }
    }
    selectHeroes {
      selectAttorneys {
        ... on AttorneyProfile {
          uri
          title
          databaseId
          attorneyMainInformation {
            profileImage {
              sourceUrl
            }
            email
            phoneNumber
            designation
          }
          attorneyBiography {
            miniBio
          }
        }
      }
    }
  }
}`;

export const getThreePostsQuery = `
query getThreePostsQuery {
  posts(first: 3, where: {categoryId: 98}) {
    nodes {
      databaseId
      uri
      title
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          name
        }
      }
    }
  }
}`;

export const getClientsQuery = `query FirmPageQuery(
  $offsetPosts: Int, 
  $postsPerPage: Int
  ) {
  clients(
    where: {offsetPagination: {offset: $offsetPosts, size: $postsPerPage}}
  ) {
    edges {
      node {
        databaseId
        title
        clientsFields {
          clientImage {
            sourceUrl
            title
          }
          entertainmentSubcategory
          lineColor
          proffesion
        }
      }
    }
    pageInfo {
      offsetPagination {
        total
        hasPrevious
        hasMore
      }
    }
  }
}`;

// , order by: {field: DATE, order: DESC}
export const postsForPaginationByCategoryIdQuery = `
  query postsForPaginationByCategoryId(
    $categoryId: Int, 
    $offsetPosts: Int, 
    $postsPerPage: Int
  ) {
    posts(
      where: {categoryId: $categoryId, offsetPagination: {offset: $offsetPosts, size: $postsPerPage}}
    ) {
      pageInfo {
        offsetPagination {
          total
          hasPrevious
          hasMore
        }
      }
      edges {
        node {
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          uri
          title(format: RENDERED)
          excerpt(format: RENDERED)
          author {
            node {
              name
              url
            }
          }
        }
      }
    }
  }
`;

export const postsForPaginationByAuthorIdQuery = `
  query postsForPaginationByAuthorId(
    $categoryId: [ID],
    $authorId: Int,
    $offsetPosts: Int,
    $postsPerPage: Int
  ) {
    posts(
      where: {categoryIn: $categoryId, author: $authorId, offsetPagination: {offset: $offsetPosts, size: $postsPerPage}}
    ) {
      pageInfo {
        offsetPagination {
          total
          hasPrevious
          hasMore
        }
      }
      edges {
        node {
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
          uri
          title(format: RENDERED)
          excerpt(format: RENDERED)
          author {
            node {
              name
              url
            }
          }
        }
      }
    }
  }
`;

// Category Landing Page Query
export const categoryPostQuery = `query CategoryPosts($name:String) {
  categories(where: {slug: [$name]}) {
    edges {
      node {
        name
        seo {
          metaDesc
          title
        }
        children(first: 20) {
          nodes {
            slug
            name
            count
            id
          }
        }
        description
        posts(first: 1) {
          edges {
            node {
              categories(first: 1) {
                edges {
                  node {
                    name
                    link
                  }
                }
              }
              uri
              excerpt(format: RENDERED)
              title
              featuredImage {
                node {
                  sourceUrl
                }
              }
              date
              author {
                node {
                  userId
                  name
                }
              }
            }
          }
        }
        databaseId
      }
    }
  }
}
`;

export const contactPageQuery = `
query ContactPageQuery {
  pageBy(pageId: 29488) {
    seo {
      metaDesc
      title
    }
    title
    featuredImage {
      node {
        sourceUrl
      }
    }
    pagesFields {
      description
    }
  }
}`;

/** home page content query */
export const homePageQuery = `query HomePageQuery {
  pageBy(uri: "front-page") {
    title
    homePage {
      awards {
        appearanceOrder
        imageHeight
        imageWidth
        label
        year
        awardImage {
          sourceUrl
        }
      }
      isHoliday
      firstSection {
        title
        subtitle
        infoCards {
          cardsText
          fieldGroupName
          icon
          title
          link {
            target
            title
            url
          }
        }
      }
      whoWeAre {
        aboutHero
        arcticle
        heroPhoto {
          altText
          sourceUrl
        }
        title
        heroProfileLink {
          title
          target
          url
        }
      }
      industryWeWorkWith {
        title
        subtitle
        link {
          target
          title
          url
        }
        industries {
          ... on Industry {
            industryContent {
              industryIcon {
                selectedIcon
                uploadedIcon {
                  sourceUrl
                }
              }
              description
            }
            title
            databaseId
            uri
          }
        }
      }
      whyChooseUs {
        title
        article
        serviceList {
          service
        }
        focusedServicesCards {
          title
          text
          icon
        }
      }
    }
    seo {
      metaDesc
      title
    }
  }
}
`;

/** attorneys landing page query */
export const attorneysPageQuery = `query AttorneysPagesQuery {
  pageBy(pageId: 46642) {
    title
    seo {
      metaDesc
      title
    }
    attorneyArchives {
      designationSectionTitles {
        name
        order
      }
    }
    pagesFields {
      description
    }
  }
}`;

/** careers landing page query */
export const careersPageQuery = `
query CareersPagesQuery {
  pageBy(pageId: 46660) {
    title
    seo {
      metaDesc
      title
    }
    careersPage {
      equalEmploymentOpportunityContent
      positionTypes {
        name
      }
    }
    featuredImage {
      node {
        sourceUrl
      }
    }
    focusedCards {
      cards {
        icon
        text
        title
      }
    }
    pagesFields {
      description
    }
  }
}`;

export const careersQuery = `
query BasicPageQuery {
  careers(first: 100) {
    nodes {
      databaseId
      slug
      careerFields {
        duration
        position
        positionType
        locations {
          ... on OfficeLocation {
            title
          }
        }
      }
      pagesFields {
        description
      }
    }
  }
}`;

export const careerPageQuery = `
query CareerPageQuery($slug: ID!) {
  career(id: $slug, idType: SLUG) {
    careerFields {
      locations {
        ... on OfficeLocation {
          title
          databaseId
        }
      }
      positionType
      duration
    }
    title
    status
    seo {
      title
      metaDesc
    }
    pagesFields {
      description
      sections {
        content
        link {
          title
          target
          url
        }
        title
      }
    }
  }
}`;

/** administration landing page query */
export const administrationPageQuery = `
query AdministrationPagesQuery {
  pageBy(pageId: 46670) {
    title
    seo {
      metaDesc
      title
    }
    pagesFields {
      description
    }
    featuredImage {
      node {
        sourceUrl
      }
    }
  }
}`;

export const administrationPersoneQuery = `
query FirmPageQuery($id: ID!) {
  administration(id: $id, idType: SLUG) {
    databaseId
    uri
    administration {
      name
      biography
      designation
      email
      abbreviation
      phoneExtension
      title
      vizibility
      featuredImage {
        sourceUrl
      }
      location {
        ... on OfficeLocation {
          officeMainInformation {
            addressLocality
          }
          uri
          id
        }
      }
      socialMediaLinks {
        channel
        url
      }
    }
    seo {
      metaDesc
      title
    }
  }
}`;

/** basic pages query  */
export const basicPagesQuery = `query BasicPageQuery($slug: String) {
  pageBy(uri: $slug) {
    title
    seo {
      metaDesc
      title
    }
    featuredImage {
      node {
        sourceUrl
      }
    }
    pagesFields {
      description
      sections {
        content
        link {
          target
          title
          url
        }
        title
      }
    }
  }
}`;

/** querying firm pages content */
export const firmPagesQuery = `
query FirmPageQuery($slug: ID!) {
  page(idType: URI, id: $slug) {
    title
    status
    seo {
      metaDesc
      title
    }
    firmPagesRelatedPostsMembers {
      relatedPosts {
        posts(first: 6) {
          edges {
            node {
              id
              uri
              date
              title(format: RENDERED)
              author {
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
    featuredImage {
      node {
        sourceUrl
      }
    }
    pagesFields {
      description
      sections {
        content
        link {
          title
          target
          url
        }
        title
      }
    }
  }
}`;

export const firmOverviewQuery = `
query FirmOverviewQuery {
  pageBy(pageId: 29492) {
    title
    seo {
      metaDesc
      title
    }
    firmOverviewTabs {
      additionalContent {
        content
        title
      }
      firmLeaders {
        ... on Administration {
          id
          slug
          title
          administration {
            abbreviation
            email
            title
            phoneExtension
            featuredImage {
              sourceUrl
            }
            location {
              ... on OfficeLocation {
                officeMainInformation {
                  addressLocality
                }
                uri
                id
              }
            }
          }
        }
        ... on AttorneyProfile {
          id
          slug
          title
          attorneyMainInformation {
            designation
            email
            phoneNumber
            profileImage {
              sourceUrl
            }
          }
          attorneyPrimaryRelatedPracticesLocationsGroups {
            officeLocation {
              ... on OfficeLocation {
                id
                title
                uri
              }
            }
          }
        }
      }
      directors {
        ... on Administration {
          id
          title
          slug
          administration {
            email
            title
            phoneExtension
            order
            featuredImage {
              sourceUrl
            }
            location {
              ... on OfficeLocation {
                officeMainInformation {
                  addressLocality
                }
                uri
                id
              }
            }
          }
        }
      }
    }
    featuredImage {
      node {
        sourceUrl
      }
    }
    pagesFields {
      description
      sections {
        content
        link {
          target
          title
          url
        }
        title
      }
    }
  }
}`;

export const adminsQuery = `query AttorneyPostsById {
  administrations {
    nodes {
      databaseId
      uri
      title
      administration {
        email
        phoneExtension
        order
        location {
          ... on OfficeLocation {
            id
            uri
            officeMainInformation {
              addressLocality
            }
          }
        }
        designation
        featuredImage {
          sourceUrl
        }
      }
    }
  }
}`;

export const getOfficeAndMoreData = `query FirmPageQuery($id: ID!) {
  officeLocation(id: $id, idType: SLUG) {
    databaseId
    title
    officeMainInformation {
      autoMap {
        mediaItemUrl
        databaseId
      }
      fax
      floor
      mapAddress
      phone
      postCode
      streetAddress
      addressLocality
      addressRegion
      officePractices {
        ... on Practice {
          id
          uri
          title
          databaseId
          practicesIncluded {
            childPractice {
              ... on Practice {
                id
                databaseId
                title
                uri
                practicePortalPageContent {
                  practicePortalCategories
                }
              }
            }
          }
          practicePortalPageContent {
            practicePortalCategories
          }
        }
      }
      trainStationsMap {
        mediaItemUrl
        databaseId
      }
      faq {
        description
        title
      }
      description
      contentTabs {
        tabContent {
          description
          title
          columns {
            description
            title
          }
        }
        openerTitle
      }
    }
    featuredImage {
      node {
        sourceUrl
      }
    }
    seo {
      metaDesc
      title
    }
  }
  officeLocations(first: 50, where: {orderby: {field: MENU_ORDER, order: ASC}}) {
    nodes {
      databaseId
      featuredImage {
        node {
          sourceUrl
        }
      }
      officeMainInformation {
        addressLocality
        addressCountry
        addressRegion
        fax
        floor
        phone
        streetAddress
        postCode
      }
      uri
      slug
    }
  }
}`;

export const getSEOforAuthorPosts = `query FirmOverviewQuery($id: ID!) {
  user(id: $id, idType: DATABASE_ID) {
    seo {
      title
      canonical
      metaDesc
    }
  }
}`;

export const getServicesQuery = `
query ServicesQuery {
  page(id: 168619, idType: DATABASE_ID) {
    title
    seo {
      title
      metaDesc
    }
    pagesFields {
      description
    }
  }
}`;

export const industryQuery = `
query IndustryQuery($id: ID!) {
  industry(id: $id, idType: SLUG) {
    title
    status
    seo {
      metaDesc
      title
    }
    featuredImage {
      node {
        sourceUrl
      }
    }
    industryContent {
      description
      contentSection {
        description
        title
      }
      faq {
        description
        title
      }
      whyChooseUs {
        description
        title
      }
      industryAttorneys {
        ... on AttorneyProfile {
          databaseId
          uri
          title
          status
          attorneyMainInformation {
            designation
            email
            phoneNumber
            lastName
            profileImage {
              sourceUrl
            }
          }
          attorneyPrimaryRelatedPracticesLocationsGroups {
            officeLocation {
              ... on OfficeLocation {
                databaseId
                uri
                title
              }
            }
          }
        }
      }
      industryChief {
        ... on AttorneyProfile {
          databaseId
          uri
          title
          status
          attorneyMainInformation {
            designation
            email
            phoneNumber
            lastName
            profileImage {
              sourceUrl
            }
          }
          attorneyPrimaryRelatedPracticesLocationsGroups {
            officeLocation {
              ... on OfficeLocation {
                id
                databaseId
                uri
                title
              }
            }
          }
        }
      }
      clients {
        title
        description
      }
    }
    contentTabs {
      tabs {
        openerTitle
        tabContent {
          columns {
            description
            title
          }
          description
          title
        }
        image {
          sourceUrl
        }
      }
    }
  }
}`;

export const memorialsPageContentQuery = `
query MemorialsPageContentQuery {
  pageBy(pageId: 169052) {
    title
    pagesFields {
      description
    }
    featuredImage {
      node {
        sourceUrl
      }
    }
    seo {
      metaDesc
      title
    }
  }
}`;

export const memorialsQuery = `
query MemorialsQuery {
  memorials(first: 100) {
    nodes {
      title
      databaseId
      memorialFields {
        born
        death
        image {
          sourceUrl
        }
      }
      uri
    }
  }
}`;

export const memorialPageQuery = `
query MemorialPageQuery($slug: String) {
  memorialBy(slug: $slug) {
    seo {
      metaDesc
      title
    }
    title
    memorialFields {
      additionalInformation {
        columns {
          subtitle
          text
          title
        }
        content
        title
      }
      born
      death
      description
      image {
        sourceUrl
      }
      name
      title
    }
  }
}`;
