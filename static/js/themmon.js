document.addEventListener('DOMContentLoaded', function() {
    let subject, code, quantity; // Di chuyển khai báo ra ngoài để các hàm khác có thể truy cập

    const questionForm = document.getElementById('question-form');
    const questionContainer = document.getElementById('question-container');
    const addQuestionForm = document.getElementById('add-question-form');
    const submitQuestionsBtn=document.getElementById('submitbutton');
    const backButton = document.getElementById('back-button');
    questionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        subject = document.getElementById('subject').value; // Lưu giá trị vào biến ngoài
        code = document.getElementById('code').value; // Lưu giá trị vào biến ngoài
        quantity = parseInt(document.getElementById('quantity').value); // Lưu giá trị vào biến ngoài
        createQuestionInputs(quantity);
        questionContainer.style.display = 'block';
    });

    function createQuestionInputs(quantity) {
        addQuestionForm.innerHTML = '';
        for (let i = 1; i <= quantity; i++) {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.innerHTML = `<h3>Câu ${i}:</h3>
                                     <input type="text" id="question${i}" name="question${i}" required title="Enter the subject">
                                     <h4>Đáp án A:</h4>
                                     <input type="text" id="option1_${i}" name="option1_${i}" required title="Enter the subject">
                                     <h4>Đáp án B:</h4>
                                     <input type="text" id="option2_${i}" name="option2_${i}" required title="Enter the subject">
                                     <h4>Đáp án C:</h4>
                                     <input type="text" id="option3_${i}" name="option3_${i}" required title="Enter the subject">
                                     <h4>Đáp án D:</h4>
                                     <input type="text" id="option4_${i}" name="option4_${i}" required title="Enter the subject">
                                     <h4>Câu trả lời đúng:</h4>
                                     <select id="correct-answer${i}" name="correct-answer${i}" required title="Enter the subject">
                                         <option value="option1">Đáp án A</option>
                                         <option value="option2">Đáp án B</option>
                                         <option value="option3">Đáp án C</option>
                                         <option value="option4">Đáp án D</option>
                                     </select>`;
            addQuestionForm.appendChild(questionDiv);
        }
    }
  
    questionContainer.addEventListener('submit', function(event) {
        event.preventDefault();
        const data = {
            subject_name: subject,
            subject_code: code,
            questions: []
        };

        // Lấy các câu hỏi và câu trả lời từ form
        for (let i = 1; i <= quantity; i++) {
            const questionDiv = document.getElementById(`question${i}`);
            const question = {
                question_text: questionDiv.value,
                options: [
                    document.getElementById(`option1_${i}`).value,
                    document.getElementById(`option2_${i}`).value,
                    document.getElementById(`option3_${i}`).value,
                    document.getElementById(`option4_${i}`).value
                ],
                correct_answer: document.getElementById(`correct-answer${i}`).value
            };
            data.questions.push(question);
        }
        
        sendDataToFlask(data);
    
    });
    backButton.style.display = 'block';
    backButton.addEventListener('click', function() {
        // Điều hướng trang về trang chủ
        window.location.href = '/admin'; // Thay đổi '/'' thành URL của trang chủ của bạn
    });
    function sendDataToFlask(data) {
        fetch('/save-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Data saved:', result);
            // Hiển thị thông báo "Submit thành công"
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.textContent = 'Submit thành công';
            document.body.appendChild(successMessage);

            // Tự động ẩn thông báo sau 3 giây
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        })
        .catch(error => {
            console.error('Error saving data:', error);
        });
    }
});
