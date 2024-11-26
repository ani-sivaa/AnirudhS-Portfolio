import { useEffect } from "react";
import Head from 'next/head';
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import WorkExperience from "../components/WorkExperience";
import Skills from "../components/Skills";
import Projects from "../components/Projects"
import ContactMe from "../components/ContactMe"
import Link from "next/link";

export default function Home() {
  

  return (
    <div className="bg-[rgb(17,17,17)] text-white h-screen snap-y snap-mandatory overflow-y-scroll z-0 overflow-x-hidden">
      <Head>
        <title>Anirudh's Portfolio</title>
      </Head>
      {/* Header */}
      <Header />

      {/* Hero */}
      <section id="hero" className="snap-start">
        <Hero />
      </section>

      {/* About */}
      <section id="about" className="snap-center">
        <About />
      </section>

      {/* Experience */}
      <section id="Experience" className="snap-center">
        <WorkExperience />
      </section>

      {/* Skills */}
      <section id='Skills' className="snap-start">
        <Skills/>

      </section>
      {/* Projects */}
       <section id="Projects" className="snap-start">
       <Projects />
       
       </section>
       
      {/* Contact Me */}
      <section className="snap-start">
        <ContactMe/>
      </section>
      <Link href="#hero">
        <footer className="sticky bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-center">
            <img
            className="h-10 w-10 rounded-full filter grayscale hover:grayscale-0 cursor-pointer"
            src="https://media.licdn.com/dms/image/v2/D5603AQHGL5oyMrU93A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718319210642?e=1738195200&v=beta&t=TX8nUs_HdgaljGTpI1k05ZCQOtNcBeT0-j4Q3yxY8Wk"
            alt="Homepagebutton"
            />

          </div>
        </footer>
      </Link>
    </div>
  );
}
