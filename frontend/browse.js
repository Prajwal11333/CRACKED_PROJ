// Browse page JavaScript functionality

class BrowsePageManager {
  constructor() {
    this.apiBase = '/api';
    this.questions = [];
    this.filteredQuestions = [];
    this.filters = {
      company: '',
      topic: '',
      difficulty: ''
    };
    this.init();
  }

  async init() {
    this.setupEventListeners();
    await this.loadQuestions();
  }

  setupEventListeners() {
    // Filter inputs
    document.getElementById('company-filter').addEventListener('input', (e) => {
      this.filters.company = e.target.value;
      this.applyFilters();
    });

    document.getElementById('topic-filter').addEventListener('change', (e) => {
      this.filters.topic = e.target.value;
      this.applyFilters();
    });

    document.getElementById('difficulty-filter').addEventListener('change', (e) => {
      this.filters.difficulty = e.target.value;
      this.applyFilters();
    });

    // Clear filters button
    document.getElementById('clear-filters').addEventListener('click', () => {
      this.clearFilters();
    });
  }

  async loadQuestions() {
    try {
      this.showLoading();
      
      const response = await fetch(`${this.apiBase}/questions`);
      const result = await response.json();

      if (result.success) {
        this.questions = result.data || [];
        this.filteredQuestions = [...this.questions];
        this.displayQuestions();
        this.updateQuestionsCount();
      } else {
        this.showError('Failed to load questions');
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      this.showError('Network error loading questions');
    }
  }

  applyFilters() {
    this.filteredQuestions = this.questions.filter(question => {
      // Company filter (case-insensitive partial match)
      const companyMatch = !this.filters.company || 
        question.companyName.toLowerCase().includes(this.filters.company.toLowerCase());

      // Topic filter (exact match)
      const topicMatch = !this.filters.topic || 
        question.topic === this.filters.topic;

      // Difficulty filter (exact match)
      const difficultyMatch = !this.filters.difficulty || 
        question.difficulty === this.filters.difficulty;

      return companyMatch && topicMatch && difficultyMatch;
    });

    this.displayQuestions();
    this.updateQuestionsCount();
  }

  clearFilters() {
    // Reset filter inputs
    document.getElementById('company-filter').value = '';
    document.getElementById('topic-filter').value = '';
    document.getElementById('difficulty-filter').value = '';

    // Reset filter state
    this.filters = {
      company: '',
      topic: '',
      difficulty: ''
    };

    // Reset displayed questions
    this.filteredQuestions = [...this.questions];
    this.displayQuestions();
    this.updateQuestionsCount();
  }

  displayQuestions() {
    const container = document.getElementById('questions-container');

    if (this.filteredQuestions.length === 0) {
      container.innerHTML = `
        <div class="loading">
          <p>No questions found matching your filters.</p>
          <p>Try adjusting your search criteria or <a href="/submit">submit a new question</a>.</p>
        </div>
      `;
      return;
    }

    // Create table
    const table = `
      <table class="questions-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Question</th>
            <th>Topic</th>
            <th>Difficulty</th>
            <th>Date Asked</th>
            <th>Contributor</th>
          </tr>
        </thead>
        <tbody>
          ${this.filteredQuestions.map(question => `
            <tr>
              <td class="company-cell">${this.escapeHtml(question.companyName)}</td>
              <td class="question-cell" title="${this.escapeHtml(question.question)}">
                ${this.escapeHtml(this.truncateText(question.question, 80))}
              </td>
              <td>
                <span class="badge badge-topic">${this.escapeHtml(question.topic)}</span>
              </td>
              <td>
                <span class="badge badge-${question.difficulty.toLowerCase()}">${this.escapeHtml(question.difficulty)}</span>
              </td>
              <td>${this.formatDate(question.askedDate)}</td>
              <td>${this.escapeHtml(question.contributorName)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    container.innerHTML = table;
  }

  showLoading() {
    const container = document.getElementById('questions-container');
    container.innerHTML = '<div class="loading">Loading questions...</div>';
    
    document.getElementById('questions-count').textContent = '(Loading...)';
  }

  showError(message) {
    const container = document.getElementById('questions-container');
    container.innerHTML = `
      <div class="loading">
        <p>Error: ${message}</p>
        <p>Please try again later.</p>
      </div>
    `;
    
    document.getElementById('questions-count').textContent = '(Error)';
  }

  updateQuestionsCount() {
    const count = this.filteredQuestions.length;
    const total = this.questions.length;
    
    let countText;
    if (count === total) {
      countText = `(${count} total)`;
    } else {
      countText = `(${count} of ${total})`;
    }
    
    document.getElementById('questions-count').textContent = countText;
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
      return 'Unknown';
    }
  }

  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
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
  new BrowsePageManager();
});