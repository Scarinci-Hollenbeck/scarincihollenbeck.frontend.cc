export const practicesQueryGenerator = (uri) => {
  const practiceMap = {
    '/practices/entertainment-and-media': `practiceContentForEntertainmentLaw {
      entertainmentMedia {
        subTitle
        attorneysTitleBox
        sliderBackgrounds {
          backgroundImage {
            sourceUrl
            title
            databaseId
          }
          title
        }
        entertainmentInfoBlock {
          tabs {
            imageBackground {
              databaseId
              sourceUrl
              title
              mediaDetails {
                height
                width
              }
            }
            imagePosition
            lawInfo {
              description
              servicesList {
                title
              }
            }
            modalData {
              modalServicesDescription
              moreServicesList {
                title
              }
            }
            title
          }
        }
        clientsBlock {
          description
          title
        }
        practicesList {
          imageUnderTitle {
            sourceUrl
            title
            mediaDetails {
              height
              width
            }
          }
          title
        }
      }
    }
		`,
    '/practices/new-jersey-cannabis-law': `practiceContentForeCannabisLaw {
				cannabisLaw {
					cardsInfo {
						cards {
							title
							paragraph
						}
					}
					descriptionSubheader
					subTitle
					attorneysArticleBlock {
						paragraph
						title
					}
					keycontactsblock {
						article
						listOfLegalGuidanceRegarding {
							issue
						}
					}
					helpArticleBlock {
						title
						paragraphs {
							paragraph
						}
					}
					newspaperBlock {
						article {
							paragraph
							title
						}
						newspaperBox {
							newspaperArticle
							newspaperPhotoBox {
								altText
								sourceUrl
								caption
							}
						}
					}
					subheaderBackgroundVideo {
						link
					}
					photoBlock {
						articleBox {
							paragraph
							title
						}
						cannabisClients {
							clientLink {
								title
								url
							}
							clientLogo {
								databaseId
								sourceUrl
								title
							}
							clientTitle
						}
					}
				}
			}
		`,
  };
  return `query FirmPageQuery($id: ID!) {
  practice(id: $id, idType: URI) {
    databaseId
    slug
    title
    practicesIncluded {
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
      childPractice {
        ... on Practice {
          databaseId
          title
          slug
        }
      }
      relatedBlogCategory {
        databaseId
      }
      keyContactByPractice {
        ... on AttorneyProfile {
          databaseId
          uri
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
                databaseId
                uri
                title
              }
            }
          }
        }
      }
    }
    seo {
      title
      metaDesc
    }
    ${practiceMap[uri] ? practiceMap[uri] : ''}
  }
  practices(first: 100) {
    nodes {
      title
      uri
      databaseId
      practicesIncluded {
        childPractice {
          ... on Practice {
            databaseId
          }
        }
      }
    }
  }
  posts(where: {categoryIn: [99, 98]}, first: 2) {
    nodes {
      uri
      title
      databaseId
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}`;
};
