import React from "react";

export function Footer() {
  return (
    <footer className="py-12 px-8 bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Cookie Preferences
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gray-300">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Studio VN21. All right reserved.
          Designed and developed by{" "}
          <a className="underline" href="https://www.recurssive.com">
            Recurssive
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
