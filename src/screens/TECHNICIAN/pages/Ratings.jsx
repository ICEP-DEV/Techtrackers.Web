import React, { useState, useEffect } from 'react';
import logo from '../images/user.png'; // Use the same logo for all users
import styles from '../SidebarCSS/TechRatings.module.css';

const TechnicianDashboard = () => {
  const [technician, setTechnician] = useState({
    name: 'John Doe',
    reviewPeriod: '2024-01-01 to 2024-09-30',
    totalReviews: 0,
    averageRating: 0,
    ratingsDistribution: [],
  });
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem("Tech Issues"));
    const logId = logs?.[0]?.logId || 3; // Default to 3 if logs or logId is unavailable
  
    const fetchFeedback = async () => {
      try {
        const response = await fetch(
          `https://localhost:44328/api/Feedback/GetFeedbackByLog/${logId}`
        );
        if (response.ok) {
          let feedbackList = await response.json();
  
          // Sort feedbackList by FeedbackTimestamp in descending order
          feedbackList = feedbackList.sort(
            (a, b) => new Date(b.feedbackTimestamp) - new Date(a.feedbackTimestamp)
          );
  
          const totalReviews = feedbackList.length;
          const averageRating = (
            feedbackList.reduce((sum, item) => sum + item.rating, 0) / totalReviews
          ).toFixed(1);
  
          const ratingsDistribution = [5, 4, 3, 2, 1].map((rating) => {
            const count = feedbackList.filter((item) => item.rating === rating).length;
            const percentage = ((count / totalReviews) * 100).toFixed(0);
            return { rating, percentage, count };
          });
  
          setTechnician((prev) => ({
            ...prev,
            totalReviews,
            averageRating,
            ratingsDistribution,
          }));
          setReviews(feedbackList); // Update state with sorted reviews
        } else {
          console.error("Failed to fetch feedback.");
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchFeedback();
  }, []);
  

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.mainHeading}>Reviews</h1>
      <div className={styles.gridContainer}>
        {/* First Column: Rating Distribution */}
        <div className={styles.firstCol}>
          {technician.ratingsDistribution.map((item) => (
            <div className={styles.ratingRow} key={item.rating}>
              <div className={styles.progressBarContainer}>
                <span>{item.rating}</span>
                <div className={styles.progressBar}>
                  <div className={styles.progress} style={{ width: `${item.percentage}%` }}>
                    <span className={styles.percentageText}>{item.percentage}%</span>
                  </div>
                </div>
                <span className={styles.userRating}>{item.count}</span>
              </div>
            </div>
          ))}
          <div className={styles.columnDivider}></div>
        </div>

        {/* Second Column: Average Rating */}
        <div className={styles.secondCol}>
          <div className={styles.ratingSummary}>
            <h2>{technician.averageRating} Rating</h2>
            <span style={{ color: '#0B5353', fontSize: '2.5em' }}>
              {'★'.repeat(Math.round(technician.averageRating))}
              {'☆'.repeat(5 - Math.round(technician.averageRating))}
            </span>
          </div>
          <div className={styles.columnDivider}></div>
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
        {isLoading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          <div className={styles.userReviewsContainer}>
            {reviews.map((review, index) => (
              <div className={styles.userReview} key={index}>
                <div className={styles.userDetails}>
                  <img src={logo} alt={`User ${index + 1}`} className={styles.userImage} />
                  <div className={styles.userInfo}>
                    <p>User {review.userId}</p>
                  </div>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.userFeedback}>
                  <div className={styles.userRating}>
                    <span style={{ color: '#0B5353', fontSize: '1.2em' }}>
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p>{review.comments}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews available.</p>
        )}
      </section>
    </div>
  );
};

export default TechnicianDashboard;
