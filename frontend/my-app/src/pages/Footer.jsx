import { useState } from 'react'

// Mock Link component for demonstration
const Link = ({ to, children, ...props }) => (
  <a href={to} {...props}>
    {children}
  </a>
)

const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null)
  const [hoveredLink, setHoveredLink] = useState(null)

  const socialLinks = [
    {
      name: 'Twitter',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
        </svg>
      ),
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
        </svg>
      ),
      gradient: 'from-blue-600 to-indigo-600'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      gradient: 'from-blue-700 to-purple-600'
    }
  ]

  const AnimatedLink = ({ to, href, children, index }) => {
    const isExternal = href && !to
    const Component = isExternal ? 'a' : Link
    const props = isExternal ? { href } : { to }

    return (
      <Component 
        {...props}
        className={`group relative text-gray-300 hover:text-white transition-all duration-300 block py-1 ${
          hoveredLink === index ? 'text-blue-400' : ''
        }`}
        onMouseEnter={() => setHoveredLink(index)}
        onMouseLeave={() => setHoveredLink(null)}
      >
        <span className="relative z-10">{children}</span>
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </Component>
    )
  }

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="group">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-6 group-hover:from-purple-400 group-hover:via-blue-400 group-hover:to-purple-400 transition-all duration-500">
                Lawside
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mb-6 group-hover:w-32 transition-all duration-500"></div>
            </div>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
              Connecting clients with experienced lawyers for professional legal consultations. 
              Get expert legal advice when you need it most.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <div
                  key={social.name}
                  className="group relative"
                  onMouseEnter={() => setHoveredSocial(index)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${social.gradient} rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm`} />
                  <a
                    href="#"
                    className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 border-gray-600 text-gray-300 transition-all duration-300 group-hover:border-transparent group-hover:text-white group-hover:scale-110 group-hover:shadow-lg ${
                      hoveredSocial === index ? `group-hover:shadow-${social.gradient.split('-')[1]}-500/50` : ''
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${social.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <span className="relative z-10">
                      {social.icon}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="group">
            <h4 className="text-xl font-semibold mb-6 text-white group-hover:text-blue-400 transition-colors duration-300">
              Quick Links
            </h4>
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mb-6 group-hover:w-20 transition-all duration-500"></div>
            <ul className="space-y-4">
              <li>
                <AnimatedLink to="/" index="home">
                  Home
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink to="/about" index="about">
                  About Us
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink to="/contact" index="contact">
                  Contact
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#" index="lawyers">
                  Find Lawyers
                </AnimatedLink>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="group">
            <h4 className="text-xl font-semibold mb-6 text-white group-hover:text-purple-400 transition-colors duration-300">
              Legal
            </h4>
            <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mb-6 group-hover:w-20 transition-all duration-500"></div>
            <ul className="space-y-4">
              <li>
                <AnimatedLink href="#" index="privacy">
                  Privacy Policy
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#" index="terms">
                  Terms of Service
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#" index="cookies">
                  Cookie Policy
                </AnimatedLink>
              </li>
              <li>
                <AnimatedLink href="#" index="disclaimer">
                  Disclaimer
                </AnimatedLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Stay Updated
              </h3>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                Subscribe to our newsletter for legal insights and platform updates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                />
                <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  <span className="relative">Subscribe</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/50 to-transparent h-px"></div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2025 Lawside. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                System Status: Online
              </span>
              <span>
                Made with ❤️ for justice
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-blue-500/10 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-purple-500/10 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
      <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-indigo-500/10 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </footer>
  )
}

export default Footer