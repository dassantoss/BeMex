// RequirementList.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import RequirementItem from './RequirementItem';
import '../styles/RequirementList.css';

/**
 * Component to display the list of requirement groups and their requirements
 * in an accordion-style interface.
 */
function RequirementList() {
  const [categories, setCategories] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const categoryRefs = useRef({});

  useEffect(() => {
    // Fetch requirements data from the API on component mount
    // axios.get(`${process.env.REACT_APP_API_URL}/api/requirements`)
    axios.get('https://be-mex.com/api/requirements')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching requirements:', error);
      });
  }, []);

  const toggleComplete = (categoryId, requirementId) => {
    // Update the state to reflect the completion status of a requirement
    setCategories((prevCategories) => {
      const newCategories = { ...prevCategories };
      const requirements = newCategories[categoryId].requirements.map((req) => {
        if (req.id === requirementId) {
          return { ...req, is_completed: !req.is_completed };
        }
        return req;
      });

      newCategories[categoryId] = { ...newCategories[categoryId], requirements };
      return newCategories;
    });

    // TODO: Persist the change to the database (if necessary)
  };

  const changeCategory = (newCategory) => {
    setActiveCategory(activeCategory === newCategory ? null : newCategory);

    // Scroll into view
    if (activeCategory !== newCategory) {
      setTimeout(() => {
        categoryRefs.current[newCategory]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 300);
    }
  };

  return (
    <div className="requirementList">
      <h2>Requirements</h2>
      {Object.keys(categories).map((categoryId) => (
        <div
          key={categoryId}
          className="category-container"
          ref={(el) => { categoryRefs.current[categoryId] = el; }}
        >
          <button
            type="button"
            className={`button ${activeCategory === categoryId ? 'active' : ''}`}
            onClick={() => changeCategory(categoryId)}
          >
            {categories[categoryId].name}
          </button>
          {activeCategory === categoryId && (
            <div>
              {categories[categoryId].requirements.map((requirement) => (
                <RequirementItem
                  key={requirement.id}
                  requirement={requirement}
                  toggleComplete={() => toggleComplete(categoryId, requirement.id)}
                />
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="costs-info">
        <p>
          For up-to-date information on the costs and processing times of the naturalization
          process, please visit the official page:
        </p>
        <a href="https://sre.gob.mx/naturalizacion-costos-y-tiempos" target="_blank" rel="noopener noreferrer">
          Naturalization Costs and Times - SRE
        </a>
      </div>
    </div>
  );
}

export default RequirementList;
