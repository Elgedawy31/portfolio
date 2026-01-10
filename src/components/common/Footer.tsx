import { Linkedin, Mail, MessageCircle } from 'lucide-react';
import { useProfile } from '@/stores/ProfileContext';

function Footer() {
  const { profile } = useProfile();
  
  // استخراج روابط Social Media من contact array
  const getSocialLinks = () => {
    const links = {
      email: '',
      phone: '',
      linkedin: ''
    };
    
    profile?.contact?.forEach((contact) => {
      const lowerContact = contact.toLowerCase();
      if (contact.includes('@')) {
        links.email = contact;
      } else if (contact.includes('+') || /^\d/.test(contact)) {
        links.phone = contact;
      } else if (lowerContact.includes('linkedin')) {
        links.linkedin = contact.startsWith('http') ? contact : `https://${contact}`;
      }
    });
    
    return links;
  };
  
  const socialLinks = getSocialLinks();
  
  const handleSendEmail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (socialLinks.email) {
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(socialLinks.email)}`, '_blank');
    }
  };

  const handleSendWhatsappMessage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const phone = socialLinks.phone?.replace(/\D/g, '');
    const name = profile?.firstName || 'there';
    const message = encodeURIComponent(`hi ${name} !`);
    
    if (phone) {
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    }
  };
  
  return (
    <footer className="text-footer-text flex flex-col items-center justify-center space-y-4 mb-4">
      <h3 className="text-lg font-semibold text-center ">You can Find me there </h3>
      <div className="flex space-x-6">
        {socialLinks.email && (
          <a 
            onClick={handleSendEmail}
            href="#"
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Email" 
            className="hover:text-brand transition-colors duration-300 cursor-pointer"
          >
            <Mail className="w-6 h-6" />
          </a>
        )}
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
        {socialLinks.phone && (
          <a 
            onClick={handleSendWhatsappMessage}
            href="#"
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="WhatsApp" 
            className="hover:text-brand transition-colors duration-300 cursor-pointer"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
        )}
      </div>
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Auvnet
      </p>
    </footer>
  );
}

export default Footer;

