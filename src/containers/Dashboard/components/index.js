import dynamic from "next/dynamic";

export const GazetteSlider = dynamic(() => import('./GazetteSlider'));
export const ObrasSlider = dynamic(() => import('./ObrasSlider'));
export const MunicipalStats = dynamic(() => import('./MunicipalStats'));
export const Contacts = dynamic(() => import('./Contacts'));
export const Features = dynamic(() => import('./Features'));
export const SliderLanding = dynamic(() => import('./SliderLanding'));