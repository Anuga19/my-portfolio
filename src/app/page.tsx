import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Services from "@/components/Services";
import PhotoStrip from "@/components/PhotoStrip";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <main
        className="site-main"
        style={{
          flex: 1,
          background: "#f9f9f9",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        <section id="home" style={{ borderBottom: "1px solid #ededed" }}>
          <Hero />
        </section>

        <section id="projects" style={{ borderBottom: "1px solid #ededed" }}>
          <Projects />
        </section>

        <section id="about" style={{ borderBottom: "1px solid #ededed" }}>
          <About />
        </section>

        <section style={{ borderBottom: "1px solid #ededed" }}>
          <Services />
        </section>

        <section style={{ borderBottom: "1px solid #ededed" }}>
          <PhotoStrip />
        </section>

        <section style={{ borderBottom: "1px solid #ededed" }}>
          <Testimonials />
        </section>

        <section style={{ borderTop: "1px solid #ededed" }}>
          <CTA />
        </section>
      </main>
    </div>
  );
}
