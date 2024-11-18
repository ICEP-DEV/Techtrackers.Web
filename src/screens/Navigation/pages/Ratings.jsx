import React from 'react';
import logo from '../images/user.png'; // Use the same logo for all users
import styles from '../SidebarCSS/TechRatings.module.css';

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
    <div className={styles.dashboardContainer}>
      <h1 className={styles.mainHeading}>Reviews</h1>
      <div className={styles.gridContainer}>
        {/* First Column: Rating Distribution and user ratings */}
        <div className={styles.firstCol}>
          {technician.ratingsDistribution.map((item, index) => (
            <div className={styles.ratingRow} key={item.rating}>
              <div className={styles.progressBarContainer}>
                <span>{item.rating}</span>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: `${item.percentage}%` }}>
                    <span className={styles.percentageText}>{item.percentage}%</span>
                  </div>
                </div>
                <span className={styles.userRating}>{technician.userRatings[index]}</span>
              </div>
            </div>
          ))}
          <div className={styles.columnDivider}></div> {/* Divider for the first column */}
        </div>

        {/* Second Column: Average Rating */}
        <div className={styles.secondCol}>
          <div className={styles.ratingSummary}>
            <h2>3.0 Rating</h2>
            <span style={{ color: '#0B5353', fontSize: '2.5em' }}>
              {'★'.repeat(3)}{'☆'.repeat(2)}
            </span>
          </div>
          <div className={styles.columnDivider}></div> {/* Divider for the second column */}
        </div>
        {/* Third Column: Total Reviews */}
        <div className={styles.thirdCol}>
          <h2>Total Reviews</h2>
          <p>{technician.totalReviews}</p>
        </div>
      </div>

      {/* User Reviews Section */}
      <section className={styles.userReviews}>
        <h4>User Feedback</h4>
        <div className={styles.userReviewsContainer}>
          {users.map((user, index) => (
            <div className={styles.userReview} key={index}>
              <div className={styles.userDetails}>
                <img src={logo} alt={`User ${index + 1}`} className={styles.userImage} />
                <div className={styles.userInfo}>
                  <p>{user.name} {user.surname}</p>
                </div>
              </div>
              <div className={styles.divider}></div> {/* Divider for user review */}

              <div className={styles.userFeedback}>
                <div className={styles.userRating}>
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
