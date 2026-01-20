import { Link } from 'react-router-dom';
import RegisterForm from '../../users/components/RegisterForm'

function DeveloperRegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Developer Registration
          </h1>
          <p className="text-blue-100">
            Create your developer portfolio account
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-xl p-8">
          <RegisterForm/>
          
          <div className="mt-6 text-center">
            <Link to="/register" className="text-blue-600 hover:text-blue-800">
              ← Back to registration options
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeveloperRegisterPage;