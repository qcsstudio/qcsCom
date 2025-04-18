import React from "react";

const OurStory = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>

        <div className="bg-gray-50 rounded-xl p-6 sm:flex sm:gap-6">
          {/* Left Text Content */}
          <div className="sm:w-2/3 text-[#000000] text-xl space-y-4">
            <p>
              At <strong>QuantumCrafters Studio</strong>, we're not just
              building technology—we're crafting stories of transformation. We
              began with a simple belief:{" "}
              <strong className="font-semibold">
                education should unlock potential, not limit it, and AI should
                empower, not overwhelm.
              </strong>
            </p>

            <p>
              Our journey started when our founder while mentoring aspiring tech
              students noticed a gap. Students lacked real-world readiness, and
              businesses lacked affordable, intelligent solutions. That gap
              became our purpose.
            </p>

            <p>
              We turned frustration into fuel, and QuantumCrafters was born to
              bridge education, innovation, and business impact.
            </p>
          </div>

          {/* Right Placeholder (Image or Graphic) */}
          <div className="sm:w-1/3 mt-6 sm:mt-0">
            <div className="w-full h-40 sm:h-full bg-[#D9D9D9] rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
