import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  CommandLineIcon,
  PlusCircleIcon,
  ViewColumnsIcon,
  ShieldExclamationIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navigation = [
  { name: "SQL Dashboard", to: "/sql-dashboard", icon: CommandLineIcon },
  { name: "Add Data Source", to: "/datasource-create", icon: PlusCircleIcon },
  { name: "View Data Sources", to: "/datasource-view", icon: ViewColumnsIcon },
  {
    name: "Quarantine Table",
    to: "/quarantine-table",
    icon: ShieldExclamationIcon,
  },
];

const SideNav = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const NavItems = ({ mobile = false }) => (
    <ul role="list" className="space-y-1">
      {navigation.map((item) => (
        <li key={item.name}>
          <Link
            to={item.to}
            className={classNames(
              location.pathname === item.to
                ? "bg-custom-light-purple text-white"
                : "text-gray-200 hover:bg-custom-light-purple/10 hover:text-white",
              "group flex items-center py-2 text-md font-medium w-full",
              mobile ? "px-2" : "px-6",
            )}
            onClick={() => mobile && setIsMobileMenuOpen(false)}
          >
            <item.icon
              className={classNames(
                location.pathname === item.to
                  ? "text-white"
                  : "text-gray-300 group-hover:text-white",
                "mr-3 flex-shrink-0 h-6 w-6",
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-80 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-custom-medium-blue shadow-lg shadow-custom-light-purple/10">
          <div className="flex h-48 shrink-0 items-center justify-center mt-8">
            <img
              className="h-48 w-auto"
              src="./images/logo_whitestars.png"
              alt="Helios"
            />
          </div>
          <nav className="mt-8 flex flex-1 flex-col">
            <div className="space-y-1">
              <NavItems />
            </div>
            <div className="mt-auto pb-4">
              <a
                href="#"
                className="group flex items-center px-6 py-2 text-md font-medium text-gray-200 hover:bg-custom-light-purple/10 hover:text-white w-full"
              >
                <Cog6ToothIcon
                  className="mr-3 flex-shrink-0 h-6 w-6 text-gray-300 group-hover:text-white"
                  aria-hidden="true"
                />
                Settings
              </a>
            </div>
          </nav>
        </div>
      </div>

      <div className="lg:hidden fixed top-0 left-0 z-50 w-full bg-custom-medium-blue p-4 flex justify-between items-center shadow-md">
        <img
          className="h-16 w-auto"
          src="./images/logo_whitestars.png"
          alt="Helios"
        />
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          {isMobileMenuOpen ? (
            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="lg:hidden h-20"></div>

      <div
        className={classNames(
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          "lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-custom-medium-blue py-20 transition-transform duration-300 ease-in-out shadow-lg shadow-custom-light-purple/10",
        )}
      >
        <nav className="flex flex-col h-full">
          <div className="flex-1 mt-6">
            <div className="space-y-1">
              <NavItems mobile />
            </div>
          </div>
          <div className="mt-auto">
            <a
              href="#"
              className="group flex items-center px-2 py-2 text-md font-medium rounded-md text-gray-200 hover:bg-custom-light-purple/10 hover:text-white w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Cog6ToothIcon
                className="mr-3 flex-shrink-0 h-6 w-6 text-gray-300 group-hover:text-white"
                aria-hidden="true"
              />
              Settings
            </a>
          </div>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default SideNav;
