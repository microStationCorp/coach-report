import Link from "next/link";
import { useState } from "react";

const Links = [
  {
    text: "Add Coach",
    url: "/add_coach",
  },
  {
    text: "coach list",
    url: "/coach_list",
  },
  {
    text: "Damages",
    url: "/damages",
  },
];

export const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <>
      <div
        className={"bg-gradient-to-l from-slate-400 to-slate-200 w-full shadow"}
      >
        <div className="md:flex justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <div className="text-2xl font-bold">
                <Link href={"/"} className="hover:font-semibold">
                  Coach-report
                </Link>
              </div>
              <div className="md:hidden">
                <button
                  className="p-2 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* menu */}
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-2 md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <div className="items-center justify-center space-y-4 md:flex md:space-x-4 md:space-y-0">
                {Links.map((l) => (
                  <NavItem key={l.url} text={l.text} url={l.url} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const NavItem = ({ text, url }: { text: string; url: string }) => {
  return (
    <div className="capitalize font-semibold">
      <Link href={url} passHref className="hover:font-semibold">
        {text}
      </Link>
    </div>
  );
};
