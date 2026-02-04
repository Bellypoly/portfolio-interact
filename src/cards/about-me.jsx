import AstronautCard from "./astronaut-id-card.jsx";

export default function AboutMe() {
  return (
    <div style={{ background: "#05090c", minHeight: "100vh", padding: 24 }}>
      <AstronautCard
        onCtaClick={() => console.log("Launch!")}
        ctaLabel="Begin Your Journey"
      />
    </div>
  );
}
