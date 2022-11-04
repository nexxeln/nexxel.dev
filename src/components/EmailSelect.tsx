import { Menu, Transition } from "@headlessui/react";
import { type ReactNode, Fragment } from "react";

export const EmailSelect = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="text-t-green hover:underline underline-offset-[3px]">
          Email
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0  z-10 mt-2 w-56 origin-top-right rounded-xl border border-neutral-700 bg-t-black shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-neutral-700">
          <Menu.Item>
            {({ active }) => (
              <div
                className={`block px-4 py-2 text-sm cursor-pointer rounded-t-xl w-full border-b border-neutral-700 ${
                  active ? "bg-neutral-800" : ""
                }`}
                onClick={() =>
                  navigator.clipboard.writeText("shoubhit2005@gmail.com")
                }
              >
                <div className="flex justify-between">
                  <span>Copy</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-4 h-4 ${active ? "rotate-[24deg]" : ""}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                    />
                  </svg>
                </div>
              </div>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <a
                className={`block px-4 py-2 text-sm rounded-b-xl hover:no-underline w-full ${
                  active ? "bg-neutral-800" : ""
                }`}
                href="mailto:shoubhit2005@gmail.com"
              >
                <div className="flex justify-between">
                  <span>Send</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={`w-4 h-4 ${active ? "-rotate-[24deg]" : ""}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </div>
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
