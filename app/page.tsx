import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-gray-200 text-center py-2 text-sm">
        AlignSynch 2 coming June 2025... Sign up for our launch announcement: <span className="font-semibold text-blue-600">Insider Signup</span>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center">
          {/* Placeholder Logo */}
          <div className="w-24 h-8 bg-gray-300 flex items-center justify-center text-xs text-gray-600 border border-gray-400">
            LOGO
          </div>
          <nav className="ml-8 space-x-6">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium border-b-2 border-gray-700 pb-1">Home</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Relationships</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">How it Works</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">Pricing</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">FAQ</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">About Us</a>
          </nav>
        </div>
        <div className="space-x-4">
          <button className="px-4 py-2 text-gray-700 border border-gray-400 rounded-md hover:bg-gray-200">Sign in</button>
          <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800">Sign up</button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="p-8 text-center bg-gradient-to-b from-gray-200 to-gray-100">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          Relationships can be hard
        </h1>
        <h2 className="text-3xl mb-8 text-gray-700">
          AlignSynch makes it easier
        </h2>
        <button className="px-8 py-4 bg-gray-600 text-white text-lg rounded-md hover:bg-gray-700 transition-colors">
          Choose a Relationship Type
        </button>
        <p className="mt-12 text-gray-600 text-lg max-w-2xl mx-auto">
          <span className="font-semibold">The key concept:</span> To know the feelings and handle the expectations of other people, enhancing both your professional and private relationships.
        </p>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          Use our AlignSynch tool to uncover gaps in those Understandings and Expectations.
        </p>
      </main>

      {/* Align Your Business Life Section */}
      <section className="p-8 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-4xl font-bold mb-4 text-gray-900">
              Align Your Business Life
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              Improve team collaboration, client relationships, and project outcomes.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Team Dynamics</li>
              <li>Client Engagements</li>
              <li>Project Management</li>
              <li>Stakeholder Alignment</li>
            </ul>
            <button className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700">
              Learn More
            </button>
          </div>
          {/* Placeholder Image */}
          <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-gray-600 border border-gray-400">
            BUSINESS IMAGE PLACEHOLDER
          </div>
        </div>
      </section>

      {/* Synch Your Personal Life Section */}
      <section className="p-8 bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Placeholder Image */}
          <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-gray-600 border border-gray-400">
            PERSONAL IMAGE PLACEHOLDER
          </div>
          <div>
            <h3 className="text-4xl font-bold mb-4 text-gray-900">
              Synch Your Personal Life
            </h3>
            <p className="text-gray-700 text-lg mb-6">
              Enhance family bonds, friendships, and personal well-being.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>Family Relationships</li>
              <li>Friendships</li>
              <li>Romantic Partnerships</li>
              <li>Self-Understanding</li>
            </ul>
            <button className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-8 bg-gray-800 text-white text-center">
        <p>&copy; 2025 AlignSynch. All rights reserved.</p>
      </footer>
    </div>
  );
}
