import React from 'react';

// TestQuestions component to display test questions and options
const TestQuestions = ({ questions }) => {
    return (
        <div className="test-questions">
            {/* Render questions and options */}
            <h4>{questions.subject}</h4>
            {questions.questions.map((question, index) => (
                <div key={index} className="question">
                    <h3>{question.title}</h3>
                    <ul>
                        {question.options.map((option, optionIndex) => (
                            <li key={optionIndex}>{option}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
export default TestQuestions