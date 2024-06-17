import React from 'react';
import { useForm } from 'react-hook-form';

const Contact = () => {
 const { register, handleSubmit, formState: { errors } } = useForm();

 const onSubmit = (form) => {
    console.log(form);
 };

 return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input {...register("fullName", { required: true, minLength: 3, maxLength: 50 })} type="text" id="fullName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          {errors.fullName && <span className="text-red-500 font-bold">{errors.fullName.type === 'required' ? 'Full Name is required' : errors.fullName.type === 'minLength' ? 'Full Name must be at least 3 characters' : 'Full Name must be no more than 50 characters'}</span>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          {errors.email && <span className="text-red-500 font-bold">Email is required and must be a valid email address</span>}
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
          <input {...register("subject", { required: true, minLength: 3, maxLength: 100 })} type="text" id="subject" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
          {errors.subject && <span className="text-red-500 font-bold">{errors.subject.type === 'required' ? 'Subject is required' : errors.subject.type === 'minLength' ? 'Subject must be at least 3 characters' : 'Subject must be no more than 100 characters'}</span>}
        </div>
        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea {...register("body", { required: true, minLength: 3, maxLength: 1000 })} id="body" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
          {errors.body && <span className="text-red-500 font-bold">{errors.body.type === 'required' ? 'Message is required' : errors.body.type === 'minLength' ? 'Message must be at least 3 characters' : 'Message must be no more than 1000 characters'}</span>}
        </div>
        <div>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-500 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Send
          </button>
        </div>
      </form>
    </div>
 );
};

export default Contact;
