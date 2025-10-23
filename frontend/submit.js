// Submit page JavaScript functionality

class SubmitPageManager {
  constructor() {
    this.apiBase = '/api';
    this.form = document.getElementById('submit-form');
    this.messageDiv = document.getElementById('form-message');
    this.cancelEditButton = document.getElementById('cancel-edit');
    this.currentUser = null;
    this.userQuestions = [];
    this.editingQuestionId = null;
    this.init();
  }

  async init() {
    this.setupAuthControls();
    this.ensureAuthenticated();
    await this.loadCurrentUser();
    this.resetFormState();
    await this.loadUserQuestions();

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    if (this.cancelEditButton) {
      this.cancelEditButton.addEventListener('click', () => this.cancelEditing());
    }
  }

  setupAuthControls() {
    const loginLink = document.getElementById('login-link');
    const logoutButton = document.getElementById('logout-button');
    if (!loginLink || !logoutButton) return;

    const token = localStorage.getItem('token');
    if (token) {
      loginLink.style.display = 'none';
      logoutButton.style.display = 'inline';
    }

    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('token');
      sessionStorage.removeItem('user');
      window.location.href = '/login';
    });
  }

  ensureAuthenticated() {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }

  async loadCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    try {
      const response = await fetch(`${this.apiBase}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      if (result.success) {
        this.currentUser = result.data;
        const contributorInput = document.getElementById('contributorName');
        if (contributorInput) {
          contributorInput.value = this.currentUser.name;
          contributorInput.disabled = true;
        }
      }
    } catch (error) {
      console.error('Error loading current user', error);
    }
  }

  async loadUserQuestions() {
    const token = this.getToken();
    const container = document.getElementById('user-questions-list');
    if (!token || !container) {
      return;
    }

    container.innerHTML = '<div class="loading">Loading your questions...</div>';

    try {
      const response = await fetch(`${this.apiBase}/questions/mine`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      if (result.success) {
        this.userQuestions = result.data || [];
        this.renderUserQuestions();
      } else {
        this.showUserQuestionsError(result.message || 'Unable to load your questions.');
      }
    } catch (error) {
      console.error('Error loading user questions', error);
      this.showUserQuestionsError('Unable to load your questions.');
    }
  }

  renderUserQuestions() {
    const container = document.getElementById('user-questions-list');
    if (!container) {
      return;
    }

    if (!this.userQuestions.length) {
      container.innerHTML = '<div class="loading">You have not submitted any questions yet.</div>';
      return;
    }

    container.innerHTML = this.userQuestions.map(question => `
      <div class="user-question-card">
        <div class="user-question-header">
          <div class="user-question-company">${this.escapeHtml(question.companyName || '')}</div>
          <div class="user-question-actions">
            <button class="action-button" data-action="edit" data-id="${question._id}">Edit</button>
            <button class="action-button danger" data-action="delete" data-id="${question._id}">Delete</button>
          </div>
        </div>
        <div class="user-question-body">${this.escapeHtml(question.question || '')}</div>
        <div class="user-question-meta">
          <span class="badge badge-topic">${this.escapeHtml(question.topic || '')}</span>
          <span class="badge ${question.difficulty ? `badge-${question.difficulty.toLowerCase()}` : ''}">${this.escapeHtml(question.difficulty || '')}</span>
          <span>${this.formatDate(question.askedDate)}</span>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('[data-action="edit"]').forEach(button => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        const question = this.userQuestions.find(item => item._id === id);
        if (question) {
          this.setFormForEdit(question);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });

    container.querySelectorAll('[data-action="delete"]').forEach(button => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this question?')) {
          this.deleteQuestion(id);
        }
      });
    });
  }

  setFormForEdit(question) {
    this.editingQuestionId = question._id;

    document.getElementById('companyName').value = question.companyName || '';
    document.getElementById('question').value = question.question || '';
    document.getElementById('topic').value = question.topic || '';
    document.getElementById('difficulty').value = question.difficulty || '';
    document.getElementById('askedDate').value = question.askedDate ? new Date(question.askedDate).toISOString().split('T')[0] : '';

    const submitBtnText = this.form.querySelector('.btn-text');
    if (submitBtnText) {
      submitBtnText.textContent = 'Update Question';
    }

    if (this.cancelEditButton) {
      this.cancelEditButton.style.display = 'block';
    }
  }

  cancelEditing() {
    this.resetFormState();
    this.hideMessage();
  }

  resetFormState() {
    this.editingQuestionId = null;
    this.form.reset();
    const askedDateInput = document.getElementById('askedDate');
    if (askedDateInput) {
      askedDateInput.value = new Date().toISOString().split('T')[0];
    }
    this.populateContributorName();
    const submitBtnText = this.form.querySelector('.btn-text');
    if (submitBtnText) {
      submitBtnText.textContent = 'Submit Question';
    }
    if (this.cancelEditButton) {
      this.cancelEditButton.style.display = 'none';
    }
  }

  populateContributorName() {
    const contributorInput = document.getElementById('contributorName');
    if (contributorInput && this.currentUser) {
      contributorInput.value = this.currentUser.name;
      contributorInput.disabled = true;
    }
  }

  showUserQuestionsError(message) {
    const container = document.getElementById('user-questions-list');
    if (container) {
      container.innerHTML = `<div class="loading">${this.escapeHtml(message)}</div>`;
    }
  }

  escapeHtml(text) {
    if (text === undefined || text === null) {
      return '';
    }
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.toString().replace(/[&<>"']/g, match => map[match]);
  }

  formatDate(value) {
    try {
      if (!value) {
        return '';
      }
      return new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return '';
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  async deleteQuestion(id) {
    const token = this.getToken();
    if (!token) {
      this.showMessage('Please log in again to continue.', 'error');
      this.ensureAuthenticated();
      return;
    }

    try {
      const response = await fetch(`${this.apiBase}/questions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      if (result.success) {
        this.showMessage('Question deleted successfully.', 'success');
        await this.loadUserQuestions();
        if (this.editingQuestionId === id) {
          this.resetFormState();
        }
        setTimeout(() => {
          this.hideMessage();
        }, 5000);
      } else {
        this.showMessage(result.message || 'Failed to delete question.', 'error');
      }
    } catch (error) {
      console.error('Error deleting question', error);
      this.showMessage('Failed to delete question.', 'error');
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this.form);
    const questionData = {
      companyName: formData.get('companyName').trim(),
      question: formData.get('question').trim(),
      topic: formData.get('topic'),
      difficulty: formData.get('difficulty'),
      askedDate: formData.get('askedDate')
    };

    if (!this.validateForm(questionData)) {
      return;
    }

    const token = this.getToken();
    if (!token) {
      this.showMessage('Please log in again to continue.', 'error');
      this.ensureAuthenticated();
      return;
    }

    const isEditing = Boolean(this.editingQuestionId);
    const endpoint = isEditing ? `${this.apiBase}/questions/${this.editingQuestionId}` : `${this.apiBase}/questions`;
    const method = isEditing ? 'PUT' : 'POST';

    this.setLoadingState(true);

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(questionData)
      });

      const result = await response.json();

      if (result.success) {
        const successMessage = isEditing ? 'Question updated successfully.' : 'Question submitted successfully! Thank you for contributing.';
        this.showMessage(successMessage, 'success');
        this.resetFormState();
        await this.loadUserQuestions();
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
    const requiredFields = ['companyName', 'question', 'topic', 'difficulty', 'askedDate'];
    
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