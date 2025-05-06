export const practicesQuery = `query PracticeQuery($id: ID!) {
  practice(id: $id, idType: URI) {
    databaseId
    slug
    title
    status
    practicesIncluded {
			practiceImage {
					sourceUrl
				}
      faq {
        title
        description
      }
      contentSection {
        title
        content
      }
      description
      includeAttorney {
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
      sectionChief {
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
            qrCodeBioPage {
              sourceUrl
            }
            qrCodeLinkedin {
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
      keyContactByPractice {
        ... on AttorneyProfile {
          databaseId
          uri
          title
          status
          attorneyMainInformation {
            designation
            email
            phoneNumber
            profileImage {
              sourceUrl
            }
            qrCodeBioPage {
              sourceUrl
            }
            qrCodeLinkedin {
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
      whyChooseUs {
        description
        title
      }
      awards {
        appearanceOrder
        awardImage {
          sourceUrl
        }
        label
        year
      }
      sidebarContent {
        quote
        text
      }
    }
    seo {
      title
      metaDesc
    }
  }
}`;

export const keyContactsByParentPracticeQuery = `
query KeyContactsByParentPracticeQuery($id: ID!) {
  practice(id: $id, idType: DATABASE_ID) {
    practicesIncluded {
      keyContactByPractice {
        ... on AttorneyProfile {
          databaseId
          uri
          title
          status
          attorneyMainInformation {
            designation
            email
            phoneNumber
            profileImage {
              sourceUrl
            }
            qrCodeBioPage {
              sourceUrl
            }
            qrCodeLinkedin {
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
      sectionChief {
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
            qrCodeBioPage {
              sourceUrl
            }
            qrCodeLinkedin {
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
    }
  }
}`;
