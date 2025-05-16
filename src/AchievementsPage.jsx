import { useState, useEffect } from 'react';
import './achievements.css';

function AchievementsPage({ theme, hikeStats, hikes }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome to the Achievements Page!");

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const timer = setTimeout(() => setWelcomeMessage(""), 3000);
    return () => clearTimeout(timer);
  }, []);

  const totalMiles = hikeStats.totalDistance || "0 miles";
  const totalTrails = hikeStats.totalTrails || 0;

  return (
    <main id="main" className={`achievements ${theme}`}>
      {welcomeMessage && <div className="welcome-message">{welcomeMessage}</div>}
      <h1 className="achievements-title">Your Trailblazing Achievements</h1>
      <div className="accordion">
        {[
          {
            title: "First Trail Completed",
            content: (
              <>
                <p>Your journey began with this trail:</p>
                <ul>
                  <li>Trail: {hikes.length > 0 ? hikes[0].name : "None yet!"}</li>
                  <li>Distance: {hikes.length > 0 ? hikes[0].distance : "N/A"}</li>
                  <li>Memorable moment: Starting your hiking adventure!</li>
                </ul>
              </>
            ),
          },
          {
            title: "Explorer Badge Earned",
            content: (
              <>
                <p>You’ve explored {totalTrails} trails so far. Here are some highlights:</p>
                <ul>
                  <li>Total trails: {totalTrails}</li>
                  <li>Longest trail completed: {hikes.length > 0 ? hikes.reduce((longest, hike) =>
                    parseFloat(hike.distance) > parseFloat(longest.distance) ? hike : longest
                  ).name : "None yet!"}</li>
                  <li>Favorite trail: Skyline Trail (based on popularity)</li>
                </ul>
              </>
            ),
          },
          {
            title: "100 Miles Club",
            content: (
              <>
                <p>You’ve logged an impressive {totalMiles}. Keep it going!</p>
                <ul>
                  <li>Milestone date: {totalMiles >= 100 ? "Achieved!" : "In Progress"}</li>
                  <li>Goal: Complete 200 miles by the end of the year.</li>
                </ul>
              </>
            ),
          },
          {
            title: "Blazed the Hardest Trail",
            content: (
              <>
                <p>You’ve conquered the hardest trails:</p>
                <ul>
                  <li>Most challenging: {hikes.find((hike) => hike.name === "The Enchantments") ? "The Enchantments" : "None yet!"}</li>
                  <li>Distance: 18 miles</li>
                  <li>Completed on: {hikes.find((hike) => hike.name === "The Enchantments") ? "Recorded Date" : "N/A"}</li>
                </ul>
              </>
            ),
          },
          {
            title: "Trailblazer Goals",
            content: (
              <>
                <p>Set your next milestone:</p>
                <ul>
                  <li>Next goal: Complete 15 unique trails.</li>
                  <li>Longest hike to attempt: Wonderland Trail (93 miles).</li>
                  <li>Upcoming event: Group hike on Cascade Pass (December 30).</li>
                </ul>
              </>
            ),
          },
        ].map((item, index) => (
          <div className="accordion-item" key={index}>
            <button
              className="accordion-header"
              onClick={() => toggleAccordion(index)}
              aria-expanded={openIndex === index}
              aria-controls={`accordion-content-${index}`}
              id={`accordion-header-${index}`}
            >
              {item.title}
            </button>
            {openIndex === index && (
              <div
                className="accordion-content"
                id={`accordion-content-${index}`}
                role="region"
                aria-labelledby={`accordion-header-${index}`}
              >
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default AchievementsPage;
