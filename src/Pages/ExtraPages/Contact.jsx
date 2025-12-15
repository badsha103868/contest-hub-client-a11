import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Contact form data:", data);
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Your message has been sent successfully.",
      timer: 2000,
      showConfirmButton: false,
    });
    reset(); // form reset after submit
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6 text-center text-primary">
        Contact Us
      </h1>
      <p className="text-gray-700 mb-6 text-center">
        Have any questions, feedback, or inquiries? We’d love to hear from you!
      </p>

      <form
        className="space-y-4 bg-base-100 p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            placeholder="Your Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Enter a valid email",
              },
            })}
            className="input input-bordered w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 font-semibold">Message</label>
          <textarea
            placeholder="Your Message"
            {...register("message", { required: "Message is required" })}
            className="textarea textarea-bordered w-full"
            rows={5}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Send Message
        </button>
      </form>

      <div className="mt-8 text-center text-gray-600">
        <p>Email: support@contesthub.com</p>
        <p>Phone: +880 1234 567 890</p>
        <p>Address: Dhaka, Bangladesh</p>
      </div>
    </section>
  );
};

export default ContactPage;
