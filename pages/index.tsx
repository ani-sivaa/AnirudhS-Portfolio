import type {NextPage} from "next"
import Head from 'next/head'
import Header from "../components/Header"
import Hero from "../components/Hero"
import About from "../components/About"
import WorkExperience from "../components/WorkExperience"
export default function Home() {
  return (
    <div className="bg-[rgb(17,17,17)] text-white h-screen snap-y snap-mandatory overflow-scroll z-0" /* Header and full background color*/>
      <Head>
        <title>Anirudh's Portfolio</title>
      </Head>
      {/*Header */}
      <Header />


      {/*Hero*/}
      <section id="hero" className="snap-start">
        <Hero />
      </section>


      {/*About */}
      <section id='about' className="snap-center">
        <About />
      </section>


      {/* Experience */}
      <section id='Experience' className="snap-center">
        <WorkExperience />
      </section>
      {/* Skills */}
      {/* Projects */}
      {/*Contact Me */}



    </div>
   
  );
}

