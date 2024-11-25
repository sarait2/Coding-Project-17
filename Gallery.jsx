import React, { useEffect, useState } from 'react';

const Gallery = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTours = async () => {
    try {
      const response = await fetch('https://course-api.com/react-tours-project');
      if (!response.ok) throw new Error('Failed to fetch tours');
      const data = await response.json();
      setTours(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="gallery">
      {tours.map((tour) => (
        <Tour key={tour.id} tour={tour} onRemove={removeTour} />
      ))}
    </div>
  );
};

const Tour = ({ tour, onRemove }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="tour-card">
      <img src={tour.image} alt={tour.name} />
      <div>
        <h2>{tour.name}</h2>
        <p>Price: ${tour.price}</p>
        <p>
          {showMore ? tour.info : `${tour.info.substring(0, 100)}...`}
          <button onClick={() => setShowMore(!showMore)}>
            {showMore ? 'Show Less' : 'Read More'}
          </button>
        </p>
        <button onClick={() => onRemove(tour.id)}>Not Interested</button>
      </div>
    </div>
  );
};

export default Gallery;
