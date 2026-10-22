/**
 * Advait IT Solutions and Services — Form Validation & Formspree Integration
 * 
 * SETUP INSTRUCTION FOR OWNER:
 * Replace 'YOUR_FORMSPREE_ID' with your real Formspree endpoint ID
 * Example: if your Formspree endpoint is https://formspree.io/f/xyzabwkd, set FORMSPREE_FORM_ID = 'xyzabwkd';
 */

const FORMSPREE_FORM_ID = 'YOUR_FORMSPREE_ID';

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  prefillServiceFromUrl();
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

  for (let option of serviceSelect.options) {
    if (option.value.toLowerCase() === requestedService.toLowerCase() ||
        option.value.toLowerCase().includes(requestedService.toLowerCase())) {
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
 * Initializes form submission, validation, loading states, and fallback triggers
 */
function initContactForm() {
  const form = document.querySelector('#advaitContactForm');
  if (!form) return;

  const submitBtn = form.querySelector('#formSubmitBtn');
  const alertSuccess = document.querySelector('#formSuccessAlert');
  const alertError = document.querySelector('#formErrorAlert');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset previous alerts
    if (alertSuccess) alertSuccess.style.display = 'none';
    if (alertError) alertError.style.display = 'none';

    // Honeypot anti-spam check
    const honeypot = form.querySelector('input[name="_gotcha"]');
    if (honeypot && honeypot.value.trim() !== '') {
      console.warn('Spam submission detected by honeypot.');
      return; // Silently ignore bot submission
    }

    // Client-side field validations
    const isValid = validateFormFields(form);
    if (!isValid) {
      if (window.showToast) {
        window.showToast('Please correct the highlighted fields before submitting.', 'error');
      }
      return;
    }

    // Check if placeholder is still set
    if (FORMSPREE_FORM_ID === 'YOUR_FORMSPREE_ID' || form.action.includes('YOUR_FORMSPREE_ID')) {
      if (alertError) {
        alertError.innerHTML = `
          <strong>Configuration Notice:</strong> The Formspree endpoint is currently set to the default placeholder (<code>YOUR_FORMSPREE_ID</code>).<br>
          To activate direct email inbox delivery, replace <code>YOUR_FORMSPREE_ID</code> in <code>js/form-validation.js</code> and <code>contact.html</code> with your Formspree ID.<br><br>
          In the meantime, you can connect directly with us right now:<br>
          <div class="form-alert-actions">
            <a href="https://wa.me/919702420582?text=${encodeURIComponent('Hello Advait IT Solutions, I would like to submit my project details directly.')}" class="btn btn-whatsapp btn-sm" target="_blank" rel="noopener noreferrer">Connect via WhatsApp</a>
            <a href="mailto:akp2756097@gmail.com?subject=Project Inquiry - Advait IT Solutions" class="btn btn-secondary btn-sm">Send Email Direct</a>
          </div>
        `;
        alertError.style.display = 'block';
        alertError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Disable button & show spinner
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="spinner" aria-hidden="true"></span>
      <span>Submitting Your Request...</span>
    `;

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
        // Genuine success
        form.reset();
        clearValidationErrors(form);

        if (alertSuccess) {
          alertSuccess.style.display = 'block';
          alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (window.showToast) {
          window.showToast('Your project request has been submitted successfully!', 'success');
        }
      } else {
        // Formspree returned an error status
        const errorData = await response.json();
        let errorMsg = 'An error occurred while submitting the form. Please try again or reach out directly.';
        if (errorData && errorData.errors) {
          errorMsg = errorData.errors.map(err => err.message).join(', ');
        }
        showFormError(errorMsg);
      }
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        showFormError('The request timed out. Please check your internet connection or reach out directly via WhatsApp / Email.');
      } else {
        console.error('Submission network error:', err);
        showFormError('A network error occurred. Please check your internet connection or use WhatsApp / Email directly.');
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });

  function showFormError(message) {
    if (alertError) {
      alertError.innerHTML = `
        <strong>Submission Notice:</strong> ${escapeHtml(message)}<br>
        You can also contact our team directly at <a href="mailto:akp2756097@gmail.com" class="form-alert-link">akp2756097@gmail.com</a> or via WhatsApp at <a href="https://wa.me/919702420582" target="_blank" rel="noopener noreferrer" class="form-alert-link">+91 9702420582</a>.
      `;
      alertError.style.display = 'block';
      alertError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (window.showToast) {
      window.showToast('Unable to submit inquiry. Please reach out via WhatsApp or email.', 'error');
    }
  }
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
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      setFieldError(nameInput, 'Please provide your full name.');
      valid = false;
    } else {
      clearFieldError(nameInput);
    }
  }

  // Email check
  if (emailInput) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      setFieldError(emailInput, 'Please provide a valid email address.');
      valid = false;
    } else {
      clearFieldError(emailInput);
    }
  }

  // Optional Phone check
  if (phoneInput && phoneInput.value.trim()) {
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{6,15}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
      setFieldError(phoneInput, 'Please provide a valid phone number (or leave blank).');
      valid = false;
    } else {
      clearFieldError(phoneInput);
    }
  }

  // Service check
  if (serviceInput) {
    if (!serviceInput.value.trim()) {
      setFieldError(serviceInput, 'Please select the service you are interested in.');
      valid = false;
    } else {
      clearFieldError(serviceInput);
    }
  }

  // Message check
  if (messageInput) {
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      setFieldError(messageInput, 'Please share brief details about your project (min 10 characters).');
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
  const feedback = field.parentElement.querySelector('.invalid-feedback');
  if (feedback) {
    feedback.textContent = msg;
  }
}

function clearFieldError(field) {
  field.classList.remove('is-invalid');
}

function clearValidationErrors(form) {
  const invalidFields = form.querySelectorAll('.is-invalid');
  invalidFields.forEach(f => f.classList.remove('is-invalid'));
}
