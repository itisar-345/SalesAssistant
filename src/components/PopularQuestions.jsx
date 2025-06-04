import React from "react";
import "../css/PopularQuestions.css";

const questions = [
  { category: "Electronics", text: "Best phone under ₹20K" },
  { category: "Home", text: "Affordable air purifiers?" },
  { category: "Fashion", text: "Men’s wedding wear?" },
  { category: "Education", text: "Books for UPSC" },
  { category: "Finance", text: "Best savings account?" },
  { category: "Kitchen", text: "Top mixer grinders?" }
];

function PopularQuestions() {
  return (
    <div className="popular-section">
      <h2>Popular Questions</h2>
      <div className="question-grid">
        {questions.map((item, index) => (
          <div className="question-card" key={index}>
            <h4>{item.category}</h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularQuestions;
