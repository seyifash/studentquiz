import React, { useState, useEffect, useRef } from 'react';
import './LinkVerification.css';
import logo from '../laptop.png';
import testQuestions from './question';
/*import TestQuestions from './GenerateQuestions';*/

const LinkVerification = () => {
    const [passCode, setPassCode] = useState('');
    const [studentForm, setStudentForm] = useState(false);
    const [showInstruction, setShowInstruction] = useState(false);
    const [student, setStudentName] = useState({
        firstName: '',
        LastName: ''
    });
    const [questionsVisible, setQuestionsVisible] = useState(false); 
    const [timer, setTimer] = useState(0); 
    const [testStarted, setTestStarted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(1);
    const [questions, setQuestions] = useState([]);
    const [minute, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [hours, setHours] = useState(0);

   

    const handleChange = (e) =>  {
        setPassCode(e.target.value);
    }

    const [checkedStates, setCheckedStates] = useState(Array(questions.length).fill(null));

    const handleSubmit = () => {
        console.log('submitted', passCode);
        setPassCode(''); 
        setStudentForm(true);
    }
    
    const handleStudentDetails = (e) => {
        const { name, value } = e.target;
        setStudentName({ ...student, [name]: value });
    }

    const handleStudent = () =>  {
        console.log('Student details:', student.firstName, student.LastName);
        setShowInstruction(true);
    }

    const startTest = () => {
        setShowInstruction(false); // Hide instructions when test starts
        setQuestionsVisible(true);
        setTestStarted(true);
        setStudentForm(false); // Hide "Create Student" div when test starts
        setTimer(1);
    };

    //function to start time count based on the given time and also end the time
    let interval = useRef(null);
    useEffect(() => {
        if(testStarted) {
        setQuestions(testQuestions.questions)
            interval.current = setInterval(() => {
                setSeconds(seconds => seconds + 1);
                if (seconds === 59 && minute < timer) {
                    setMinutes(minute => minute + 1);
                    setSeconds(0);
                }
                if(minute === 59){
                    setHours(hours + 1);
                }
            }, 1000);
            if (minute === timer) {
                clearInterval(interval.current);
            }
            return () => clearInterval(interval.current);
        }
    }, [questions, minute, seconds, timer, hours, testStarted]);
    
    
    
    const totalPages = Math.ceil(questions.length / itemsPerPage);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    //const indexOfLastItem = currentPage * itemsPerPage;
    //const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentQuestion = questions.length > 0 ? questions[currentPage - 1] : null;

    // function to update the content of checked states to the id of the given question and the selected option

    const handleCheck = (questionIndex, spanIndex) => {
        const updatedStates = [...checkedStates];
        const selectedOptionText = spanIndex === 0 ? currentQuestion.right_answer : currentQuestion[`wrong_answer${spanIndex}`];
        updatedStates[questionIndex] = { questionId: currentQuestion.id, selectedOption: selectedOptionText };
        setCheckedStates(updatedStates);
    };
    const SubmitQuestion = () => {
        clearInterval(interval.current);
        console.log(checkedStates);
    }

    return (
        <>
            {!studentForm && !questionsVisible ? (<div className="verification">
                <h2>Welcome Students!</h2>
                <h4>Please Enter PassCode For verification</h4>
                <input className="input1" type='text' name="passCode" value={passCode} onChange={handleChange} required />
                <button className="btn1" onClick={handleSubmit}>Verify</button>
            </div>) : (
                !showInstruction && !questionsVisible ? (
                <div className="CreateStudent">
                    <h2>Please Enter The Name Registered with Tutor</h2>
                    <input name="firstName" type="text" value={student.firstName} onChange={handleStudentDetails} placeHolder="First Name" required />
                    <input name="LastName" type="text" value={student.LastName} onChange={handleStudentDetails} placeHolder="Last Name" required />
                    <button className="btn2" onClick={handleStudent}>Submit</button>
                </div>
                ) : (
                    <>
                    {showInstruction && (
                        <div className="instructions">
                            <h2>Test Instructions</h2>
                            <p>Please read the following instructions carefully before starting the test:</p>
                            <ul>
                                <li>Ensure you are in a quiet environment with no distractions.</li>
                                <li>Follow the instructions provided for each question.</li>
                                <li>You have 60 minute to complete the test.</li>
                            </ul>
                            <button className="btn3" onClick={startTest}>Start Test</button>
                        </div>
                    )}
                    {questionsVisible && currentQuestion && (
                        <div className="questions">
                            <h2>Please Make sure to Answer all questions</h2>
                            <div className="sub-timer">
                                <h2 className="subject">Subject: {testQuestions.subject}</h2>
                                <h1>Time: {hours < 10 ? "0" + hours : hours } : {minute < 10 ? "0" + minute : minute} : {seconds < 10 ? "0" + seconds : seconds}</h1>
                            </div>
                            <div className="question">
                                <h3>Question {currentPage}</h3>
                                <span className="header"><strong>Header: </strong>{currentQuestion.header}</span>
                                <img src={logo} alt="img-1" />
                                <p>{currentQuestion.body}</p>
                                <div className="options-div">
                                {Array.from({ length: 5 }).map((_, spanIndex) => (
                                    <span
                                        key={spanIndex}
                                        id={currentQuestion.id}
                                        className={`checks ${checkedStates[currentPage - 1] && checkedStates[currentPage - 1].selectedOption === (spanIndex === 0 ? currentQuestion.right_answer : currentQuestion[`wrong_answer${spanIndex}`]) ? 'checked' : ''}`}
                                        onClick={() => handleCheck(currentPage - 1, spanIndex)}
                                    >
                                        {spanIndex === 0 ? currentQuestion.right_answer : currentQuestion[`wrong_answer${spanIndex}`]}
                                    </span>
                                ))}
                                </div>
                            </div>
                            {/* Pagination controls */}
                            <div className="pagination">
                                {currentPage > 1 &&<button className="prev" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Back</button>}
                                {Array.from({ length: totalPages }).map((_, index) => (
                                    <button key={index} className="key" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
                                ))}
                                {currentPage < questions.length &&<button className="current" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>}
                            </div>
                            {currentPage === questions.length && <button className="btn4" onClick={SubmitQuestion}>Submit</button>}
                        </div>
                    )}
                    </>
                )
            )}
        </>
    );
}

export default LinkVerification;