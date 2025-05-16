import { useState, useEffect, useRef } from "react";
import "./my-hike.css";

const pinData = [
  { id: 1, title: "Skyline Trail", x: "40%", y: "50%" },
  { id: 2, title: "Lake 22", x: "60%", y: "30%" },
  { id: 3, title: "Maple Pass", x: "20%", y: "70%" },
  { id: 4, title: "Green Lake", x: "80%", y: "80%" },
];

const cardData = [
  {
    id: 1,
    name: "Skyline Trail",
    stats: "10 miles, Moderate",
    image: "/images/rainier_spring.jpg",
    reviews:
      "A breathtaking trail with mountain views! Perfect for those who love open landscapes and incredible photography opportunities. Best time to visit is during summer for wildflower blooms.",
  },
  {
    id: 2,
    name: "Lake 22",
    stats: "7 miles, Moderate",
    image: "/images/lake_22.jpg",
    reviews:
      "Peaceful hike with a gorgeous lake. Ideal for beginners looking to experience a serene environment surrounded by towering trees. Watch for occasional wildlife sightings near the lake!",
  },
  {
    id: 3,
    name: "Maple Pass",
    stats: "8 miles, Hard",
    image: "/images/maple.jpg",
    reviews:
      "Challenging but totally worth the view! Features alpine meadows, vibrant fall colors, and snow-covered peaks. A must-visit for experienced hikers and adventure lovers.",
  },
];

const galleryData = [
  { id: 1, name: "Skyline Trail", difficulty: "Moderate", image: "/images/rainir.jpg" },
  { id: 2, name: "Lake 22", difficulty: "Moderate", image: "/images/alpine.jpg" },
  { id: 3, name: "Maple Pass", difficulty: "Hard", image: "/images/maple_fall.jpg" },
  { id: 4, name: "Blue Lake", difficulty: "Easy", image: "/images/blue_lake_fall.jpg" },
  { id: 5, name: "Chain Lakes", difficulty: "Moderate", image: "/images/chains.jpg" },
  { id: 6, name: "Enchantments", difficulty: "Hard", image: "/images/enchantments.jpg" },
];

function MyHike({ theme }) {
  const [filter, setFilter] = useState("All");
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome to the My Hikes Page!");
  const [highlightedTrail, setHighlightedTrail] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => setWelcomeMessage(""), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const randomTrail = cardData[Math.floor(Math.random() * cardData.length)];
    setHighlightedTrail(randomTrail);
  }, []);

  const handlePinClick = (index) => {
    cardRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredGallery = filter === "All" ? galleryData : galleryData.filter((trail) => trail.difficulty === filter);

  return (
    <main id="main" className={`map-page ${theme}`}>
      {welcomeMessage && <div className="welcome-message">{welcomeMessage}</div>}

      <div className="map-container">
        <h1 className="map-title">Interactive Map</h1>
        <div className="custom-map">
          <img src="/images/map.jpg" alt="Custom map with marked hiking trails" className="map-image" />
          {pinData.map((pin, index) => (
            <div
              key={pin.id}
              className="map-pin"
              title={pin.title}
              style={{
                left: pin.x,
                top: pin.y,
              }}
              onClick={() => handlePinClick(index)}
            ></div>
          ))}
        </div>
      </div>

      <div className="recommendation-section">
        <h2>Trail of the Moment</h2>
        {highlightedTrail ? (
          <p>
            {highlightedTrail.name} - {highlightedTrail.stats}
          </p>
        ) : (
          <p>Loading...</p>
        )}
        <p>{highlightedTrail?.reviews}</p>
      </div>

      <div className="cards-container">
        <h2 className="section-title">Trail Highlights</h2>
        <div className="cards-grid">
          {cardData.map((card, index) => (
            <div key={card.id} 
            ref={(el) => (cardRefs.current[index] = el)}
            className="card">
              <img src={card.image} alt={`${card.name} - ${card.stats}`} className="card-image" /> 
              <div className="card-content">
                <h3 className="card-title">{card.name}</h3>
                <p className="card-stats">{card.stats}</p>
                <p className="card-reviews">{card.reviews}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="gallery-container">
        <h2 className="section-title">Trail Gallery</h2>
        <div className="filter-buttons">
          <button onClick={() => setFilter("All")} className={filter === "All" ? "active" : ""}>
            All
          </button>
          <button onClick={() => setFilter("Easy")} className={filter === "Easy" ? "active" : ""}>
            Easy
          </button>
          <button onClick={() => setFilter("Moderate")} className={filter === "Moderate" ? "active" : ""}>
            Moderate
          </button>
          <button onClick={() => setFilter("Hard")} className={filter === "Hard" ? "active" : ""}>
            Hard
          </button>
        </div>
        <div className="gallery-grid">
          {filteredGallery.map((trail) => (
            <div key={trail.id} className="gallery-item">
              <img src={trail.image} alt={`${trail.name} - ${trail.difficulty} trail`} className="gallery-image" />
              <h3 className="gallery-title">{trail.name}</h3>
              <p className="gallery-difficulty">{trail.difficulty} Trail</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default MyHike;
