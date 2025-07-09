import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName)
  }

  const handleBlur = () => {
    setFocusedField(null)
  }

  const ContactCard = ({ icon, title, content, delay = 0 }) => (
    <div 
      className="group relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <div className="text-gray-600 space-y-1">
          {content}
        </div>
      </div>
    </div>
  )

  const FAQCard = ({ question, answer, delay = 0 }) => (
    <div 
      className="group bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 hover:-translate-y-1"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
          {question}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-400/10 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000" />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`
        }} />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center bg-blue-100/80 backdrop-blur-sm text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                We're here to help
              </div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6 animate-fade-in">
                Contact Us
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in">
                Have questions about our platform? Need help getting started? 
                We're here to assist you every step of the way with personalized support.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm rounded-3xl" />
                <div className="relative z-10 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-8 shadow-xl">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-8">
                    Send us a Message
                  </h2>
                  <div className="space-y-6">
                    <div className="group">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => handleFocus('name')}
                          onBlur={handleBlur}
                          required
                          className={`w-full px-4 py-4 border-2 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 ${
                            focusedField === 'name' 
                              ? 'border-blue-500 shadow-lg shadow-blue-500/20 bg-white' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="Enter your full name"
                        />
                        {focusedField === 'name' && (
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 animate-pulse" />
                        )}
                      </div>
                    </div>

                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => handleFocus('email')}
                          onBlur={handleBlur}
                          required
                          className={`w-full px-4 py-4 border-2 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 ${
                            focusedField === 'email' 
                              ? 'border-blue-500 shadow-lg shadow-blue-500/20 bg-white' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="Enter your email address"
                        />
                        {focusedField === 'email' && (
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 animate-pulse" />
                        )}
                      </div>
                    </div>

                    <div className="group">
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        Subject
                      </label>
                      <div className="relative">
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => handleFocus('subject')}
                          onBlur={handleBlur}
                          required
                          className={`w-full px-4 py-4 border-2 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 ${
                            focusedField === 'subject' 
                              ? 'border-blue-500 shadow-lg shadow-blue-500/20 bg-white' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="technical">Technical Support</option>
                          <option value="billing">Billing Question</option>
                          <option value="lawyer">Lawyer Partnership</option>
                          <option value="feedback">Feedback</option>
                        </select>
                        {focusedField === 'subject' && (
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 animate-pulse" />
                        )}
                      </div>
                    </div>

                    <div className="group">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        Message
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => handleFocus('message')}
                          onBlur={handleBlur}
                          required
                          rows={6}
                          className={`w-full px-4 py-4 border-2 rounded-xl bg-white/80 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-0 resize-none ${
                            focusedField === 'message' 
                              ? 'border-blue-500 shadow-lg shadow-blue-500/20 bg-white' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          placeholder="Tell us how we can help you..."
                        />
                        {focusedField === 'message' && (
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 -z-10 animate-pulse" />
                        )}
                      </div>
                    </div>

                    <div
                      onClick={handleSubmit}
                      className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer text-center"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                      <span className="relative flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-8">
                    Get in Touch
                  </h2>
                </div>
                
                <div className="space-y-6">
                  <ContactCard
                    delay={100}
                    icon={
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    }
                    title="Email Us"
                    content={
                      <>
                        <p className="hover:text-blue-600 transition-colors cursor-pointer">support@legalconsult.com</p>
                        <p className="hover:text-blue-600 transition-colors cursor-pointer">partnerships@legalconsult.com</p>
                      </>
                    }
                  />

                  <ContactCard
                    delay={200}
                    icon={
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    }
                    title="Call Us"
                    content={
                      <>
                        <p className="text-lg font-semibold">+1 (555) 123-4567</p>
                        <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM EST</p>
                      </>
                    }
                  />

                  <ContactCard
                    delay={300}
                    icon={
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    }
                    title="Visit Us"
                    content={
                      <>
                        <p>123 Legal Street</p>
                        <p>New York, NY 10001</p>
                      </>
                    }
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                  <div className="relative bg-gradient-to-br from-blue-50/90 to-purple-50/90 backdrop-blur-sm border border-blue-200/50 p-6 rounded-2xl">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Response Time</h3>
                    </div>
                    <p className="text-gray-600 mb-2">
                      We typically respond to inquiries within 24 hours during business days.
                    </p>
                    <p className="text-gray-600">
                      For urgent matters, please call our support line directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Quick answers to common questions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FAQCard
                delay={100}
                question="How do I book a consultation?"
                answer="Simply create an account, browse our lawyer profiles, and select an available time slot that works for you. Our intuitive booking system makes it easy to find the perfect match."
              />

              <FAQCard
                delay={200}
                question="Are consultations confidential?"
                answer="Yes, all consultations are protected by attorney-client privilege and our secure platform ensures complete privacy with end-to-end encryption."
              />

              <FAQCard
                delay={300}
                question="How much do consultations cost?"
                answer="Consultation fees vary by lawyer and practice area. You'll see the exact cost upfront before booking, with no hidden fees or surprises."
              />

              <FAQCard
                delay={400}
                question="Can I cancel or reschedule?"
                answer="Yes, you can cancel or reschedule consultations up to 24 hours before the scheduled time through your dashboard with no penalties."
              />
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Contact