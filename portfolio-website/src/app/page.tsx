import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Hobbies from '@/components/Hobbies';
import Contact from '@/components/Contact';
import Background from '@/components/Background';

export default function Home() {
  return (
    <>
      <Background />
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="w-full">
          <Hero />
          <section id="experience"><Experience /></section>
          <section id="projects"><Projects /></section>
          <section id="skills"><Skills /></section>
          <section id="hobbies"><Hobbies /></section>
          <section id="contact"><Contact /></section>
        </div>
      </main>
    </>
  );
}
