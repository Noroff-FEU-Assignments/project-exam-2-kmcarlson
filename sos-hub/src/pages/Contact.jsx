import { useForm } from 'react-hook-form';

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (form) => {
    console.log(form);
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-8 space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-lg font-medium text-gray-700 mb-2">Full Name</label>
          <input
            {...register("fullName", { required: true, minLength: 3, maxLength: 50 })}
            type="text"
            id="fullName"
            className={`w-full px-5 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 text-lg ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.type === 'required' ? 'Full Name is required' : 
               errors.fullName.type === 'minLength' ? 'Full Name must be at least 3 characters' : 
               'Full Name must be no more than 50 characters'}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
          <input
            {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
            type="email"
            id="email"
            className={`w-full px-5 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 text-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">Email is required and must be a valid email address</p>
          )}
        </div>
        <div>
          <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2">Subject</label>
          <input
            {...register("subject", { required: true, minLength: 3, maxLength: 100 })}
            type="text"
            id="subject"
            className={`w-full px-5 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 text-lg ${errors.subject ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subject.type === 'required' ? 'Subject is required' : 
               errors.subject.type === 'minLength' ? 'Subject must be at least 3 characters' : 
               'Subject must be no more than 100 characters'}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="body" className="block text-lg font-medium text-gray-700 mb-2">Message</label>
          <textarea
            {...register("body", { required: true, minLength: 3, maxLength: 1000 })}
            id="body"
            rows={6}
            className={`w-full px-5 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-900 text-lg ${errors.body ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.body && (
            <p className="text-red-500 text-sm mt-1">
              {errors.body.type === 'required' ? 'Message is required' : 
               errors.body.type === 'minLength' ? 'Message must be at least 3 characters' : 
               'Message must be no more than 1000 characters'}
            </p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-900 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
