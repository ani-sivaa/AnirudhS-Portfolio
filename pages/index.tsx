import { useEffect } from "react";
import Head from 'next/head';
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import WorkExperience from "../components/WorkExperience";
import Skills from "../components/Skills";
export default function Home() {
  

  return (
    <div className="bg-[rgb(17,17,17)] text-white h-screen snap-y snap-mandatory overflow-scroll z-0">
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
      {/* Contact Me */}
    </div>
  );
}
