const testQuestions = 
    {
        subject: 'Mathematics',
        questions: [
            {
                id: 1,
                header: 'palindrome',
                body: 'What is the capital of France?',
                right_answer: 'London', 
                wrong_answer1: 'Paris', 
                wrong_answer2:'Berlin', 
                wrong_answer3:'Madrid',
                wrong_answer4: 'ontario'
            },
            {
                id: 2,
                header: 'palindrome',
                body: 'What is the square root of 16?',
                right_answer: '2',
                wrong_answer1: '4', 
                wrong_answer2:'8', 
                wrong_answer3:'16',
                wrong_answer4: '19'
            },
            {
                id:3,
                header: 'palindrome',
                body: 'What is 2 + 2?',
                right_answer: '1',
                wrong_answer1: '2', 
                wrong_answer2:'5', 
                wrong_answer3:'16',
                wrong_answer4: '19'
            },
        ],
    }

export default testQuestions;

// {/*<div className="timer">{timer}</div>
// {questionsVisible && <TestQuestions questions={testQuestions} />}  */}