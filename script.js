const startBtn = document.getElementById('start-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const surveyScreen = document.getElementById('survey-screen');
const thankyouScreen = document.getElementById('thankyou-screen');

const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const form = document.getElementById('survey-form');

let currentStep = 1;
let branch = '';

startBtn.addEventListener('click', () => {
    welcomeScreen.style.display = 'none';
    surveyScreen.style.display = 'block';
    showStep(currentStep);
});

nextBtn.addEventListener('click', () => {
    // Determine branch from Q1
    if(currentStep === 1) {
        const q1 = form.q1.value;
        if(!q1) return alert("Please select an option for Q1");
        if(q1 === 'Yes') branch = 'pet-owner';
        else if(q1 === 'Planning') branch = 'future-parent';
        else branch = 'service-provider';
    }

    // Handle email conditional display
    if(currentStep === 9) {
        const q9 = form.q9.value;
        const emailStep = document.querySelector('[data-step="email"]');
        const emailQuestion = document.getElementById('email-question');
        if(q9 === 'Yes') {
            emailStep.style.display = 'block';
            emailQuestion.textContent = "Your best email address to get early access (Required)";
        } else if(q9 === 'Maybe') {
            emailStep.style.display = 'block';
            emailQuestion.textContent = "Your best email (Optional)";
        } else {
            emailStep.style.display = 'none';
        }
    }

    // Move to next step
    currentStep++;
    showStep(currentStep);
});

prevBtn.addEventListener('click', () => {
    if(currentStep > 1) currentStep--;
    showStep(currentStep);
});

function showStep(step) {
    const allQuestions = document.querySelectorAll('.question');
    allQuestions.forEach(q => q.style.display = 'none');

    // Show branch-specific questions
    if(branch === 'pet-owner') {
        document.querySelectorAll('.pet-owner').forEach(q => {
            const qStep = parseInt(q.getAttribute('data-step'));
            if(qStep === step) q.style.display = 'block';
        });
    } else if(branch === 'future-parent') {
        document.querySelectorAll('.future-parent').forEach(q => {
            const qStep = parseInt(q.getAttribute('data-step'));
            if(qStep === step) q.style.display = 'block';
        });
    } else if(branch === 'service-provider') {
        document.querySelectorAll('.service-provider').forEach(q => {
            const qStep = parseInt(q.getAttribute('data-step'));
            if(qStep === step) q.style.display = 'block';
        });
    }

    // Show general questions
    document.querySelectorAll('.general').forEach(q => {
        const qStep = parseInt(q.getAttribute('data-step'));
        if(qStep === step) q.style.display = 'block';
    });

    // Show navigation buttons
    prevBtn.style.display = step > 1 ? 'inline-block' : 'none';
    if(step > 10) {
        surveyScreen.style.display = 'none';
        thankyouScreen.style.display = 'block';
    }
}
