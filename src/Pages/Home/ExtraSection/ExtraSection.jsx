const ExtraSection = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Why Choose ContestHub?
          </h2>
          <p className=" mb-6">
            ContestHub is more than just a platform — it’s a creative ecosystem.
            Whether you're a designer, writer, or innovator, your talent
            deserves recognition and rewards.
          </p>

          <ul className="space-y-4">
            <li>✅ Secure payment & fair judging</li>
            <li>✅ Real rewards & verified winners</li>
            <li>✅ Open opportunities for everyone</li>
            <li>✅ Grow your skills & portfolio</li>
          </ul>
        </div>

        {/* Image */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
            alt="success"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default ExtraSection;
