import React from "react";

const FooterSection = () => {
  return (
    <div className="">
      <footer className="footer mt-10 sm:footer-horizontal bg-gray-300 text-base-content p-10">
        <aside>
          <p className="font-semibold text-xl">
            Smart<span className="text-primary">Deals</span>
            <br />
          </p>
          <p className="w-80 text-gray-500">Your trusted marketplace for authentic local products. Discover the best deals from across Bangladesh.</p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default FooterSection;
