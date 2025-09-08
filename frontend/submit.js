// Submit page JavaScript functionality

class SubmitPageManager {
  constructor() {
    this.apiBase = '/api';
    this.form = document.getElementById('submit-form');
    this.messageDiv = document.getElementById('form-message');
    this.init();
  }

  init() {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('askedDate').value = today;

    // Add form submit handler
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this.form);
    const questionData = {
      contributorName: formData.get('contributorName').trim(),
      companyName: formData.get('companyName').trim(),
      question: formData.get('question').trim(),
      topic: formData.get('topic'),
      difficulty: formData.get('difficulty'),
      askedDate: formData.get('askedDate')
    };

    // Validate form data
    if (!this.validateForm(questionData)) {
      return;
    }

    // Show loading state
    this.setLoadingState(true);

    try {
      const response = await fetch(`${this.apiBase}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData)
      });

      const result = await response.json();

      if (result.success) {
        this.showMessage('Question submitted successfully! Thank you for contributing.', 'success');
        this.form.reset();
        
        // Reset date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('askedDate').value = today;
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          this.hideMessage();
        }, 5000);
      } else {
        this.showMessage(result.message || 'Error submitting question. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      this.showMessage('Network error. Please check your connection and try again.', 'error');
    } finally {
      this.setLoadingState(false);
    }
  }

  validateForm(data) {
    // Check for empty required fields
    const requiredFields = ['contributorName', 'companyName', 'question', 'topic', 'difficulty', 'askedDate'];
    
    for (const field of requiredFields) {
      if (!data[field] || data[field].toString().trim() === '') {
        this.showMessage(`Please fill in all required fields.`, 'error');
        return false;
      }
    }

    // Validate question length
    if (data.question.length < 10) {
      this.showMessage('Question must be at least 10 characters long.', 'error');
      return false;
    }

    // Validate date is not in the future
    const askedDate = new Date(data.askedDate);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today

    if (askedDate > today) {
      this.showMessage('Asked date cannot be in the future.', 'error');
      return false;
    }

    return true;
  }

  showMessage(text, type) {
    this.messageDiv.textContent = text;
    this.messageDiv.className = `form-message ${type}`;
    this.messageDiv.style.display = 'block';
    
    // Scroll to message
    this.messageDiv.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
  }

  hideMessage() {
    this.messageDiv.style.display = 'none';
  }

  setLoadingState(loading) {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    if (loading) {
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';
    } else {
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SubmitPageManager();
});