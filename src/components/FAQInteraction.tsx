import { useEffect } from "react";

const FAQInteraction = () => {
  useEffect(() => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach((question) => {
      question.addEventListener('click', () => {
        const answer = question.nextElementSibling as HTMLElement;
        const isExpanded = answer.style.display === 'block';
        
        // Toggle the answer visibility
        answer.style.display = isExpanded ? 'none' : 'block';
        
        // Add visual feedback
        if (isExpanded) {
          question.classList.remove('expanded');
        } else {
          question.classList.add('expanded');
        }
      });
    });

    // Initially hide all answers
    const faqAnswers = document.querySelectorAll('.faq-answer');
    faqAnswers.forEach((answer) => {
      (answer as HTMLElement).style.display = 'none';
    });

    return () => {
      // Cleanup event listeners
      faqQuestions.forEach((question) => {
        question.removeEventListener('click', () => {});
      });
    };
  }, []);

  return null;
};

export default FAQInteraction; 