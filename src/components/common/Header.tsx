import { useEffect } from "react";
import { Motion } from "@/motion/Motion";
import { DotsGridSVG } from '../ui';
import { useProfile } from "@/stores/ProfileContext";

function Header() {
  const { profile } = useProfile();
  const profileImageUrl = profile?.profileImage?.url || profile?.profileImage?.secureUrl;
  const fullName = profile?.firstName && profile?.lastName 
    ? `${profile.firstName} ${profile.lastName}` 
    : 'Portfolio';
  const title = profile?.title || '';
  const bio = profile?.bio || '';

  // Update meta tags and title
  useEffect(() => {
    // Update document title
    document.title = `${fullName}${title ? ` - ${title}` : ''} | Portfolio`;

    // Helper function to update or create meta tag
    const setMetaTag = (name: string, content: string, property = false) => {
      if (!content) return;
      
      const attribute = property ? 'property' : 'name';
      const selector = property 
        ? `meta[property="${name}"]` 
        : `meta[name="${name}"]`;
      
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Update or create meta tags
    setMetaTag('description', bio || `${fullName}${title ? ` - ${title}` : ''} Portfolio`);
    
    // Open Graph meta tags
    setMetaTag('og:title', `${fullName}${title ? ` - ${title}` : ''}`, true);
    setMetaTag('og:description', bio || `${fullName} Portfolio`, true);
    setMetaTag('og:image', profileImageUrl || '', true);
    setMetaTag('og:type', 'website', true);
    
    // Twitter Card meta tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', `${fullName}${title ? ` - ${title}` : ''}`);
    setMetaTag('twitter:description', bio || `${fullName} Portfolio`);
    setMetaTag('twitter:image', profileImageUrl || '');

    // Update favicon with profile image
    if (profileImageUrl) {
      let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.setAttribute('rel', 'icon');
        document.head.appendChild(favicon);
      }
      favicon.setAttribute('href', profileImageUrl);
      favicon.setAttribute('type', 'image/png');
    }
  }, [profile, fullName, title, bio, profileImageUrl]);

  return (
    <Motion animateOnMount={true} variant="fadeDown" className="">
      <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-background/70 flex justify-between items-center  shadow-sm shadow-foreground/10">
        {profileImageUrl ? (
          <img 
            src={profileImageUrl} 
            alt={`${profile?.firstName} ${profile?.lastName}`}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-foreground rounded-full"></div>
        )}
        
        <div className="flex items-center">
          <DotsGridSVG />
        </div>
      </header>
    </Motion>
  );
}

export default Header;
