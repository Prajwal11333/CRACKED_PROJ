class AuthPageManager {
  constructor() {
    this.apiBase = '/api';
    this.loginForm = document.getElementById('login-form');
    this.registerForm = document.getElementById('register-form');
    this.loginTab = document.getElementById('login-tab');
    this.registerTab = document.getElementById('register-tab');
    this.messageDiv = document.getElementById('auth-message');
    this.init();
  }

  init() {
    this.setupAuthControls();
    this.attachTabHandlers();
    this.attachFormHandlers();
    this.checkExistingSession();
    this.showForm('login');
  }

  setupAuthControls() {
    const loginLink = document.getElementById('login-link');
    const logoutButton = document.getElementById('logout-button');
    if (!loginLink || !logoutButton) {
      return;
    }

    const token = localStorage.getItem('token');
    if (token) {
      loginLink.style.display = 'none';
      logoutButton.style.display = 'inline';
    }

    logoutButton.addEventListener('click', () => {
      this.clearSession();
      window.location.href = '/login';
    });
  }

  attachTabHandlers() {
    if (this.loginTab) {
      this.loginTab.addEventListener('click', () => this.showForm('login'));
    }
    if (this.registerTab) {
      this.registerTab.addEventListener('click', () => this.showForm('register'));
    }
  }

  attachFormHandlers() {
    if (this.loginForm) {
      this.loginForm.addEventListener('submit', (event) => this.handleLogin(event));
    }
    if (this.registerForm) {
      this.registerForm.addEventListener('submit', (event) => this.handleRegister(event));
    }
  }

  showForm(mode) {
    if (mode === 'login') {
      this.toggleForms(this.loginForm, this.registerForm);
      this.setActiveTab(this.loginTab, this.registerTab);
    } else {
      this.toggleForms(this.registerForm, this.loginForm);
      this.setActiveTab(this.registerTab, this.loginTab);
    }
    this.hideMessage();
  }

  toggleForms(activeForm, inactiveForm) {
    if (activeForm) {
      activeForm.style.display = 'block';
    }
    if (inactiveForm) {
      inactiveForm.style.display = 'none';
    }
  }

  setActiveTab(activeTab, inactiveTab) {
    if (activeTab) {
      activeTab.classList.add('active');
    }
    if (inactiveTab) {
      inactiveTab.classList.remove('active');
    }
  }

  async handleLogin(event) {
    event.preventDefault();
    if (!this.loginForm) {
      return;
    }

    const email = this.loginForm.email.value.trim().toLowerCase();
    const password = this.loginForm.password.value.trim();

    if (!email || !password) {
      this.showMessage('Please provide your email and password.', 'error');
      return;
    }

    this.setFormLoading(this.loginForm, true);

    try {
      const response = await fetch(`${this.apiBase}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (result.success) {
        this.persistSession(result.data);
        this.showMessage('Login successful. Redirecting...', 'success');
        setTimeout(() => {
          window.location.href = '/submit';
        }, 800);
      } else {
        this.showMessage(result.message || 'Login failed. Please try again.', 'error');
      }
    } catch (error) {
      this.showMessage('Unable to sign in. Please try again later.', 'error');
    } finally {
      this.setFormLoading(this.loginForm, false);
    }
  }

  async handleRegister(event) {
    event.preventDefault();
    if (!this.registerForm) {
      return;
    }

    const name = this.registerForm.name.value.trim();
    const email = this.registerForm.email.value.trim().toLowerCase();
    const password = this.registerForm.password.value.trim();

    if (!name || !email || !password) {
      this.showMessage('All fields are required to create an account.', 'error');
      return;
    }

    if (password.length < 6) {
      this.showMessage('Password must be at least 6 characters.', 'error');
      return;
    }

    this.setFormLoading(this.registerForm, true);

    try {
      const response = await fetch(`${this.apiBase}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      });

      const result = await response.json();

      if (result.success) {
        this.persistSession(result.data);
        this.showMessage('Account created successfully. Redirecting...', 'success');
        setTimeout(() => {
          window.location.href = '/submit';
        }, 800);
      } else {
        this.showMessage(result.message || 'Registration failed. Please try again.', 'error');
      }
    } catch (error) {
      this.showMessage('Unable to create account. Please try again later.', 'error');
    } finally {
      this.setFormLoading(this.registerForm, false);
    }
  }

  setFormLoading(form, loading) {
    if (!form) {
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const btnText = submitButton ? submitButton.querySelector('.btn-text') : null;
    const btnLoading = submitButton ? submitButton.querySelector('.btn-loading') : null;

    if (submitButton) {
      submitButton.disabled = loading;
    }
    if (btnText) {
      btnText.style.display = loading ? 'none' : 'inline';
    }
    if (btnLoading) {
      btnLoading.style.display = loading ? 'inline' : 'none';
    }
  }

  showMessage(text, type) {
    if (!this.messageDiv) {
      return;
    }
    this.messageDiv.textContent = text;
    this.messageDiv.className = `form-message ${type}`;
    this.messageDiv.style.display = 'block';
  }

  hideMessage() {
    if (!this.messageDiv) {
      return;
    }
    this.messageDiv.style.display = 'none';
  }

  persistSession(data) {
    if (!data || !data.token) {
      return;
    }
    localStorage.setItem('token', data.token);
    if (data.user) {
      sessionStorage.setItem('user', JSON.stringify(data.user));
    }
  }

  async checkExistingSession() {
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
        sessionStorage.setItem('user', JSON.stringify(result.data));
        window.location.href = '/submit';
      } else {
        this.clearSession();
      }
    } catch (error) {
      this.clearSession();
    }
  }

  clearSession() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AuthPageManager();
});
