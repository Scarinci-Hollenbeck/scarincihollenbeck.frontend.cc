import dynamic from 'next/dynamic';

const icons = {
  Attorneys: dynamic(() => import('components/common/icons/AttorneysIcon')),
  Banking: dynamic(() => import('components/common/icons/BankingIcon')),
  Cannabis: dynamic(() => import('components/common/icons/CannabisIcon')),
  Careers: dynamic(() => import('components/common/icons/CareersIcon')),
  Firm: dynamic(() => import('components/common/icons/FirmIcon')),
  Food: dynamic(() => import('components/common/icons/FoodIcon')),
  Home: dynamic(() => import('components/common/icons/HomeIcon')),
  Industries: dynamic(() => import('components/common/icons/IndustriesIcon')),
  'News paper': dynamic(() => import('components/common/icons/LibraryIcon')),
  Locations: dynamic(() => import('components/common/icons/LocationsIcon')),
  'Office Locations': dynamic(() => import('components/common/icons/LocationsIcon')),
  MailingList: dynamic(() => import('components/common/icons/MailingListIcon')),
  Media: dynamic(() => import('components/common/icons/MediaIcon')),
  Payment: dynamic(() => import('components/common/icons/PaymentIcon')),
  Posts: dynamic(() => import('components/common/icons/PostsIcon')),
  Practices: dynamic(() => import('components/common/icons/PracticesIcon')),
  'Real Estate': dynamic(() => import('components/common/icons/RealEstateIcon')),
  Transportation: dynamic(() => import('components/common/icons/TransportationIcon')),
  Brain: dynamic(() => import('components/common/icons/BrainIcon')),
  Briefcase: dynamic(() => import('components/common/icons/BriefcaseIcon')),
  Documents: dynamic(() => import('components/common/icons/DocumentsIcon')),
  Environmental: dynamic(() => import('components/common/icons/EnvironmentalIcon')),
  Tax: dynamic(() => import('components/common/icons/TaxIcon')),
  Check: dynamic(() => import('components/common/icons/CheckIcon')),
  Map: dynamic(() => import('components/common/icons/MapIcon')),
  Scope: dynamic(() => import('components/common/icons/ScopeIcon')),
  Globe: dynamic(() => import('components/common/icons/GlobeIcon')),
  Bulb: dynamic(() => import('components/common/icons/BulbIcon')),
  Government: dynamic(() => import('components/common/icons/GovernmentIcon')),
  Gaming: dynamic(() => import('components/common/icons/GamingIcon')),
  Culture: dynamic(() => import('components/common/icons/CultureIcon')),
  Balance: dynamic(() => import('components/common/icons/BalanceIcon')),
  Benefits: dynamic(() => import('components/common/icons/BenefitsIcon')),
  Collaborative: dynamic(() => import('components/common/icons/CollaborativeIcon')),
};

export const getIcon = (name) => {
  const IconComponent = icons[name];
  return IconComponent ? <IconComponent /> : null;
};
