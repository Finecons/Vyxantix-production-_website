// ==========================================================================
// VyxAntix Contact Form Validation & State Engine
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('demoForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitDemoBtn');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;

  // 1. Module & Software Chips Interactivity
  const softwareChips = document.querySelectorAll('.chip-software');
  const moduleChips = document.querySelectorAll('.chip-module');

  // Single select for current software
  softwareChips.forEach(chip => {
    chip.addEventListener('click', () => {
      softwareChips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
    });
  });

  // Multi select for modules
  moduleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('selected');
    });
  });

  // Check URL query param for ?module=finance|inventory|sales|purchase|manufacturing|hr
  const urlParams = new URLSearchParams(window.location.search);
  const preselectModule = urlParams.get('module');
  if (preselectModule) {
    const targetChip = document.querySelector(`.chip-module[data-module="${preselectModule.toLowerCase()}"]`);
    if (targetChip) {
      targetChip.classList.add('selected');
    }
  }

  // 2. Character Counter for Message Textarea
  const messageInput = document.getElementById('message');
  const charCounter = document.getElementById('charCounter');
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const len = messageInput.value.length;
      charCounter.textContent = `${len} / 1,000`;
      if (len > 1000) {
        charCounter.style.color = 'var(--red)';
      } else {
        charCounter.style.color = 'var(--faint)';
      }
    });
  }

  // 3. Form Validation Engine
  const fields = {
    fullName: {
      el: document.getElementById('fullName'),
      group: document.getElementById('groupFullName'),
      validate: (v) => v.trim().length >= 2 && v.trim().length <= 80,
      msg: 'Please enter your name.'
    },
    workEmail: {
      el: document.getElementById('workEmail'),
      group: document.getElementById('groupWorkEmail'),
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      msg: 'Please enter a valid email address.'
    },
    phone: {
      el: document.getElementById('phone'),
      group: document.getElementById('groupPhone'),
      validate: (v) => /^[6-9]\d{9}$/.test(v.trim().replace(/\D/g, '')),
      msg: 'Please enter a 10-digit mobile number.'
    },
    company: {
      el: document.getElementById('company'),
      group: document.getElementById('groupCompany'),
      validate: (v) => v.trim().length >= 2 && v.trim().length <= 100,
      msg: 'Please enter your company name.'
    },
    teamSize: {
      el: document.getElementById('teamSize'),
      group: document.getElementById('groupTeamSize'),
      validate: (v) => v !== '',
      msg: 'Please choose your team size.'
    },
    industry: {
      el: document.getElementById('industry'),
      group: document.getElementById('groupIndustry'),
      validate: (v) => v !== '',
      msg: 'Please choose your industry.'
    },
    consent: {
      el: document.getElementById('consent'),
      group: document.getElementById('groupConsent'),
      validate: () => document.getElementById('consent')?.checked === true,
      msg: 'Please accept the privacy policy to continue.'
    }
  };

  function validateField(name) {
    const config = fields[name];
    if (!config || !config.el) return true;

    const val = config.el.value;
    const isValid = config.validate(val);

    if (!isValid) {
      config.group.classList.add('has-error');
      config.el.classList.add('error');
      const errEl = config.group.querySelector('.form-error-msg');
      if (errEl) errEl.textContent = config.msg;
    } else {
      config.group.classList.remove('has-error');
      config.el.classList.remove('error');
    }
    return isValid;
  }

  // Attach blur listeners
  Object.keys(fields).forEach(key => {
    const config = fields[key];
    if (config.el) {
      config.el.addEventListener('blur', () => validateField(key));
      config.el.addEventListener('input', () => {
        if (config.group.classList.contains('has-error')) {
          validateField(key);
        }
      });
      if (config.el.type === 'checkbox' || config.el.tagName === 'SELECT') {
        config.el.addEventListener('change', () => validateField(key));
      }
    }
  });

  // Form Submit Handler
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;
      let firstInvalidEl = null;

      Object.keys(fields).forEach(key => {
        const isValid = validateField(key);
        if (!isValid) {
          isFormValid = false;
          if (!firstInvalidEl) firstInvalidEl = fields[key].el;
        }
      });

      if (!isFormValid) {
        if (firstInvalidEl) firstInvalidEl.focus();
        return;
      }

      // Enter Submitting State
      if (submitBtn) {
        submitBtn.disabled = true;
        if (btnText) btnText.textContent = 'Booking...';
        if (btnSpinner) btnSpinner.style.display = 'inline-block';
      }

      // Simulate sending to backend /api/demo
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          if (btnText) btnText.textContent = 'Book my demo →';
          if (btnSpinner) btnSpinner.style.display = 'none';
        }

        // Show Success Card
        form.style.display = 'none';
        if (formSuccess) {
          formSuccess.style.display = 'block';
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 900);
    });
  }

  // Reset form button on success card
  const resetBtn = document.getElementById('resetFormBtn');
  if (resetBtn && form && formSuccess) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      Object.keys(fields).forEach(key => {
        fields[key].group.classList.remove('has-error');
        fields[key].el.classList.remove('error');
      });
      softwareChips.forEach(c => c.classList.remove('selected'));
      moduleChips.forEach(c => c.classList.remove('selected'));
      form.style.display = 'block';
      formSuccess.style.display = 'none';
    });
  }
});
