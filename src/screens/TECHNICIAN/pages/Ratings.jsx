import React from 'react';
import logo from '../images/user.png'; // Use the same logo for all users

const TechnicianDashboard = () => {
  const technician = {
    name: 'John Doe',
    reviewPeriod: '2024-01-01 to 2024-09-30',
    totalReviews: 19,
    averageRating: 3.0,
    ratingsDistribution: [
      { rating: 5, percentage: 15 },
      { rating: 4, percentage: 25 },
      { rating: 3, percentage: 30 },
      { rating: 2, percentage: 20 },
      { rating: 1, percentage: 10 },
    ],
    userRatings: [3, 4, 6, 4, 2],
  };

  const users = [
    { name: 'Amogelang', surname: 'Ntia', rating: 3, feedback: 'Satisfied with the work done' },
    { name: 'Angela', surname: 'Monyebudi', rating: 2, feedback: 'Took a bit longer than expected' },
    { name: 'Mamello', surname: 'Molepo', rating: 4, feedback: 'Job well done' },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="main-heading">Reviews</h1>
      <div className="grid-container">
        {/* First Column: Rating Distribution and user ratings */}
        <div className="first-col">
          {technician.ratingsDistribution.map((item, index) => (
            <div className="rating-row" key={item.rating}>
              <div className="progress-bar-container">
                <span>{item.rating}</span>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${item.percentage}%` }}>
                    <span className="percentage-text">{item.percentage}%</span>
                  </div>
                </div>
                <span className="user-rating">{technician.userRatings[index]}</span>
              </div>
            </div>
          ))}
          <div className="column-divider"></div> {/* Divider for the first column */}
        </div>

        {/* Second Column: Average Rating */}
        <div className="second-col">
          <div className="rating-summary">
            <h2>3.0 Rating</h2>
            <span style={{ color: '#0B5353', fontSize: '2.5em' }}>
              {'★'.repeat(3)}{'☆'.repeat(2)}
            </span>
          </div>
          <div className="column-divider"></div> {/* Divider for the second column */}
        </div>
        {/* Third Column: Total Reviews */}
        <div className="third-col">
          <h2>Total Reviews</h2>
          <p>{technician.totalReviews}</p>
        </div>
      </div>

      {/* User Reviews Section */}
      <section className="user-reviews">
        <h4>User Feedback</h4>
        <div className="user-reviews-container">
          {users.map((user, index) => (
            <div className="user-review" key={index}>
              <div className="user-details">
                <img src={logo} alt={`User ${index + 1}`} className="user-image" />
                <div className="user-info">
                  <p>{user.name} {user.surname}</p>
                </div>
              </div>
              <div className="divider"></div> {/* Divider for user review */}

              <div className="user-feedback">
                <div className="user-rating">
                <span style={{ color: '#0B5353', fontSize: '1.2em' }}>
                    {'★'.repeat(user.rating)}{'☆'.repeat(5 - user.rating)}
                  </span>
                </div>
                <p>{user.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TechnicianDashboard;
