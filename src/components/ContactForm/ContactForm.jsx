import { useState, useEffect } from 'react';
import './ContactForm.scss';
import './ContactForm.media.scss';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const handleServiceSelect = (e) => {
      const title = e.detail?.serviceTitle;
      if (title) {
        setFormData((prev) => ({
          ...prev,
          subject: `Inquiry: ${title}`,
        }));
      }
    };

    window.addEventListener('service-selected', handleServiceSelect);
    return () => window.removeEventListener('service-selected', handleServiceSelect);
  }, []);

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters long.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter a subject.';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please write your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const responseBody = await response.text();
      let result = null;

      try {
        result = responseBody ? JSON.parse(responseBody) : null;
      } catch {
        result = null;
      }

      if (!response.ok) {
        throw new Error(
          result?.error || `Email server returned an error (${response.status}). Please try again later.`
        );
      }

      if (typeof result?.message !== 'string') {
        throw new Error('Email server returned an invalid response. Please try again later.');
      }

      setStatus('success');
      setStatusMessage(`Thank you, ${formData.fullName}! Your message has been sent.`);
      setFormData({ fullName: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setStatus('error');
      setStatusMessage(
        error instanceof TypeError
          ? 'Could not reach the email server. Please try again later.'
          : error.message
      );
    }
  };

  return (
    <div className="contact-form-container">
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        {status === 'success' && (
          <div className="contact-form__alert contact-form__alert--success" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>{statusMessage}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="contact-form__alert contact-form__alert--error" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <span>{statusMessage}</span>
          </div>
        )}

        <div className="contact-form__row">
          <div className="contact-form__field">
            <label htmlFor="fullName" className="contact-form__label">
              Full Name <span className="contact-form__required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className={`contact-form__input ${errors.fullName ? 'contact-form__input--error' : ''}`}
              placeholder="e.g. Alex Morgan"
              value={formData.fullName}
              onChange={handleChange}
              disabled={status === 'loading'}
              required
            />
            {errors.fullName && <p className="contact-form__error">{errors.fullName}</p>}
          </div>

          <div className="contact-form__field">
            <label htmlFor="email" className="contact-form__label">
              Email Address <span className="contact-form__required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`contact-form__input ${errors.email ? 'contact-form__input--error' : ''}`}
              placeholder="e.g. alex@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={status === 'loading'}
              required
            />
            {errors.email && <p className="contact-form__error">{errors.email}</p>}
          </div>
        </div>

        <div className="contact-form__field">
          <label htmlFor="subject" className="contact-form__label">
            Subject <span className="contact-form__required">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className={`contact-form__input ${errors.subject ? 'contact-form__input--error' : ''}`}
            placeholder="e.g. Project Collaboration or Inquiry"
            value={formData.subject}
            onChange={handleChange}
            disabled={status === 'loading'}
            required
          />
          {errors.subject && <p className="contact-form__error">{errors.subject}</p>}
        </div>

        <div className="contact-form__field">
          <label htmlFor="message" className="contact-form__label">
            Message <span className="contact-form__required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            className={`contact-form__textarea ${errors.message ? 'contact-form__textarea--error' : ''}`}
            placeholder="Tell me about your project, goals, or timeline..."
            value={formData.message}
            onChange={handleChange}
            disabled={status === 'loading'}
            required
          ></textarea>
          {errors.message && <p className="contact-form__error">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="contact-form__submit-btn"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <>
              <span className="contact-form__spinner" aria-hidden="true"></span>
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </>
          )}
        </button>

        <p className="contact-form__privacy-note">
          Delivered directly to: <strong>geetaishsinghrajput@gmail.com</strong>
        </p>
      </form>
    </div>
  );
}
