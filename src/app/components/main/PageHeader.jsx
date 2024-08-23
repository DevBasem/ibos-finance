"use client";
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Icon } from "@iconify/react";
import SideBar from "./SideBar";

const PageHeader = ({ title, subtitle }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSheetOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Initial check to close the sheet if the window is already larger than 768px
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="flex items-center justify-between">
      <h2 className="text-main-dark-primary flex flex-col py-8 text-4xl max-md:text-2xl font-extrabold dark:text-white">
        <span>{title}</span>
        <span>{subtitle}</span>
      </h2>

      <div className="md:hidden block">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger>
            <div className="border bg-main-light-secondary hover:bg-main-light-selected transition-all p-1 rounded-md">
              <Icon icon="mdi:menu" className="text-3xl text-gray-600" />
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              <SheetDescription>
                <SideBar />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default PageHeader;
