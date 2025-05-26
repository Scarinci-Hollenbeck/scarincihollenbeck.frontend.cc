const PERMANENT_REDIRECTS = [
  {
    source: '/basic-page/:slug*',
    destination: '/',
    permanent: true,
  },
  {
    source: '/firm-page/:slug*',
    destination: '/',
    permanent: true,
  },
  {
    source: '/attorneys/scarinci-hollenbeck',
    destination: '/firm-overview',
    permanent: true,
  },
  {
    source: '/location',
    destination: '/location/little-falls',
    permanent: true,
  },
  {
    source: '/attorney/:slug*',
    destination: '/attorneys/:slug*',
    permanent: true,
  },
  {
    source: '/attorneys/partners/:slug*',
    destination: '/attorneys/:slug*',
    permanent: true,
  },
  {
    source: '/attorneys/counsel/:slug*',
    destination: '/attorneys/:slug*',
    permanent: true,
  },
  {
    source: '/practices/sports-and-entertainment-law',
    destination: '/practices/entertainment-and-media',
    permanent: true,
  },
  {
    source: '/practices/sports-and-entertainment',
    destination: '/practices/entertainment-and-media',
    permanent: true,
  },
  {
    source:
      '/practices/sports-and-entertainment-law/intellectual-property-and-technology-law',
    destination: '/practices/entertainment-and-media',
    permanent: true,
  },
  {
    source: '/practices/tax-trust-and-estate-law',
    destination: '/practices/tax-trusts-estates',
    permanent: true,
  },
  {
    source: '/practices/tax-trusts-and-estates',
    destination: '/practices/tax-trusts-estates',
    permanent: true,
  },
  {
    source: '/practices/corporate-transactions-and-business-law',
    destination: '/practices/corporate-transactions-business',
    permanent: true,
  },
  {
    source: '/practices/corporate-transactions-and-business',
    destination: '/practices/corporate-transactions-business',
    permanent: true,
  },
  {
    source: '/practices/corporate-transactions-and-business-law/:slug*',
    destination: '/practices/corporate-transactions-business',
    permanent: true,
  },
  {
    source: '/practices/cyber-security-and-data-protection',
    destination: '/practices/cyber-security-data-privacy',
    permanent: true,
  },
  {
    source: '/practices/cyber-security-data-protection',
    destination: '/practices/cyber-security-data-privacy',
    permanent: true,
  },
  {
    source: '/practices/intellectual-property-technology',
    destination: '/practices/intellectual-property',
    permanent: true,
  },
  {
    source: '/practices/environmental-and-land-use',
    destination: '/practices/environmental',
    permanent: true,
  },
  {
    source:
      '/practices/corporate-transactions-and-business-law/labor-and-employment-law',
    destination: '/practices/labor-employment',
    permanent: true,
  },
  {
    source:
      '/practices/sports-and-entertainment-law/intellectual-property-and-technology-law',
    destination: '/practices/technology-law',
    permanent: true,
  },
  {
    source: '/practices/patent-law',
    destination: '/practices/patents',
    permanent: true,
  },
  {
    source: '/library/category/environmental-land-use',
    destination: '/library/category/environmental',
    permanent: true,
  },
  {
    source:
      '/practices/corporate-transactions-and-business-law/labor-and-employment-law',
    destination: '/practices/labor-employment',
    permanent: true,
  },
  {
    source: '/attorneys/counsel/dan-brecher',
    destination: '/attorneys/dan-brecher',
    permanent: true,
  },
  {
    source: '/practices/insurance-recovery-liability',
    destination: '/library/category/insurance',
    permanent: true,
  },
  {
    source:
      '/practices/sports-and-entertainment-law/intellectual-property-and-technology-law',
    destination: '/practices/technology-law',
    permanent: true,
  },
  {
    source: '/practices/federal-bankruptcy-practice',
    destination: '/practices/bankruptcy-and-creditors-rights',
    permanent: true,
  },
  {
    source: '/practices/sophisticated-estate-planning-and-wealth-preservation',
    destination: '/practices/sophisticated-estate-planning-wealth-preservation',
    permanent: true,
  },
  {
    source:
      '/practices/corporate-transactions-and-business-law/securities-offerings-and-corporate-disclosure',
    destination:
      '/practices/finra-defense-lawyers-securities-litigation-finra-arbitrations',
    permanent: true,
  },
  {
    source:
      '/practices/employee-benefits-erisa-corporate-transactions-and-business-law',
    destination: '/practices/corporate-transactions-business',
    permanent: true,
  },
  {
    source: '/offices/new-york-ny',
    destination: '/location/new-york',
    permanent: true,
  },
  {
    source: '/practices/securities-offerings-and-corporate-disclosure/%20',
    destination:
      '/practices/finra-defense-lawyers-securities-litigation-finra-arbitrations',
    permanent: true,
  },
  {
    source: '/practices/professional-liability-health-care',
    destination: '/practices/health-and-hospital-law',
    permanent: true,
  },
  {
    source:
      '/law-firm-insights/entertainment-and-sports/legalizing-sports-betting',
    destination: '/practices/gaming',
    permanent: true,
  },
  {
    source: '/practices/mergers-and-acquisitions',
    destination: '/practices/mergers-acquisitions',
    permanent: true,
  },
  {
    source: '/practices/environmental-and-land-use-law',
    destination: '/practices/environmental',
    permanent: true,
  },
  {
    source: '/practices/public-law/%20',
    destination: '/practices/public-law',
    permanent: true,
  },
  {
    source: '/practices/litigation/%20',
    destination: '/practices/litigation',
    permanent: true,
  },
  {
    source:
      '/practices/corporate-transactions-and-business-law/crisis-management',
    destination: '/practices/crisis-risk-management',
    permanent: true,
  },
  {
    source: '/practices/mortgage-lender-representation',
    destination: '/practices/mortgate-lender-borrower-representation',
    permanent: true,
  },
  {
    source:
      '/practices/alternative-dispute-resolution-mediation-and-arbitration',
    destination:
      '/practices/alternative-dispute-resolution-mediation-arbitration',
    permanent: true,
  },
  {
    source: '/practices/employee-benefits-erisa-law',
    destination: '/practices/public-employment-law',
    permanent: true,
  },
  {
    source: '/firm-news/top-nj-and-nyc-law-firms-unite',
    destination: '/firm-news/nj-and-nyc-law-firms-unite',
    permanent: true,
  },
  {
    source: '/practices/new-jersey-cannabis-law',
    destination: '/industries/cannabis',
    permanent: true,
  },
  {
    source: '/practices/entertainment-and-media',
    destination: '/industries/entertainment-and-media',
    permanent: true,
  },
  {
    source: '/practices/new-york-city-real-estate',
    destination: '/practices/nyc-real-estate-lawyer',
    permanent: true,
  },
  {
    source: '/practices',
    destination: '/services',
    permanent: true,
  },
  {
    source: '/industries',
    destination: '/services#industries',
    permanent: true,
  },
  {
    source: '/law-firm-insights/entertainment-and-sports/nba-fear-the-brow',
    destination: '/library/category/law-firm-insights',
    permanent: true,
  },
  {
    source: '/Attorneys/Oxley.htm',
    destination: '/attorneys',
    permanent: true,
  },
  {
    source: '/Attorneys/Brunetti.htm',
    destination: '/attorneys',
    permanent: true,
  },
  {
    source: '/Attorneys/Surgent.htm',
    destination: '/attorneys',
    permanent: true,
  },
  {
    source: '/locations',
    destination: '/location/new-york',
    permanent: true,
  },
  {
    source: '/contact-attorney',
    destination: '/contact-us',
    permanent: true,
  },
  {
    source: '/category/law-firm-insights',
    destination: '/library/category/law-firm-insights',
    permanent: true,
  },
  {
    source: '/location/%28City%29',
    destination: '/location/new-york',
    permanent: true,
  },
  {
    source: '/the-tax-abatement-process-in-jersey-city-nj-the-basics',
    destination: '/library/category/tax-abatement',
    permanent: true,
  },
  {
    source:
      '/law-firm-insights/entertainment-and-sports/why-would-an-nfls-antitrust-exemption-matter',
    destination: '/library/category/law-firm-insights',
    permanent: true,
  },
  {
    source: '/scarinci-hollenbeck-partner-appointed-judge-superior-court',
    destination: '/library/category/firm-news',
    permanent: true,
  },
  {
    source: '/practice/intellectual-property',
    destination: '/practices/intellectual-property',
    permanent: true,
  },
  {
    source: '/spokeo-decision-affect-nj-businesses',
    destination: '/library/category/law-firm-insights',
    permanent: true,
  },
  {
    source: '/about-us/diversity',
    destination: '/diversity',
    permanent: true,
  },
  {
    source: '/firm-news/summer-associates-volunteer-prisoner-rehab',
    destination: '/library/category/firm-news',
    permanent: true,
  },
  {
    source: '/peter-s-moeller-top-professionals-under-40',
    destination: '/library/category/firm-news',
    permanent: true,
  },
  {
    source:
      '/new-jersey-state-league-municipalities-names-john-m-scagnelli-environmental-counsel',
    destination: '/attorneys/john-m-scagnelli',
    permanent: true,
  },
  {
    source: '/lgbtq-scholarships',
    destination:
      '/law-firm-insights/second-circuit-rejects-appeal-of-employee-terminated-for-refusal-to-attend-lgbtq-bias-sensitivity-training',
    permanent: true,
  },
  {
    source: '/firm-news/congratulations/welcome-2017-summer-associates',
    destination: '/library/category/firm-news',
    permanent: true,
  },
  {
    source: '/location/washington-dc',
    destination: '/location/new-york',
    permanent: true,
  },
  {
    source: '/contact',
    destination: '/contact-us',
    permanent: true,
  },
  {
    source: '/subscribe',
    destination: '/contact-us',
    permanent: true,
  },
  {
    source: '/work-life-balance',
    destination: '/work-life-integration',
    permanent: true,
  },
];

module.exports = {
  PERMANENT_REDIRECTS,
};
