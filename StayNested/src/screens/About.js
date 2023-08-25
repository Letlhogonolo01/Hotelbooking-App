import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <div>
      <Navbar />
      <div className="card" style={{ margin: 20 }}>
        <div className="card-body">
          <h3 className="card-title">Welcome to StayNested </h3>
          <br />
          <h5 className="card-title">Our Mission</h5>
          <p className="card-text">
            - At StayNested, our mission is to transform your travel dreams into
            reality. We're not just another hotel app; we're your travel partner
            dedicated to curating exceptional experiences that go beyond mere
            accommodation.
          </p>
          <h5 className="card-title">Our Story</h5>
          <p className="card-text">
            - StayNested was born out of a passion for exploring the world's
            hidden gems. Our journey began when we realized that travel is about
            more than just staying somewhere – it's about creating memories that
            last a lifetime.
          </p>
          <h5 className="card-title">This Is What Sets Us Apart</h5>
          <br />
          <h5 className="card-title">Tailored Experiences</h5>
          <p className="card-text">
            - We don't just offer hotels; we provide tailor-made experiences
            that suit your preferences. Whether you're a solo adventurer, a
            couple seeking romance, or a family on a fun-filled vacation,
            StayNested crafts stays that match your desires.
          </p>
          <h5 className="card-title">Ease and Simplicity</h5>
          <p className="card-text">
            - Planning your getaway should be stress-free. Our user-friendly app
            ensures seamless booking, secure payments, and instant
            confirmations, so you can focus on the excitement of your upcoming
            journey.
          </p>
          <h5 className="card-title">Join the StayNested Community</h5>
          <p className="card-text">
            - By choosing StayNested, you're not just a user – you're part of a
            vibrant community of travelers who believe in exploring, connecting,
            and creating memories. Join us on social media and share your
            #StayNested moments!
          </p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default About;
