import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { EmailIcon } from '../../icons'; // Assuming EmailIcon is needed for the upload button

// Install @hookform/resolvers for zod integration
// bun add @hookform/resolvers

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

const ContactForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
  });

  const [fileName, setFileName] = useState<string | null>(null);

  const onSubmit = async (data: ContactFormInputs) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
    alert('Message sent successfully!');
    // In a real application, you would send this data to a backend
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-section-text text-sm font-bold mb-2">Your name</label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-section-text placeholder-placeholder leading-tight focus:outline-none focus:shadow-outline bg-input-background border-none"
          placeholder="Write Your name"
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-section-text text-sm font-bold mb-2">Your Email ID</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-section-text placeholder-placeholder leading-tight focus:outline-none focus:shadow-outline bg-input-background border-none"
          placeholder="Write Your Email"
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-section-text text-sm font-bold mb-2">Write your message here...</label>
        <div className="relative">
          <textarea
            id="message"
            {...register('message')}
            rows={4}
            className="shadow appearance-none border rounded-t w-full py-3 px-4 text-section-text placeholder-placeholder leading-tight focus:outline-none focus:shadow-outline bg-input-background border-none resize-none"
            placeholder="Write your message here..."
            aria-invalid={errors.message ? "true" : "false"}
          ></textarea>
          <div className="flex justify-between items-center bg-input-background rounded-b p-3 border-t border-gray-700">
            <label htmlFor="file-upload" className="flex items-center space-x-2 cursor-pointer text-muted">
              <EmailIcon /> {/* Using EmailIcon as a placeholder for file upload icon */}
              <span>{fileName ? fileName : 'Upload File'}</span>
              <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-muted">0 / 250</span> {/* Character count placeholder */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              >
                Say Hello
              </button>
            </div>
          </div>
        </div>
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>
    </form>
  );
};

export default ContactForm;

