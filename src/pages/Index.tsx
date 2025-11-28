import React from 'react';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-navy-950 overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <AnnouncementBanner />
      </div>
      <Navigation />
      <main className="relative">
        <Hero onShowDemo={() => { }} />
        <Features />
        <Testimonials />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Index;
