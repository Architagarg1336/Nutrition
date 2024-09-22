import React, { useState } from 'react';
import axios from 'axios';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    try {
      const response = await axios.post('http://localhost:3001/api/contact', {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        message: formData.message
      });
      console.log('Form submitted:', response.data);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 font-sans bg-cover bg-center"
      style={{ backgroundImage: "url('./images/contactBg.jpg')" }}
    >
      <div className="max-w-6xl w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 lg:ml-2">
            <h1 className="text-6xl font-bold text-gray-800 mt-20" style={{ fontFamily: "'Merienda', cursive" }}>Contact us</h1>
            <p className="text-lg text-black font-semibold mb-4 leading-relaxed">
              Need to get in touch with us? Either fill out the form with your inquiry or find the{' '}
              <a href="#" className="text-lime-600 underline">department email</a> you'd like to contact below.
            </p>
          </div>
          <div className="lg:w-1/2 mt-16">
            <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg shadow-md ml-12">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="sm:w-1/2">
                  <label htmlFor="firstName" className="block mb-2 text-sm font-bold text-gray-700 flex items-start">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-base border border-gray-300 rounded-md bg-gray-200"
                  />
                </div>
                <div className="sm:w-1/2">
                  <label htmlFor="lastName" className="block mb-2 text-sm font-bold text-gray-700 flex items-start">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-base border border-gray-300 rounded-md bg-gray-200"
                  />
                </div>
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700 flex items-start">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-base border border-gray-300 rounded-md bg-gray-200"
                />
              </div>
              <div className="mb-4 w-full">
                <label htmlFor="message" className="block mb-2 text-sm font-bold text-gray-700 flex items-start">What can we help you with?</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 text-base border border-gray-300 rounded-md bg-gray-200 min-h-[100px]"
                />
              </div>
              <button type="submit" className="w-full py-3 text-base font-bold text-white bg-lime-600 rounded-md hover:bg-lime-900 transition-colors" disabled={submitStatus === 'submitting'}>
                {submitStatus === 'submitting' ? 'Submitting...' : 'Submit'}
              </button>
              {submitStatus === 'success' && <p className="text-green-600 mt-2">Message sent successfully!</p>}
              {submitStatus === 'error' && <p className="text-red-600 mt-2">Error sending message. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}