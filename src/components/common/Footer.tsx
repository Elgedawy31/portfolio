
import { Facebook, Linkedin, Github } from '../icons';

function Footer() {
  const handleSendWhatsappMessage = () => {
    window.open('https://wa.me/201003098950', '_blank');
  }
    return (
    <footer className="text-footer-text flex flex-col items-center justify-center space-y-4 mb-4">
      <h3 className="text-lg font-semibold text-center ">You can Find me there </h3>
      <div className="flex space-x-6">
        <a href="#" aria-label="Facebook" className="hover:text-brand transition-colors duration-300">
          <Facebook className="w-6 h-6" />
        </a>
        <a href="#" aria-label="LinkedIn" className="hover:text-brand transition-colors duration-300">
          <Linkedin className="w-6 h-6" />
        </a>
        <a href="#" aria-label="GitHub" className="hover:text-brand transition-colors duration-300">
          <Github className="w-6 h-6" />
        </a>
      </div>
      <p className="text-sm" onClick={handleSendWhatsappMessage}>&copy; {new Date().getFullYear()} Mohamed Elgedawy</p>
    </footer>
  );
}

export default Footer;

