"use client";

import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import { useState, useEffect } from "react";
import { SideNavBar } from "./SideNavBar";
import { Header } from "./header";

export function BaseLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleDrawer = () => setIsOpen(!isOpen);
  let backdrop = false;

  useEffect(() => {
    if (window.innerWidth < 640) {
      setIsOpen(false);
      backdrop = true;
    } else {
      setIsOpen(true);
      backdrop = false;
    }
  }, []);

  return (
    <>
      <Header drawerHandler={toggleDrawer} />
      <Drawer
        className="mt-2 w-auto bg-amber-950 p-0"
        backdrop={backdrop}
        open={isOpen}
        onClose={toggleDrawer}
      >
        <DrawerHeader title="FlowBite" />
        <DrawerItems>
          <SideNavBar />
        </DrawerItems>
      </Drawer>
    </>
  );
}
