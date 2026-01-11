import React from 'react';
import Banner from '../Banner/Banner';
import PopularContests from '../PopularContests/PopularContests';
import WinnerAdvertisement from '../WinnerAdvertisement/WinnerAdvertisement';
import ExtraSection from '../ExtraSection/ExtraSection';
import CategorySection from '../CategorySection/CategorySection';
import StatsSection from '../StatsSection/StatsSection';
import TestimonialsSection from '../TestimonialsSection/TestimonialsSection';
import NewsletterSection from '../NewsletterSection/NewsletterSection';
import BlogSection from '../BlogSection/BlogSection';
import CTASection from '../CTASection/CTASection';


const Home = () => {
  return (
    <div>
    <Banner></Banner>
    <PopularContests></PopularContests>
    <CategorySection></CategorySection>
    <WinnerAdvertisement></WinnerAdvertisement>
    <ExtraSection></ExtraSection>
    <StatsSection></StatsSection>
    <TestimonialsSection></TestimonialsSection>
    <BlogSection></BlogSection>
    <NewsletterSection></NewsletterSection>
    <CTASection></CTASection>
    </div>
  );
};

export default Home;