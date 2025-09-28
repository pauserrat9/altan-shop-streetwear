import { Link } from 'react-router-dom';
import altanLogo from '@/assets/altan-logo.png';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="text-center space-y-16">
        {/* Logo */}
        <div>
          <img 
            src={altanLogo} 
            alt="AltanShop" 
            className="h-12 w-auto mx-auto"
          />
        </div>

        {/* Navigation Options */}
        <div className="space-y-4">
          <Link 
            to="/tees"
            className="block text-lg font-serif text-foreground hover:text-primary hover:underline transition-colors duration-200"
          >
            shop tee's
          </Link>
          
          <Link 
            to="/hoodies"
            className="block text-lg font-serif text-foreground hover:text-primary hover:underline transition-colors duration-200"
          >
            shop hoodies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
