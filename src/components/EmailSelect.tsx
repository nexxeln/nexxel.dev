import { Menu, Transition } from "@headlessui/react";
import { type ReactNode, Fragment } from "react";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

type Props = {
  href: string;
  children: ReactNode;
};

const DropdownMenuItem = ({ href, children }: Props) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href={href}
          className={classNames(
            active ? "bg-orange-200 dark:bg-zinc-700" : "",
            "block px-4 py-2 text-sm"
          )}
        >
          {children}
        </a>
      )}
    </Menu.Item>
  );
};

export const EmailSelect = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="text-pink-300/80 hover:text-pink-300">
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
        <Menu.Items className="absolute right-0  z-10 mt-2 w-56 origin-top-right rounded-xl border border-neutral-700 bg-neutral-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-neutral-700">
          <Menu.Item>
            {({ active }) => (
              <span
                className={`block px-4 py-2 text-sm cursor-pointer rounded-t-xl w-full ${
                  active ? "bg-neutral-700" : ""
                }`}
                onClick={() =>
                  navigator.clipboard.writeText("shoubhit2005@gmail.com")
                }
              >
                Copy
              </span>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <a
                className={`block px-4 py-2 text-sm rounded-b-xl text-pink-300/80 hover:text-pink-300 hover:no-underline w-full ${
                  active ? "bg-neutral-700" : ""
                }`}
                href="mailto:shoubhit2005@gmail.com"
              >
                Send
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
