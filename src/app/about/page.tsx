export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About Me
            </h2>
            <p className="mt-3 max-w-3xl text-lg text-gray-500">
              Hello! I&apos;m a fullstack developer with expertise in building modern web applications. I specialize in using Next.js for frontend development and Python (FastAPI) for backend services.
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Frontend Development</h3>
                  <p className="mt-2 text-base text-gray-500">
                    I create responsive, accessible, and performant web applications using React, Next.js, and modern CSS techniques.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Backend Development</h3>
                  <p className="mt-2 text-base text-gray-500">
                    I develop robust, scalable APIs and services using Python, FastAPI, and modern database solutions.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">DevOps & Deployment</h3>
                  <p className="mt-2 text-base text-gray-500">
                    I&apos;m experienced in CI/CD workflows, containerization, and deploying applications to various cloud platforms including Vercel.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0">
            <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
              <div className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-400 text-xl font-medium p-24">Profile Image</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-extrabold text-gray-900">Skills</h3>
          <div className="mt-4 grid grid-cols-2 gap-y-4 gap-x-8 sm:grid-cols-3 md:grid-cols-4">
            <div className="bg-gray-50 px-4 py-2 rounded-md">React</div>
            <div className="bg-gray-50 px-4 py-2 rounded-md">Next.js</div>
            <div className="bg-gray-50 px-4 py-2 rounded-md">TypeScript</div>
            <div className="bg-gray-50 px-4 py-2 rounded-md">TailwindCSS</div>
            <div className="bg-gray-50 px-4 py-2 rounded-md">Python</div>
            <div className="bg-gray-50 px-4 py-2 rounded-md">FastAPI</div>
            <div className="bg-gray-50 px-4 py-2 rounded-md">MongoDB</div>
            <div className="bg-gray-50 px-4 py-2 rounded-md">Docker</div>
          </div>
        </div>
      </div>
    </div>
  );
}
