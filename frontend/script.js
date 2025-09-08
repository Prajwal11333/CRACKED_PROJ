// Home page JavaScript functionality

class HomePageManager {
  constructor() {
    this.apiBase = '/api';
    this.init();
  }

  async init() {
    await this.loadStats();
    await this.loadRecentQuestions();
  }

  async loadStats() {
    try {
      const response = await fetch(`${this.apiBase}/analysis`);
      const result = await response.json();
      
      if (result.success) {
        const { totalQuestions, totalCompanies } = result.data;
        
        // Update stats display
        document.getElementById('total-questions').textContent = totalQuestions || '0';
        document.getElementById('total-companies').textContent = totalCompanies || '0';
      }
    } catch (error) {
      console.error('Error loading stats:', error);
      // Set fallback values
      document.getElementById('total-questions').textContent = '0';
      document.getElementById('total-companies').textContent = '0';
    }
  }

  async loadRecentQuestions() {
    try {
      const response = await fetch(`${this.apiBase}/analysis`);
      const result = await response.json();
      
      if (result.success && result.data.recentQuestions) {
        this.displayRecentQuestions(result.data.recentQuestions);
      } else {
        this.showNoQuestionsMessage();
      }
    } catch (error) {
      console.error('Error loading recent questions:', error);
      this.showErrorMessage();
    }
  }

  displayRecentQuestions(questions) {
    const container = document.getElementById('recent-questions-list');
    
    if (questions.length === 0) {
      this.showNoQuestionsMessage();
      return;
    }

    container.innerHTML = questions.map(question => `
      <div class="question-item">
        <div class="question-meta">
          <span class="question-company">${this.escapeHtml(question.companyName)}</span>
          <div class="question-badges">
            <span class="badge badge-topic">${this.escapeHtml(question.topic)}</span>
            <span class="badge badge-${question.difficulty.toLowerCase()}">${this.escapeHtml(question.difficulty)}</span>
          </div>
        </div>
        <div class="question-text">${this.escapeHtml(question.question)}</div>
        <div class="question-footer">
          <span>By ${this.escapeHtml(question.contributorName)}</span>
          <span>${this.formatDate(question.askedDate)}</span>
        </div>
      </div>
    `).join('');
  }

  showNoQuestionsMessage() {
    const container = document.getElementById('recent-questions-list');
    container.innerHTML = `
      <div class="loading">
        <p>No questions available yet. Be the first to <a href="/submit">share a question</a>!</p>
      </div>
    `;
  }

  showErrorMessage() {
    const container = document.getElementById('recent-questions-list');
    container.innerHTML = `
      <div class="loading">
        <p>Unable to load recent questions. Please try again later.</p>
      </div>
    `;
  }

  formatDate(dateString) {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Unknown date';
    }
  }

  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.toString().replace(/[&<>"']/g, m => map[m]);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new HomePageManager();
});