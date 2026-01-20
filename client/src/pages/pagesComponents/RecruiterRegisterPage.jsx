import { Link } from 'react-router-dom';
import RecruiterRegisterForm from '../../users/components/RecruiterRegisterForm';


function RecruiterRegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Recruiter Registration
          </h1>
          <p className="text-purple-100 text-lg">
            Join PortfolYou to post jobs and hire talent
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-8">
          <RecruiterRegisterForm />
          
          <div className="mt-6 text-center">
            <Link to="/register" className="text-purple-600 hover:text-purple-800 font-medium">
              ← Back to registration options
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterRegisterPage;