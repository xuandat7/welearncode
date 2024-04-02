document.addEventListener('DOMContentLoaded', function() {
    const questionContainer = document.getElementById('question-container');
    const submitButton = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result');
    let score = 0;
    let userAnswers = [];

    fetch('/data')
        .then(response => response.json())
        .then(data => {
            // Xử lý dữ liệu ở đây
            const questions = data;
            
            function displayQuestions() {
                questions.forEach((question, index) => {
                    const questionDiv = document.createElement('div');
                    questionDiv.classList.add('question');
                    questionDiv.textContent = `${index + 1}. ${question.question}`;
                    question.options.forEach(option => {
                        const button = document.createElement('button');
                        button.textContent = option;
                        button.classList.add('option-btn');
                        button.dataset.correctAnswer = question.correctAnswer;
                        button.addEventListener('click', () => selectAnswer(button));
                        questionDiv.appendChild(button);
                    });
                    questionContainer.appendChild(questionDiv);
                });
            }
    
            function selectAnswer(button) {
                const buttons = button.parentElement.querySelectorAll('.option-btn');
                buttons.forEach(btn => {
                    btn.classList.remove('selected');
                });
                button.classList.add('selected');
            }
    
            function checkAnswers() {
                questions.forEach((question, index) => {
                    const selectedButton = document.querySelectorAll('.question')[index].querySelector('.option-btn.selected');
                    if (selectedButton) {
                        const selectedAnswer = selectedButton.textContent;
                        userAnswers.push(selectedAnswer);
                        
                        const correctButton = document.querySelectorAll('.question')[index].querySelector(`.option-btn[data-correct-answer="${question.correctAnswer}"]`);
                        correctButton.classList.add('correct');
                        if (selectedAnswer === question.correctAnswer) {
                            score++;   
                        } else {
                            selectedButton.classList.add('incorrect');
                        }
                    }
                });
                showResult();
            }
    
            function showResult() {
                questionContainer.style.display = 'none';
                submitButton.style.display = 'none';
                
                // Display all answers
                resultContainer.innerHTML = '';
                questions.forEach((question, index) => {
                    const div = document.createElement('div');
                    div.textContent = `${index + 1}. ${question.question}`;
                    const correctAnswerIndex = question.options.indexOf(question.correctAnswer);
                    question.options.forEach((option, optionIndex) => {
                        const button = document.createElement('button');
                        button.textContent = option;
                        button.classList.add('option-btn');
                        if (optionIndex === correctAnswerIndex) {
                            button.classList.add('correct');
                        }
                        if (option === userAnswers[index]) {
                            if (option === question.correctAnswer) {
                                button.classList.add('correct');
                            } else {
                                button.classList.add('incorrect');
                            }
                        }
                        div.appendChild(button);
                    });
                    resultContainer.appendChild(div);
                });
    
                const scoreText = document.createElement('p');
                scoreText.textContent = `Your score: ${score}/${questions.length}`;
                resultContainer.appendChild(scoreText);
                // resultContainer.
                const buttonql = document.createElement('button');
                buttonql.textContent = "Quay lại";
                buttonql.classList.add('backhome');
                resultContainer.appendChild(buttonql);
                buttonql.addEventListener('click', function() {
                    // Điều hướng trang về trang chủ
                    window.location.href = '/tracnghiem'; // Thay đổi '/'' thành URL của trang chủ của bạn
                });


            }
    
            displayQuestions();
    
            submitButton.addEventListener('click', checkAnswers);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});














// document.addEventListener('DOMContentLoaded', function() {
//     const questionContainer = document.getElementById('question-container');
//     const submitButton = document.getElementById('submit-btn');
//     const resultContainer = document.getElementById('result');
//     let score = 0;
//     let userAnswers = [];

//     const questions = [
//         {
//             question: 'What is the capital of France?',
//             options: ['Paris', 'London', 'Berlin', 'Madrid'],
//             correctAnswer: 'Paris'
//         },
//         {
//             question: 'What is the capital of France?',
//             options: ['Paris', 'London', 'Berlin', 'Madrid'],
//             correctAnswer: 'Paris'
//         }
//         // Add more questions here
//     ];

     
//     function displayQuestions() {
//         questions.forEach((question, index) => {
//             const questionDiv = document.createElement('div');
//             questionDiv.classList.add('question');
//             questionDiv.textContent = `${index + 1}. ${question.question}`;
//             question.options.forEach(option => {
//                 const button = document.createElement('button');
//                 button.textContent = option;
//                 button.classList.add('option-btn');
//                 button.dataset.correctAnswer = question.correctAnswer;
//                 button.addEventListener('click', () => selectAnswer(button));
//                 questionDiv.appendChild(button);
//             });
//             questionContainer.appendChild(questionDiv);
//         });
//     }

//     function selectAnswer(button) {
//         const buttons = button.parentElement.querySelectorAll('.option-btn');
//         buttons.forEach(btn => {
//             btn.classList.remove('selected');
//         });
//         button.classList.add('selected');
//     }

//     function checkAnswers() {
//         questions.forEach((question, index) => {
//             const selectedButton = document.querySelectorAll('.question')[index].querySelector('.option-btn.selected');
//             if (selectedButton) {
//                 const selectedAnswer = selectedButton.textContent;
//                 userAnswers.push(selectedAnswer);
                
//                 const correctButton = document.querySelectorAll('.question')[index].querySelector(`.option-btn[data-correct-answer="${question.correctAnswer}"]`);
//                 correctButton.classList.add('correct');
//                 if (selectedAnswer === question.correctAnswer) {
//                     score++;   
//                 } else {
//                     selectedButton.classList.add('incorrect');
//                 }
//             }
//         });
//         showResult();
//     }

//     function showResult() {
//         questionContainer.style.display = 'none';
//         submitButton.style.display = 'none';
        
//         // Display all answers
//         resultContainer.innerHTML = '';
//         questions.forEach((question, index) => {
//             const div = document.createElement('div');
//             div.textContent = `${index + 1}. ${question.question}`;
//             const correctAnswerIndex = question.options.indexOf(question.correctAnswer);
//             question.options.forEach((option, optionIndex) => {
//                 const button = document.createElement('button');
//                 button.textContent = option;
//                 button.classList.add('option-btn');
//                 if (optionIndex === correctAnswerIndex) {
//                     button.classList.add('correct');
//                 }
//                 if (option === userAnswers[index]) {
//                     if (option === question.correctAnswer) {
//                         button.classList.add('correct');
//                     } else {
//                         button.classList.add('incorrect');
//                     }
//                 }
//                 div.appendChild(button);
//             });
//             resultContainer.appendChild(div);
//         });

//         const scoreText = document.createElement('p');
//         scoreText.textContent = `Your score: ${score}/${questions.length}`;
//         resultContainer.appendChild(scoreText);
//     }

//     displayQuestions();

//     submitButton.addEventListener('click', checkAnswers);
// });
