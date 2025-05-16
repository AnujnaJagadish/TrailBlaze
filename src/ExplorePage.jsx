import { useState, useRef, useEffect } from "react";
import "./explore.css";

function ExplorePage({ theme, setHikeStats, hikes, setHikes }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newHike, setNewHike] = useState({
    name: "",
    date: "",
    distance: "",
    notes: "",
  });
  const [selectedTrail, setSelectedTrail] = useState("Other");
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome to the Discover Hikes Page!");
  const [updateMessage, setUpdateMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [distanceRange, setDistanceRange] = useState([0, 20]);
  const modalRef = useRef(null);

  const recommendations = [
    { id: 1, name: "Lake Ingalls", difficulty: "Moderate", distance: 9, image: "/images/ingalls.jpg", alt: "Lake Ingalls with stunning mountain reflections" },
    { id: 2, name: "Goat Lake", difficulty: "Moderate", distance: 10.4, image: "/images/goat.jpg", alt: "Goat Lake surrounded by snow-capped peaks" },
    { id: 3, name: "Mount Si", difficulty: "Hard", distance: 8, image: "/images/si.jpg", alt: "Mount Si with a challenging rocky trail" },
    { id: 4, name: "Snow Lake", difficulty: "Moderate", distance: 7.2, image: "/images/snow.jpg", alt: "Snow Lake with crystal-clear water" },
    { id: 5, name: "Mailbox Peak", difficulty: "Hard", distance: 9.4, image: "/images/mailbox.jpg", alt: "Mailbox Peak with an iconic mailbox at the summit" },
    { id: 6, name: "Heather Lake", difficulty: "Easy", distance: 4.6, image: "/images/heather.jpg", alt: "Heather Lake surrounded by evergreen trees" },
    { id: 7, name: "Rattlesnake Ledge", difficulty: "Easy", distance: 4, image: "/images/rattle.jpg", alt: "Rattlesnake Ledge with an expansive view" },
    { id: 8, name: "Hoh", difficulty: "Easy", distance: 5.2, image: "/images/hoh.jpg", alt: "Lush greenery in the Hoh Rain Forest" },
    { id: 9, name: "Cascade Pass", difficulty: "Moderate", distance: 7.4, image: "/images/cascades.jpg", alt: "A scenic trail at Cascade Pass" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setWelcomeMessage(""), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (modalOpen && modalRef.current) {
      modalRef.current.showModal();
    } else if (!modalOpen && modalRef.current) {
      modalRef.current.close();
    }
  }, [modalOpen]);

  useEffect(() => {
    if (updateMessage) {
      const timer = setTimeout(() => setUpdateMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [updateMessage]);

  const handleModalClose = () => {
    setNewHike({ name: "", date: "", distance: "", notes: "" });
    setSelectedTrail("Other");
    setErrors({});
    setModalOpen(false);
  };

  const handleSliderChange = (e) => {
    const value = Number(e.target.value);
    setDistanceRange([0, value]);
  };

  const filteredRecommendations = recommendations.filter((trail) => {
    const matchesDifficulty = difficultyFilter === "All" || trail.difficulty === difficultyFilter;
    const matchesDistance = trail.distance >= distanceRange[0] && trail.distance <= distanceRange[1];
    return matchesDifficulty && matchesDistance;
  });

  const handleTrailChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedTrail(selectedValue);

    if (selectedValue !== "Other") {
      const selectedTrail = recommendations.find((trail) => trail.name === selectedValue);
      setNewHike((prev) => ({
        ...prev,
        name: selectedTrail.name,
        distance: selectedTrail.distance,
      }));
    } else {
      setNewHike((prev) => ({ ...prev, name: "", distance: "" }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHike((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const formErrors = {};
    let hasError = false;
    if (selectedTrail === "Other" && !newHike.name.trim()) {
      formErrors.name = "Trail name is required.";
      hasError = true;
    }
    if (!newHike.date) {
      formErrors.date = "Date is required.";
      hasError = true;
    } else {
      const today = new Date();
      const selectedDate = new Date(newHike.date);
      if (selectedDate > today) {
        formErrors.date = "Date cannot be in the future.";
        hasError = true;
      }
    }
    if (selectedTrail === "Other" && !newHike.distance) {
      formErrors.distance = "Distance is required.";
      hasError = true;
    } else if (selectedTrail === "Other" && (isNaN(newHike.distance) || parseFloat(newHike.distance) <= 0)) {
      formErrors.distance = "Distance must be a positive number.";
      hasError = true;
    }

    setErrors(formErrors);
    return !hasError;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; 
    }

    const updatedHikes = [...hikes, { id: hikes.length + 1, ...newHike }];
    setHikes(updatedHikes);

    const totalDistance = updatedHikes.reduce(
      (sum, hike) => sum + parseFloat(hike.distance),
      0
    );

    setHikeStats({
      totalTrails: updatedHikes.length,
      totalDistance: `${totalDistance.toFixed(1)}`,
    });

    setUpdateMessage("Hike successfully logged. Home page updated.");
    handleModalClose();
  };

  return (
    <main id="main" className={`hike-log-page ${theme}`}>
      {welcomeMessage && <div className="welcome-message">{welcomeMessage}</div>}

      <div className="filter-section">
        <h2>Filter Trails</h2>
        <div className="filters">
          <div>
            <label htmlFor="difficulty-filter">Difficulty:</label>
            <select
              id="difficulty-filter"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="slider-container">
            <label htmlFor="distance-slider" className="slider-label">
              Distance Filter: {distanceRange[1]} miles
            </label>
            <div className="slider-track"></div>
            <input
              type="range"
              id="distance-slider"
              className="slider"
              min="0"
              max="20"
              step="1"
              value={distanceRange[1]}
              onChange={handleSliderChange}
            />
          </div>

        </div>
      </div>
      <div className="recommendations">
        <h2>Recommended Trails</h2>
        <ul className="recommendation-list">
          {filteredRecommendations.map((trail) => (
            <li key={trail.id} className="recommendation-item">
              <img src={trail.image} alt={trail.alt} className="recommendation-image" />
              <h3>{trail.name}</h3>
              <p>
                <strong>Difficulty:</strong> {trail.difficulty}
              </p>
              <p>
                <strong>Distance:</strong> {trail.distance} miles
              </p>
            </li>
          ))}
        </ul>
      </div>

      {updateMessage && <div className="update-message">{updateMessage}</div>}
      <button className="log-hike-button" onClick={() => setModalOpen(true)}>
        Log a New Hike
      </button>
      <dialog ref={modalRef} className="modal" hidden={!modalOpen}>
        <div className="modal-content">
          <h2>Log a New Hike</h2>
          <form className="hike-form" onSubmit={handleFormSubmit}>
            <label htmlFor="trail">Select Trail:</label>
            <select id="trail" value={selectedTrail} onChange={handleTrailChange}>
              <option value="Other">Other</option>
              {recommendations.map((trail) => (
                <option key={trail.id} value={trail.name}>
                  {trail.name}
                </option>
              ))}
            </select>

            {selectedTrail === "Other" && (
              <>
                <label htmlFor="name">Trail Name:</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={newHike.name}
                  onChange={handleInputChange}
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </>
            )}

            <label htmlFor="date">Date:</label>
            <input
              id="date"
              name="date"
              type="date"
              value={newHike.date}
              onChange={handleInputChange}
            />
            {errors.date && <p className="error-message">{errors.date}</p>}

            <label htmlFor="distance">Distance:</label>
            <input
              id="distance"
              name="distance"
              type="text"
              value={newHike.distance}
              onChange={handleInputChange}
              readOnly={selectedTrail !== "Other"}
            />
            {errors.distance && <p className="error-message">{errors.distance}</p>}

            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              name="notes"
              value={newHike.notes}
              onChange={handleInputChange}
            />

            <div className="form-buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={handleModalClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </main>
  );
}

export default ExplorePage;
