import dynamic from 'next/dynamic'

// Main Components
export const Header = dynamic(() => import('./Header/Header'))
export const HeaderMenu = dynamic(() => import('./Header/HeaderMenu'))
export const ImageFooter = dynamic(() => import('./Footer/ImageFooter'))

//export Header from './Header/Header';
//export HeaderMenu from './Header/HeaderMenu';
// export Sidebar from './Sidebar';
export const Sidebar = dynamic(() => import('./Sidebar'))
export const SidebarContent = dynamic(() => import('./Sidebar/SidebarContent'))
export const MainMenu = dynamic(() => import('./Sidebar/MainMenu'));
// export BreadCrumb from './BreadCrumb/BreadCrumb';
export const BreadCrumb = dynamic(() => import('./BreadCrumb/BreadCrumb'))
export const PapperBlock = dynamic(() => import('./PapperBlock/PapperBlock'));
// export SearchUi from './Search/SearchUi';
export const SearchUi = dynamic(() => import('./Search/SearchUi'))

// export const Loading = dynamic(() => import('./Loading'))

// Guide
// export GuideSlider from './GuideSlider';
export const GuideSlider = dynamic(() => import('./GuideSlider'))
// SliderComponent
// export AnimatedSlider from './SliderCaraousel/AnimatedSlider';



// export UserSettings from './Forms/UserSettings';
// export ProfileSettings from './Forms/ProfileSettings';
// export GeneralSettings from './Forms/GeneralSettings';
// export RecordSharedSettings from './Forms/RecordSharedSettings';
// export RecordSigninSettings from './Forms/RecordSigninSettings';
// export SocialNetworkSettings from './Forms/SocialNetworkSettings';
// export FormPosts from './Forms/FormPosts';
// export FormProjects from './Forms/FormProjects';
// export FormGuideTasks from './Forms/FormGuideTasks';

// Email
// export ManagementHeader from './Management/ManagementHeader';
// export ManagementSidebar from './Management/ManagementSidebar';

// Social Media
// export Cover from './SocialMedia/Cover';

// Error
// export ErrorWrap from './Error/ErrorWrap';
export const ErrorWrap = dynamic(() => import('./Error/ErrorWrap'))
export const NoData = dynamic(() => import('./Error/NoData'));

// Buttons
export const BigIconButton = dynamic(() => import('./Buttons/BigIconButton'));

export const CarouselWidget = dynamic(() => import('./Widget/CarouselWidget'));
export const SliderWidget = dynamic(() => import('./Widget/SliderWidget'));
export const NewsWidget = dynamic(() => import('./Widget/NewsWidget'));

// Card
export const ButtonCard = dynamic(() => import('./CardPaper/ButtonCard'));
export const ChannelsCard = dynamic(() => import('./CardPaper/ChannelsCard'));
export const HeadlineCard = dynamic(() => import('./CardPaper/HeadlineCard'));
export const ShowcaseCard = dynamic(() => import('./CardPaper/ShowcaseCard'));
export const PostCard = dynamic(() => import('./CardPaper/PostCard'));
export const PostsGrid = dynamic(() => import('./Lists/PostsGrid'));
export const ProfileCard = dynamic(() => import('./CardPaper/ProfileCard'));
export const NewsCard = dynamic(() => import('./CardPaper/NewsCard'));
export const PdfReaderCard = dynamic(() => import('./CardPaper/pdfReaderCard'));
export const SearchButtonsContainer = dynamic(()=> import('./CardPaper/SearchButtonsContainer'))
export const SearchButtonsCard = dynamic(()=> import('./CardPaper/SearchButtonsCard'))

// social media
// export Comments from './Comments';

// Landing page
// export Contact from './LandingPage/Contact';
// export Footer from './LandingPage/Footer';

export const CounterTrading = dynamic(() => import('./Counter/CounterTrading'))

// Form
export const LoginForm = dynamic(() => import('./Forms/LoginForm'));
export RegisterForm from './Forms/RegisterForm';
export const MaterialDropZone = dynamic({
  loader: () => import('./Forms/MaterialDropZone'),
  ssr: false
});
export ResetForm from './Forms/ResetForm';