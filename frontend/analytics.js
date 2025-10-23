// Analytics page JavaScript functionality

class AnalyticsPageManager {
  constructor() {
    this.apiBase = '/api';
    this.analyticsData = null;
    this.init();
  }

  async init() {
    this.setupAuthControls();
    await this.loadAnalyticsData();
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
      window.location.href = '/login';
    });
  }

  async loadAnalyticsData() {
    try {
      this.showLoading();
      
      const response = await fetch(`${this.apiBase}/analysis`);
      const result = await response.json();

      if (result.success) {
        this.analyticsData = result.data;
        this.displayAnalytics();
      } else {
        this.showError('Failed to load analytics data');
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
      this.showError('Network error loading analytics');
    }
  }

  displayAnalytics() {
    this.displayStats();
    this.displayTopCompanies();
    this.displayTopicsChart();
    this.displayDifficultyChart();
    this.displayRecentQuestions();
  }

  displayStats() {
    const { totalQuestions, totalCompanies } = this.analyticsData;
    
    document.getElementById('total-questions').textContent = totalQuestions || '0';
    document.getElementById('total-companies').textContent = totalCompanies || '0';
  }

  displayTopCompanies() {
    const container = document.getElementById('top-companies');
    const { topCompanies } = this.analyticsData;

    if (!topCompanies || topCompanies.length === 0) {
      container.innerHTML = '<div class="loading">No company data available</div>';
      return;
    }

    container.innerHTML = topCompanies.map((company, index) => `
      <div class="company-item">
        <div class="company-name">#${index + 1} ${this.escapeHtml(company._id)}</div>
        <div class="company-count">${company.count} questions</div>
      </div>
    `).join('');
  }

  displayTopicsChart() {
    const canvas = document.getElementById('topics-chart');
    const ctx = canvas.getContext('2d');
    const { topicDistribution } = this.analyticsData;

    if (!topicDistribution || topicDistribution.length === 0) {
      this.drawNoDataMessage(ctx, canvas);
      return;
    }

    this.drawBarChart(ctx, canvas, topicDistribution, 'Topics Distribution');
  }

  displayDifficultyChart() {
    const canvas = document.getElementById('difficulty-chart');
    const ctx = canvas.getContext('2d');
    const { difficultyDistribution } = this.analyticsData;

    if (!difficultyDistribution || difficultyDistribution.length === 0) {
      this.drawNoDataMessage(ctx, canvas);
      return;
    }

    this.drawPieChart(ctx, canvas, difficultyDistribution, 'Difficulty Distribution');
  }

  displayRecentQuestions() {
    const container = document.getElementById('recent-questions');
    const { recentQuestions } = this.analyticsData;

    if (!recentQuestions || recentQuestions.length === 0) {
      container.innerHTML = '<div class="loading">No recent questions available</div>';
      return;
    }

    container.innerHTML = recentQuestions.map(question => `
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

  drawBarChart(ctx, canvas, data, title) {
    const width = canvas.width;
    const height = canvas.height;
    const margin = 60;
    const chartWidth = width - 2 * margin;
    const chartHeight = height - 2 * margin;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up chart data
    const maxValue = Math.max(...data.map(item => item.count));
    const barWidth = chartWidth / data.length * 0.8;
    const barSpacing = chartWidth / data.length * 0.2;

    // Define colors
    const colors = [
      '#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
      '#06b6d4', '#f97316', '#84cc16'
    ];

    // Draw bars
    data.forEach((item, index) => {
      const barHeight = (item.count / maxValue) * chartHeight;
      const x = margin + index * (barWidth + barSpacing) + barSpacing / 2;
      const y = height - margin - barHeight;

      // Draw bar
      ctx.fillStyle = colors[index % colors.length];
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw value on top of bar
      ctx.fillStyle = '#374151';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(item.count.toString(), x + barWidth / 2, y - 5);

      // Draw label at bottom
      ctx.save();
      ctx.translate(x + barWidth / 2, height - margin + 20);
      ctx.rotate(-Math.PI / 4);
      ctx.textAlign = 'right';
      ctx.font = '11px sans-serif';
      ctx.fillText(item._id, 0, 0);
      ctx.restore();
    });

    // Draw title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, 30);
  }

  drawPieChart(ctx, canvas, data, title) {
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2 + 10;
    const radius = Math.min(width, height) / 2 - 80;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate total
    const total = data.reduce((sum, item) => sum + item.count, 0);
    
    // Define colors for difficulty levels
    const difficultyColors = {
      'Easy': '#10b981',
      'Medium': '#f59e0b',
      'Hard': '#ef4444'
    };

    let currentAngle = -Math.PI / 2; // Start at top

    // Draw slices
    data.forEach((item, index) => {
      const sliceAngle = (item.count / total) * 2 * Math.PI;
      const color = difficultyColors[item._id] || '#64748b';

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Draw slice outline
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw percentage label
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
      
      const percentage = ((item.count / total) * 100).toFixed(1);
      ctx.fillStyle = 'white';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${percentage}%`, labelX, labelY);

      currentAngle += sliceAngle;
    });

    // Draw title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, 30);

    // Draw legend
    data.forEach((item, index) => {
      const legendY = height - 60 + index * 20;
      const color = difficultyColors[item._id] || '#64748b';
      
      // Legend color box
      ctx.fillStyle = color;
      ctx.fillRect(20, legendY - 10, 15, 15);
      
      // Legend text
      ctx.fillStyle = '#374151';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${item._id}: ${item.count}`, 45, legendY);
    });
  }

  drawNoDataMessage(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#64748b';
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('No data available', canvas.width / 2, canvas.height / 2);
  }

  showLoading() {
    // Show loading for all sections
    document.getElementById('total-questions').textContent = '-';
    document.getElementById('total-companies').textContent = '-';
    document.getElementById('top-companies').innerHTML = '<div class="loading">Loading...</div>';
    document.getElementById('recent-questions').innerHTML = '<div class="loading">Loading...</div>';
  }

  showError(message) {
    const errorHtml = `<div class="loading">Error: ${message}</div>`;
    document.getElementById('top-companies').innerHTML = errorHtml;
    document.getElementById('recent-questions').innerHTML = errorHtml;
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
  new AnalyticsPageManager();
});