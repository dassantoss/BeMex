import React from 'react';
import PropTypes from 'prop-types';
import '../styles/RequirementList.css';

/**
 * Component to display an individual requirement.
 * @param {Object} props - Component props
 * @param {Object} props.requirement - The requirement to display
 * @param {Function} props.toggleComplete - Function to toggle the completion status
 */
function RequirementItem({ requirement, toggleComplete }) {
  return (
    <div className={`requirement${requirement.is_completed ? ' completed' : ''}`}>
      <div className="requirement-header">
        <span className="requirement-title">Requirement</span>
        <span className="requirement-copies">
          Copies needed:
          {requirement.copies_needed}
        </span>
      </div>
      <div className="requirement-content">
        <input
          type="checkbox"
          checked={requirement.is_completed}
          onChange={toggleComplete}
        />
        <span className="requirement-text">{requirement.description}</span>
      </div>
    </div>
  );
}

RequirementItem.propTypes = {
  requirement: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    copies_needed: PropTypes.number.isRequired,
    is_completed: PropTypes.bool.isRequired,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
};

export default RequirementItem;
