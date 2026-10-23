/**
 * Advait IT Solutions and Services — Form Validation & Formspree Integration
 * Official Formspree AJAX integration (Form ID: xoeeagyl)
 * Preserves accessible client-side validation, loading states, anti-spam honeypot,
 * and reliable error handling with direct WhatsApp / Email fallbacks.
 */

(function () {
  'use strict';

  const FORMSPREE_FORM_ID = 'xoeeagyl';

  document.addEventListener('DOMContentLoaded', () => {
    prefillServiceFromUrl();
    initContactForm();
  });

  /**
   * Reads ?service=... from URL query and pre-selects the corresponding dropdown option
   */
  function prefillServiceFromUrl() {
    const serviceSelect = document.querySelector('#contactService');
    if (!serviceSelect) return;

    const urlParams = new URLSearchParams(window.location.search);
    const requestedService = urlParams.get('service');
    if (!requestedService) return;

    const normalizedReq = requestedService.toLowerCase().trim();
    for (let option of serviceSelect.options) {
      const optVal = option.value.toLowerCase().trim();
      if (optVal === normalizedReq || optVal.includes(normalizedReq)) {
        option.selected = true;
        break;
      }
    }
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Initializes Formspree AJAX integration and consolidated validation
   */
  function initContactForm() {
    const form = document.querySelector('#advaitContactForm');
    if (!form) return;

    const submitBtn = form.querySelector('#formSubmitBtn');
    const alertSuccess = document.querySelector('#formSuccessAlert');
    const alertError = document.querySelector('#formErrorAlert');
    let originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Send Project Inquiry';
    let isSubmitting = false;
    let formspreeInitialized = false;

    // Helper: update button loading state
    function setSubmitting(submitting) {
      isSubmitting = submitting;
      if (!submitBtn) return;

      if (submitting) {
        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-busy', 'true');
        submitBtn.innerHTML = `
          <span class="spinner" aria-hidden="true"></span>
          <span>Submitting Your Inquiry...</span>
        `;
      } else {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
        submitBtn.innerHTML = originalBtnHtml;
      }
    }

    // Helper: display success
    function handleSuccess() {
      setSubmitting(false);
      form.reset();
      clearValidationErrors(form);

      if (alertError) {
        alertError.style.display = 'none';
      }

      if (alertSuccess) {
        alertSuccess.style.display = 'block';
        alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      if (window.showToast) {
        window.showToast('Your project inquiry has been received successfully!', 'success', 5000);
      }
    }

    // Helper: display error
    function handleError(message) {
      setSubmitting(false);

      if (alertSuccess) {
        alertSuccess.style.display = 'none';
      }

      const displayMessage = message || 'An error occurred while submitting your inquiry. Please try again or reach out directly.';

      if (alertError) {
        alertError.innerHTML = `
          <strong>Submission Notice:</strong> ${escapeHtml(displayMessage)}<br>
          <div class="form-alert-actions" style="margin-top: 10px;">
            <a href="https://wa.me/919702420582?text=${encodeURIComponent('Hello Advait IT Solutions, I would like to submit a project inquiry.')}" class="btn btn-whatsapp btn-sm" target="_blank" rel="noopener noreferrer">
              Connect on WhatsApp (+91 9702420582)
            </a>
            <a href="mailto:ashutosh3276s16@gmail.com?subject=Project Inquiry - Advait IT Solutions" class="btn btn-secondary btn-sm">
              Send Email Directly
            </a>
          </div>
        `;
        alertError.style.display = 'block';
        alertError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      if (window.showToast) {
        window.showToast('Unable to submit inquiry. Please use WhatsApp or email directly.', 'error', 5000);
      }
    }

    // Initialize Formspree AJAX if library is loaded
    if (typeof window.formspree === 'function') {
      try {
        window.formspree('initForm', {
          formElement: '#advaitContactForm',
          formId: FORMSPREE_FORM_ID,
          useDefaultStyles: false,
          onSubmit: () => {
            setSubmitting(true);
          },
          onSuccess: () => {
            handleSuccess();
          },
          onError: (state, error) => {
            let errorMsg = 'Formspree reported an error with this submission.';
            if (error && typeof error.getFormErrors === 'function') {
              const errors = error.getFormErrors();
              if (errors.length > 0) {
                errorMsg = errors.map(e => e.message).join(', ');
              }
            }
            handleError(errorMsg);
          },
          onFailure: () => {
            handleError('A network error occurred. Please check your connection or use WhatsApp / Email directly.');
          }
        });
        formspreeInitialized = true;
      } catch (e) {
        console.warn('Formspree AJAX CDN initialization deferred to fallback fetch.');
      }
    }

    // Pre-submit validation in capture phase: blocks submission before network request if invalid
    form.addEventListener('submit', async (e) => {
      // 1. Reset alerts
      if (alertSuccess) alertSuccess.style.display = 'none';
      if (alertError) alertError.style.display = 'none';

      // 2. Anti-spam honeypot verification
      const honeypot = form.querySelector('input[name="_gotcha"]');
      if (honeypot && honeypot.value.trim() !== '') {
        e.preventDefault();
        e.stopImmediatePropagation();
        return; // Silently drop automated bot submission
      }

      // 3. Client-side field validations
      const isValid = validateFormFields(form);
      if (!isValid) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (window.showToast) {
          window.showToast('Please correct the highlighted fields before submitting.', 'error');
        }
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      // If Formspree AJAX is initialized, let its listener handle the dispatch
      if (formspreeInitialized) {
        setSubmitting(true);
        return;
      }

      // 4. Resilient Fallback: If Formspree CDN was blocked or failed to load, execute direct native fetch
      e.preventDefault();
      if (isSubmitting) return;

      setSubmitting(true);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      try {
        const formData = new FormData(form);
        const endpoint = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          handleSuccess();
        } else {
          let errorMsg = 'An error occurred while submitting the form. Please try again.';
          try {
            const errorData = await response.json();
            if (errorData && errorData.errors) {
              errorMsg = errorData.errors.map(err => err.message).join(', ');
            }
          } catch (_) {}
          handleError(errorMsg);
        }
      } catch (err) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
          handleError('The request timed out. Please check your internet connection or use WhatsApp / Email directly.');
        } else {
          handleError('A network error occurred. Please check your connection or reach out via WhatsApp / Email directly.');
        }
      } finally {
        setSubmitting(false);
      }
    }, true); // useCapture = true ensures validation fires before bubble listeners

    // Field-level input cleanup listeners
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          clearFieldError(input);
        }
      });
      input.addEventListener('change', () => {
        if (input.classList.contains('is-invalid')) {
          clearFieldError(input);
        }
      });
    });
  }

  /**
   * Validate required inputs
   */
  function validateFormFields(form) {
    let valid = true;

    const nameInput = form.querySelector('#contactName');
    const emailInput = form.querySelector('#contactEmail');
    const phoneInput = form.querySelector('#contactPhone');
    const serviceInput = form.querySelector('#contactService');
    const messageInput = form.querySelector('#contactMessage');
    const consentInput = form.querySelector('#contactConsent');

    // Name check
    if (nameInput) {
      const nameVal = nameInput.value.trim();
      if (!nameVal || nameVal.length < 2) {
        setFieldError(nameInput, 'Please provide your full name (at least 2 characters).');
        valid = false;
      } else {
        clearFieldError(nameInput);
      }
    }

    // Email check
    if (emailInput) {
      const emailVal = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        setFieldError(emailInput, 'Please provide a valid email address.');
        valid = false;
      } else {
        clearFieldError(emailInput);
      }
    }

    // Optional Phone check
    if (phoneInput && phoneInput.value.trim()) {
      const phoneVal = phoneInput.value.trim();
      const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{6,15}$/;
      if (!phoneRegex.test(phoneVal)) {
        setFieldError(phoneInput, 'Please provide a valid phone number (or leave blank).');
        valid = false;
      } else {
        clearFieldError(phoneInput);
      }
    }

    // Service selection check
    if (serviceInput) {
      if (!serviceInput.value.trim()) {
        setFieldError(serviceInput, 'Please select the service area you are interested in.');
        valid = false;
      } else {
        clearFieldError(serviceInput);
      }
    }

    // Message check
    if (messageInput) {
      const msgVal = messageInput.value.trim();
      if (!msgVal || msgVal.length < 10) {
        setFieldError(messageInput, 'Please share brief details about your project (at least 10 characters).');
        valid = false;
      } else {
        clearFieldError(messageInput);
      }
    }

    // Consent checkbox check
    if (consentInput) {
      const parentLabel = consentInput.closest('.checkbox-label');
      if (!consentInput.checked) {
        if (parentLabel) parentLabel.classList.add('is-invalid');
        valid = false;
      } else {
        if (parentLabel) parentLabel.classList.remove('is-invalid');
      }
    }

    return valid;
  }

  function setFieldError(field, msg) {
    field.classList.add('is-invalid');
    field.setAttribute('aria-invalid', 'true');
    const feedback = field.parentElement.querySelector('.invalid-feedback');
    if (feedback) {
      feedback.textContent = msg;
    }
  }

  function clearFieldError(field) {
    field.classList.remove('is-invalid');
    field.removeAttribute('aria-invalid');
  }

  function clearValidationErrors(form) {
    const invalidFields = form.querySelectorAll('.is-invalid');
    invalidFields.forEach(f => {
      f.classList.remove('is-invalid');
      f.removeAttribute('aria-invalid');
    });
  }
})();
