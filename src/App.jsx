import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import MyHike from './MyHike';
import ExplorePage from './ExplorePage';
import AchievementsPage from './AchievementsPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const [hikeStats, setHikeStats] = useState({
    totalTrails: 6,
    totalDistance: 54,
    mostPopularTrail: 'Skyline Trail',
  });

  const [hikes, setHikes] = useState([
    { id: 1, name: "Skyline Trail", date: "2024-11-01", distance: "10 miles", notes: "Amazing views!" },
    { id: 2, name: "Lake 22", date: "2024-11-10", distance: "7 miles", notes: "Serene and peaceful." },
    { id: 3, name: "Maple Pass", date: "2024-10-15", distance: "8 miles", notes: "Challenging but rewarding!" },
    { id: 4, name: "Blue Lake", date: "2024-09-20", distance: "5 miles", notes: "Perfect for beginners!" },
    { id: 5, name: "Chain Lakes", date: "2024-08-12", distance: "6 miles", notes: "Stunning alpine views!" },
    { id: 6, name: "Enchantments", date: "2024-07-05", distance: "18 miles", notes: "A breathtaking adventure!" },
  ]);
  

  function renderPage() {
    switch (currentPage) {
      case 'home':
        return <HomePage hikeStats={hikeStats} hikes={hikes} theme={theme} setPage={setCurrentPage}/>;
      case 'my-hikes':
        return <MyHike theme={theme} />;
      case 'explore':
        return (
          <ExplorePage
            theme={theme}
            setHikeStats={setHikeStats}
            hikeStats={hikeStats}
            hikes={hikes}
            setHikes={setHikes}
          />
        );
      case 'achievements':
        return <AchievementsPage theme={theme} hikeStats={hikeStats} hikes={hikes} />;
      default:
        return <HomePage hikeStats={hikeStats} hikes={hikes} theme={theme} setPage={setCurrentPage}/>;
    }
  }

  return (
    <div className={`app ${theme}`}>
      <Header setPage={setCurrentPage} toggleTheme={toggleTheme} theme={theme} />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;
