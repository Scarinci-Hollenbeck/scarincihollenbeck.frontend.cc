export const allAdministraionQuery = `{
  administrations(where: {orderby: {field: DATE, order: DESC}}) {
    edges {
      node {
        administration {
          name
          title
          email
          phoneExtension
          order
        }
        uri
        featuredImage {
          node {
            sourceUrl(size: CATEGORY_THUMB)
          }
        }
      }
    }
  }
}`;

export const singleAdministraionQuery = (slug) => `{
    administrations(where: {name: "${slug}"}) {
      edges {
        node {
          administration {
            name
            title
            email
            phoneExtension
            location {
              ... on OfficeLocation {
                title
                uri
              }
            }
            biography
            featuredImage {
              mediaDetails {
                sizes {
                  width
                  height
                  name
                  sourceUrl
                }
              }
              sourceUrl
            }
            socialMediaLinks {
              url
              channel
            }
            vizibility
          }
          uri
          seo {
            title
            metaDesc
          }
        }
      }
    }
  }`;

export const getAllAdministration = ` {
  administrations(first: 10) {
    nodes {
      slug
    }
  }
}
`;
