export default function ProjectsPage() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            My Projects
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Here are some of the projects I&apos;ve worked on.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Project 1 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">E-Commerce Platform</h3>
              <div className="h-40 bg-gray-100 rounded-md mt-4 flex items-center justify-center">
                <span className="text-gray-400">Project Image</span>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                A complete e-commerce solution built with Next.js, featuring product listings, search, cart functionality, and secure checkout.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Next.js</span>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">MongoDB</span>
                <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Stripe</span>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Task Management App</h3>
              <div className="h-40 bg-gray-100 rounded-md mt-4 flex items-center justify-center">
                <span className="text-gray-400">Project Image</span>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                A collaborative task manager with real-time updates, team assignments, and progress tracking.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">React</span>
                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Firebase</span>
                <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Redux</span>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">Health Tracking Dashboard</h3>
              <div className="h-40 bg-gray-100 rounded-md mt-4 flex items-center justify-center">
                <span className="text-gray-400">Project Image</span>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                A health metrics visualization tool with data analysis, goal setting, and progress reports.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Vue.js</span>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">D3.js</span>
                <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">Python</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
