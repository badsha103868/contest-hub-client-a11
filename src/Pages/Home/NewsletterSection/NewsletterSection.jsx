import React, { useState } from "react";
import Swal from "sweetalert2"; 

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid email!",
      });
      return;
    }

    // Show success SweetAlert
    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: `You have subscribed with ${email}`,
      timer: 2000,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
    });

    setEmail("");
  };

  return (
    <section className="py-16 bg-base-100 text-base-content">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">📬 Subscribe to Our Newsletter</h2>
        <p className="mb-6 text-base-content/70">
          Get notified about new contests & exclusive tips!
        </p>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col md:flex-row gap-3 justify-center"
        >
          <input
            type="email"
            placeholder="Your email"
            className="input input-bordered w-full md:w-80 text-base-content"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn btn-primary px-8 text-white">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
