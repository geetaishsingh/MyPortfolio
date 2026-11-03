import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import Footer from '../../components/Footer/Footer';
import DeferredSection from '../../components/common/DeferredSection/DeferredSection';
import './Home.scss';

const loadAbout = () => import('../../components/About/About');
const loadServices = () => import('../../sections/Services/Services');
const loadSkills = () => import('../../sections/Skills/Skills');
const loadProjects = () => import('../../components/Projects/Projects');
const loadEducation = () => import('../../components/Education/Education');
const loadContact = () => import('../../sections/Contact/Contact');

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const element = document.querySelector(location.hash);
    if (element) {
      window.setTimeout(() => {
        const headerOffset = 80;
        const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  return (
    <div className="home-page">
      <Header />
      <main>
        <Hero />
        <DeferredSection id="about" load={loadAbout} reserveClass="home__section-slot--about" />
        <DeferredSection id="services" load={loadServices} reserveClass="home__section-slot--services" />
        <DeferredSection id="skills" load={loadSkills} reserveClass="home__section-slot--skills" />
        <DeferredSection id="projects" load={loadProjects} reserveClass="home__section-slot--projects" />
        <DeferredSection id="education" load={loadEducation} reserveClass="home__section-slot--education" />
        <DeferredSection id="contact" load={loadContact} reserveClass="home__section-slot--contact" />
      </main>
      <Footer />
    </div>
  );
}
