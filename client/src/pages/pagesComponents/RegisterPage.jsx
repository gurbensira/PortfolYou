import { Link } from 'react-router-dom';
import { FaUser, FaBriefcase } from 'react-icons/fa';

function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full p-8">
        <h1 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Join PortfolYou
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Choose your account type to get started
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Developer Card */}
          <Link
            to="/register/developer"
            className="group p-8 border-2 border-blue-400 rounded-xl hover:border-blue-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <FaUser className="text-4xl text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Developer
              </h2>
              <p className="text-gray-600">
                Showcase your projects and connect with others
              </p>
            </div>
          </Link>

          {/* Recruiter Card */}
          <Link
            to="/register/recruiter"
            className="group p-8 border-2 border-purple-400 rounded-xl hover:border-purple-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <FaBriefcase className="text-4xl text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Recruiter
              </h2>
              <p className="text-gray-600">
                Post jobs and hire talented developers
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;