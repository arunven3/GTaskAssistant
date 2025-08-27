"use client";

import { useState } from "react";
import {
  Button,
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
  SidebarLogo,
} from "flowbite-react";
import { HiChartPie, HiUser, HiShoppingBag, HiMenu } from "react-icons/hi";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        // className="z-50 m-4 rounded-md"
      >
        <HiMenu className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div
          className="bg-opacity-50 opacity bg-black-75 fixed inset-0 z-40 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar>
          <SidebarLogo href="#" img="/vercel.svg" imgAlt="Flowbite logo">
            GTaskAssistant
          </SidebarLogo>
          <SidebarItems>
            <SidebarItemGroup>
              <SidebarItem href="#" icon={HiChartPie}>
                Dashboard
              </SidebarItem>
              <SidebarItem href="#" icon={HiUser}>
                Users
              </SidebarItem>
              <SidebarItem href="#" icon={HiShoppingBag}>
                Model Handling
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </Sidebar>
      </div>
    </div>
  );
}
