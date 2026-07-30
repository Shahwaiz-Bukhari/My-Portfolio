import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";

export default function Page() {
  return (
    <main>
      <Header />
      <Hero />
      <Work />
      <Experience />
      <Stack />
      <Contact />
      <Footer />
      <CustomCursor />
      <SmoothScroll />
    </main>
  );
}
