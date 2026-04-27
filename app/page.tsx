import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section with Gradient */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Profile Picture */}
          <div className="mb-12 flex justify-center">
            <div className="relative w-40 h-40">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-lg opacity-75"></div>
              <img
                src={`${process.env.NODE_ENV === "production" ? "/portfolio" : ""}/images/profile_pic.jpg`}
                alt="Joshua Fabricante"
                className="absolute inset-0 rounded-full object-cover ring-4 ring-gray-900"
              />
            </div>
          </div>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
            Joshua Irving B. Fabricante
          </h1>

          {/* Title */}
          <p className="text-xl sm:text-2xl text-indigo-400 font-semibold mb-6">
            Full-Stack Developer & Freelancer
          </p>

          {/* Bio */}
          <p className="text-lg text-gray-300 mb-4 leading-relaxed">
            Philippine-based developer building modern web applications for clients worldwide.
            Specialized in full-stack development with a focus on scalability and user experience.
          </p>

          <p className="text-base text-gray-400 mb-10 leading-relaxed">
            I combine front-end expertise with solid backend architecture to deliver complete solutions.
            Whether it's a sleek Next.js application or a robust Laravel backend, I'm ready to bring your vision to life.
          </p>

          {/* Skills */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {["Next.js", "React", "JavaScript", "Laravel","Puppeteer", "WordPress", "TypeScript"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-indigo-900/40 text-indigo-300 rounded-full text-sm font-medium border border-indigo-700/50 hover:border-indigo-600 transition"
                >
                  {skill}
                </span>
              )
            )}
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-10">
            <a
              href="https://twitter.com/Joshua_irvingF"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-indigo-900/40 hover:text-indigo-400 transition"
              aria-label="Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7s1.1 1 2 1z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/Joshua.starkiller115"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-indigo-900/40 hover:text-indigo-400 transition"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/joshuafabricante"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-indigo-900/40 hover:text-indigo-400 transition"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/joshuanderful"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-gray-800 text-gray-300 hover:bg-indigo-900/40 hover:text-indigo-400 transition"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
              </svg>
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition shadow-lg hover:shadow-xl"
            >
              View My Projects
            </Link>
            <a
              href="mailto:joshua.starkiller115@gmail.com"
              className="inline-block px-8 py-3 border-2 border-indigo-400 text-indigo-400 hover:bg-indigo-900/20 font-semibold rounded-lg transition"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
