// src/TechnicianDashboard.js
import React from 'react';
import logo from '../images/user.png'; // Use the same logo for all users


const TechnicianDashboard = () => {
  const technician = {
    name: 'John Doe',
    reviewPeriod: '2024-01-01 to 2024-09-30',
    totalReviews: 19,
    ratingsDistribution: [
      { rating: 5, percentage: 15 },
      { rating: 4, percentage: 25 },
      { rating: 3, percentage: 30 },
      { rating: 2, percentage: 20 },
      { rating: 1, percentage: 10 },
    ],
  };

  const users = [
    { name: 'Amogelang', surname: 'Ntia', rating: 3, feedback: 'Satisfied with the work done' },
    { name: 'Angela', surname: 'Monyebudi', rating: 2, feedback: 'Took a bit longer than expected' },
    { name: 'Mamello', surname: 'Molepo', rating: 4, feedback: 'Job well done' },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <div className="main-container">
          <header>
            <h1>Reviews</h1>
            <h2>{technician.name}</h2>
          </header>

          <section className="review-section">
            <p><strong>Review Period:</strong> {technician.reviewPeriod}</p>
            <h4>Ratings Distribution</h4>
            <table>
              <tbody>
                {technician.ratingsDistribution.map((item) => (
                  <tr key={item.rating}>
                    <td>{item.rating} - {item.percentage}%</td>
                    <td style={{ width: '70%' }}>
                      <div className="progress-bar">
                        <div className="progress" style={{ width: `${item.percentage}%` }}>
                          <span className="percentage-text">{item.percentage}%</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ color: 'gold' }}>
                        {'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Total Reviews: {technician.totalReviews}</p>
          </section>

          <section className="user-reviews">
            <h4>User Feedback</h4>
            <div className="user-container">
              <div className="grid-container">
                <div className="user-grid">
                  {users.map((user, index) => (
                    <div className="user-details" key={index}>
                      <img src={logo} alt={`User ${index + 1}`} className="user-image" />
                      <p>{user.name} {user.surname}</p>
                    </div>
                  ))}
                </div>

                <div className="divider"></div> {/* Divider line */}

                <div className="review-grid">
                  {users.map((user, index) => (
                    <div className="user-review" key={index}>
                      <div className="user-rating">
                        <span style={{ color: 'green' }}>
                          {'★'.repeat(user.rating)}{'☆'.repeat(5 - user.rating)}
                        </span>
                      </div>
                      <p>{user.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TechnicianDashboard;