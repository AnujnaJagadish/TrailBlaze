import { useState, useEffect } from "react";
import "./home.css";

function HomePage({ hikeStats, theme, setPage, hikes }) {
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome to the Home Page!");
  const [highlightedTrail, setHighlightedTrail] = useState(null);
  const [funFact, setFunFact] = useState("");
  const goal = 200;

  const funFacts = [
    "Did you know? Hiking can burn up to 500 calories per hour!",
    "TrailBlaze users have logged over 10,000 miles collectively.",
    "The Pacific Northwest has some of the most scenic trails in the US.",
    `${hikeStats.mostPopularTrail || "Skyline Trail"} is known for its stunning wildflower meadows.`,
  ];

  const recommendedTrail = {
    name: "Maple Pass Loop",
    distance: "8 miles",
    difficulty: "Hard",
    reason: "Recommended for experienced hikers who have completed over 100 miles.",
  };

  const mostPopularTrail = hikeStats.mostPopularTrail || "Skyline Trail";

  const progress = Math.min((parseFloat(hikeStats.totalDistance) / goal) * 100, 100);

  const trailStats = [
    ...hikes.map((hike) => ({
      name: hike.name,
      distance: hike.distance,
      difficulty: hike.difficulty || "Moderate",
    })),
  ];

  useEffect(() => {
    const timer = setTimeout(() => setWelcomeMessage(""), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const factInterval = setInterval(() => {
      const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
      setFunFact(randomFact);
    }, 2000);

    return () => clearInterval(factInterval);
  }, [funFacts]);

  useEffect(() => {
    if (hikes.length > 0) {
      const randomIndex = Math.floor(Math.random() * hikes.length);
      const randomHike = hikes[randomIndex];
      setHighlightedTrail({
        name: randomHike.name,
        distance: randomHike.distance,
        difficulty: randomHike.difficulty || "Moderate",
      });
    } else {
      setHighlightedTrail(null);
    }
  }, [hikes]);

  const getTimeBasedGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning, Hiker!";
    if (hours < 18) return "Good Afternoon, Adventurer!";
    return "Good Evening, Trailblazer!";
  };

  return (
    <main id="main" className={`main ${theme}`}>
      {welcomeMessage && <div className="welcome-message">{welcomeMessage}</div>}

      <div className="main-content">
        <h2 className="main-title">{getTimeBasedGreeting()}</h2>
        <p className="main-subtitle">Your guide to the best hiking trails in the Pacific Northwest.</p>
        <button className="main-button" onClick={() => setPage("explore")}>
          Explore Trails
        </button>
      </div>

      <div className="highlights-container">
        <div className="highlight-card">
          <h2>{hikeStats.totalTrails} Scenic Hikes</h2>
          <p>Total Trails</p>
        </div>
        <div className="highlight-card">
          <h2>{hikeStats.totalDistance} Miles</h2>
          <p>Total Distance Covered</p>
        </div>
        <div className="highlight-card">
          <h2>{mostPopularTrail}</h2>
          <p>Most Popular Trail</p>
        </div>
      </div>

      <div className="dynamic-sections">
        <div className="highlighted-trail">
          <h2>Trail of the Moment</h2>
          {highlightedTrail ? (
            <p>
              {highlightedTrail.name} - {highlightedTrail.distance} ({highlightedTrail.difficulty})
            </p>
          ) : (
            <p>No trails available yet.</p>
          )}
        </div>

        <div className="fun-facts">
          <h2>Fun Fact</h2>
          <p>{funFact || "Loading a fun fact..."}</p>
        </div>

        <div className="recommendation-section">
          <h2>Recommended Trail</h2>
          <p>
            {recommendedTrail.name} - {recommendedTrail.distance} ({recommendedTrail.difficulty})
          </p>
          <p>{recommendedTrail.reason}</p>
        </div>

        <div className="trail-stats">
          <h2>Trail Stats</h2>
          <div className="trail-stats-cards">
            {trailStats.map((trail, index) => (
              <div key={index} className="trail-card">
                <h3>{trail.name}</h3>
                <p>
                  <strong>Distance:</strong> {trail.distance}
                </p>
                <p>
                  <strong>Difficulty:</strong> {trail.difficulty}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="progress-container">
          <h2>Your Hiking Goal</h2>
          <div className="progress-bar">
            <div
              className="progress-filled"
              style={{ width: `${progress}%` }}
              aria-label={`Progress towards goal: ${progress.toFixed(1)}%`}
            ></div>
          </div>
          <p>
            {hikeStats.totalDistance} / {goal} miles
          </p>
        </div>
      </div>
    </main>
  );
}

export default HomePage;
