import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import bulbIcon from '../images/bemex.png';
import '../styles/StudySection.css';

/**
 * Component to display study material in an accordion-style interface.
 */
function StudySection() {
  const [studyCategories, setStudyCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const categoryRefs = useRef({});

  useEffect(() => {
    // Fetch study materials from the API on component mount
    axios.get('https://be-mex.com/api/study-materials')
      .then((response) => {
        setStudyCategories(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching study materials:', error);
      });
  }, []);

  const handleCategoryChange = (categoryId) => {
    const isAlreadyActive = activeCategoryId === categoryId;
    setActiveCategoryId(isAlreadyActive ? null : categoryId);

    if (!isAlreadyActive) {
      setTimeout(() => {
        categoryRefs.current[categoryId]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 300);
    }
  };

  return (
    <div className="study-section">
      <h2>Study Material</h2>
      {studyCategories.map((category) => (
        <div key={category.category_id} className="category-container" ref={(el) => { categoryRefs.current[category.category_id] = el; }}>
          <button
            className={`button ${activeCategoryId === category.category_id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.category_id)}
            type="button"
          >
            {category.category}
          </button>
          {activeCategoryId === category.category_id && (
            <div className="questions">
              {category.questions.map((q) => (
                <div key={q.id} className="question-item">
                  <h4>{q.question_text}</h4>
                  <p>{q.answer_text}</p>
                  {/* Optional: Display learning tips if available */}
                  {q.learning_tips && (
                    <div className="learning-tips">
                      <img src={bulbIcon} alt="Tip" className="bulb-icon" />
                      <p>{q.learning_tips}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default StudySection;
