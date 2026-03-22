import React from "react";

const Footer = () => {
  return (
    <div className="py-16">
      <footer className="flex flex-wrap justify-center lg:justify-between gap-10 md:gap-20 py-16 px-6 md:px-16 lg:px-24 xl:px-32 text-[13px] text-gray-500 bg-black">
        
        {/* Left Section */}
        <div className="flex flex-wrap items-start gap-10 md:gap-[60px] xl:gap-[140px]">
          <a href="https://prebuiltui.com">
            <svg
              width="31"
              height="34"
              viewBox="0 0 31 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m8.75 5.3 6.75 3.884 6.75-3.885M8.75 28.58v-7.755L2 16.939m27 0-6.75 3.885v7.754M2.405 9.408 15.5 16.954l13.095-7.546M15.5 32V16.939M29 22.915V10.962a2.98 2.98 0 0 0-1.5-2.585L17 2.4a3.01 3.01 0 0 0-3 0L3.5 8.377A3 3 0 0 0 2 10.962v11.953A2.98 2.98 0 0 0 3.5 25.5L14 31.477a3.01 3.01 0 0 0 3 0L27.5 25.5a3 3 0 0 0 1.5-2.585"
                stroke="url(#grad)"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="grad"
                  x1="15.5"
                  y1="2"
                  x2="15.5"
                  y2="32"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F8FAFC" />
                  <stop offset="1" stopColor="#383838" />
                </linearGradient>
              </defs>
            </svg>
          </a>

          {[
            { title: "Product", items: ["Home", "Support", "Pricing", "Affiliate"] },
            { title: "Resources", items: ["Company", "Blogs", "Community", "Careers", "About"] },
            { title: "Legal", items: ["Privacy", "Terms"] },
          ].map((section) => (
            <div key={section.title}>
              <p className="text-slate-100 font-semibold">{section.title}</p>
              <ul className="mt-2 space-y-2">
                {section.items.map((item) => (
                  <li key={item}>
                    <a href="/" className="hover:text-indigo-600 transition">
                      {item}
                      {item === "Careers" && (
                        <span className="ml-2 px-2 py-1 text-xs rounded bg-indigo-600 text-white">
                          We’re hiring!
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end max-md:items-center max-md:text-center gap-2">
          <p className="max-w-60">
            Making every customer feel valued—no matter the size of your audience.
          </p>

          <div className="flex gap-4 mt-3">
            <span className="hover:text-indigo-500 cursor-pointer">Dribbble</span>
            <span className="hover:text-indigo-500 cursor-pointer">LinkedIn</span>
            <span className="hover:text-indigo-500 cursor-pointer">Twitter</span>
            <span className="hover:text-indigo-500 cursor-pointer">YouTube</span>
          </div>

          <p className="mt-3">
            © 2025 <a href="https://prebuiltui.com">PrebuiltUI</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
