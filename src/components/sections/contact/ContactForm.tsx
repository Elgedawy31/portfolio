import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Paperclip, EmailIcon } from '../../icons';
import { sendContactMessage } from '@/api/Api';

// Install @hookform/resolvers for zod integration
// bun add @hookform/resolvers

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

const ContactForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const [charCount, setCharCount] = useState<number>(0);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (data: ContactFormInputs) => {
    setIsSubmittingForm(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const contactData = {
        messageObj: {
          name: data.name,
          email: data.email,
          description: data.message,
          // phone and wPhone are optional, can be added later if needed
        },
      };

      const response = await sendContactMessage(contactData);
      
      if (response.success) {
        setSubmitSuccess(true);
        reset(); // Reset form after successful submission
        setFileName(null);
        setCharCount(0);
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 8000); // 5 seconds delay
      } else {
        throw new Error(response.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending contact message:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  return (
    <div className="bg-section-background caret-foreground bg-[url('/src/assets/backgrounds/contact-bg.svg')] bg-no-repeat bg-cover  rounded-lg p-4 space-y-4">
      <h3 className="font-regular text-section-text mb-4">SAY HELLO!</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-section-text text-base font-regular mb-2">Your name</label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="shadow appearance-none border rounded-xl p-5 w-full text-section-text placeholder-placeholder leading-tight focus:outline-none focus:shadow-outline bg-input-background border-none"
            placeholder="Write Your name"
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-section-text text-base font-regular mb-2">Your Email ID</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="shadow appearance-none border rounded-xl p-5 w-full text-section-text placeholder-placeholder leading-tight focus:outline-none focus:shadow-outline bg-input-background border-none"
            placeholder="Write Your Email"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
              <label htmlFor="message" className="block text-section-text text-base font-regular mb-2">Write your message here...</label>
          <div className="relative rounded-xl overflow-hidden shadow">
            <textarea
              id="message"
              {...register('message', { onChange: (e) => setCharCount(e.target.value.length) })}
              rows={4}
              className="block w-full p-4 pr-16 text-section-text placeholder-placeholder bg-input-background border-none resize-none focus:outline-none"
              placeholder="Write your message here..."
              aria-invalid={errors.message ? "true" : "false"}
            ></textarea>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-3 bg-input-background border-t border-gray-700">
              <label htmlFor="file-upload" className="flex items-center space-x-2 cursor-pointer text-muted px-3 py-1.5 bg-[#4D4D4D] rounded-full hover:bg-gray-600 transition-colors duration-200">
              <Paperclip className="w-4  h-4 text-white"/>
                <span className="text-white text-sm">{fileName ? fileName : 'Upload File'}</span>
                <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
              </label>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-foreground"><span className="text-brand-primary">{charCount}</span> / 250</span>
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmittingForm}
                  className="w-9 h-9 flex items-center justify-center bg-gradient-brand rounded-full focus:outline-none focus:shadow-outline disabled:opacity-50"
                >
                  <EmailIcon className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>

        {/* Success Message with Animation */}
        <AnimatePresence>
          {submitSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1.0] }}
              className="bg-green-500/20 border border-green-500 text-green-400 px-6 py-4 rounded-lg shadow-lg"
            >
              <div className="flex items-start space-x-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="shrink-0"
                >
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <div>
                  <h4 className="font-semibold text-green-300 mb-1">شكراً على التواصل!</h4>
                  <p className="text-sm text-green-400">
                    تم إرسال رسالتك بنجاح. سنقوم بالرد عليك في أقرب وقت ممكن.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1.0] }}
              className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg"
            >
              {submitError}
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default ContactForm;

