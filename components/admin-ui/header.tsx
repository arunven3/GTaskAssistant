import { Avatar, Button } from "flowbite-react";

export const Header = ({ drawerHandler }: { drawerHandler: any }) => (
  <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800">
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex items-center justify-start">
        <Button
          onClick={drawerHandler}
          color="secondary"
          data-drawer-target="drawer-navigation"
          data-drawer-toggle="drawer-navigation"
          aria-controls="drawer-navigation"
          className="mr-2 cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700"
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <svg
            aria-hidden="true"
            className="hidden h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          PTaskAssistant
        </span>
      </div>
      <div className="flex items-center lg:order-2">
        <button
          type="button"
          data-dropdown-toggle="notification-dropdown"
          className="mr-1 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-600"
        >
          <span className="sr-only">View notifications</span>
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
          </svg>
        </button>

        <div
          className="z-50 my-4 hidden max-w-sm list-none divide-y divide-gray-100 overflow-hidden rounded rounded-xl bg-white text-base shadow-lg dark:divide-gray-600 dark:bg-gray-700"
          id="notification-dropdown"
        >
          <div className="block bg-gray-50 px-4 py-2 text-center text-base font-medium text-gray-700 dark:bg-gray-600 dark:text-gray-300">
            Notifications
          </div>
          <a
            href="#"
            className="text-md block bg-gray-50 py-2 text-center font-medium text-gray-900 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline"
          >
            <div className="inline-flex items-center">
              <svg
                aria-hidden="true"
                className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              View all
            </div>
          </a>
        </div>

        <button
          type="button"
          className="mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:mr-0 dark:focus:ring-gray-600"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="dropdown"
        >
          <span className="sr-only">Open user menu</span>
          <Avatar rounded />
        </button>
      </div>
    </div>
  </nav>
);
