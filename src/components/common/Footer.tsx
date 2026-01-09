import { Facebook, Linkedin, Github } from '../icons';
import { useProfile } from '@/stores/ProfileContext';

function Footer() {
  const { profile } = useProfile();
  
  // استخراج روابط Social Media من contact array
  const getSocialLinks = () => {
    const links = {
      email: 'elgedawyahmed333@gmail.com',
      phone: '+971 50 976 6001',
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com', // Fake data - default Facebook link
      github: 'https://github.com' // Fake data - default GitHub link
    };
    
    profile?.contact?.forEach((contact) => {
      const lowerContact = contact.toLowerCase();
      if (contact.includes('@')) {
        links.email = contact;
      } else if (contact.includes('+') || /^\d/.test(contact)) {
        links.phone = contact;
      } else if (lowerContact.includes('linkedin')) {
        links.linkedin = contact.startsWith('http') ? contact : `https://${contact}`;
      } else if (lowerContact.includes('facebook') || lowerContact.includes('fb')) {
        links.facebook = contact.startsWith('http') ? contact : `https://${contact}`;
      } else if (lowerContact.includes('github')) {
        links.github = contact.startsWith('http') ? contact : `https://${contact}`;
      }
    });
    
    return links;
  };
  
  const socialLinks = getSocialLinks();
  
  const handleSendWhatsappMessage = () => {
    const phone = socialLinks.phone?.replace(/\D/g, ''); // إزالة كل شيء ما عدا الأرقام
    if (phone) {
      window.open(`https://wa.me/${phone}`, '_blank');
    } else {
      window.open('https://wa.me/201003098950', '_blank');
    }
  };
  
  return (
    <footer className="text-footer-text flex flex-col items-center justify-center space-y-4 mb-4">
      <h3 className="text-lg font-semibold text-center ">You can Find me there </h3>
      <div className="flex space-x-6">
        <a 
          href={socialLinks.facebook} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Facebook" 
          className="hover:text-brand transition-colors duration-300"
        >
          <Facebook className="w-6 h-6" />
        </a>
        {socialLinks.linkedin && (
          <a 
            href={socialLinks.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn" 
            className="hover:text-brand transition-colors duration-300"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        )}
        <a 
          href={socialLinks.github} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="GitHub" 
          className="hover:text-brand transition-colors duration-300"
        >
          <Github className="w-6 h-6" />
        </a>
      </div>
      <p className="text-sm cursor-pointer" onClick={handleSendWhatsappMessage}>
        &copy; {new Date().getFullYear()} Auvnet
      </p>
    </footer>
  );
}

export default Footer;

