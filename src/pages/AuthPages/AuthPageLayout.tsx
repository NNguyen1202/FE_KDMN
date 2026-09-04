import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        {/* <div className="items-center hidden w-auto h-full lg:w-1/2 bg-white dark:bg-white/5 lg:grid"> */}
        <div className="items-center hidden w-auto h-full lg:w-1/2 bg-white dark:bg-gray-900 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            {/* <div className="flex flex-col items-center max-w-xs"> */}
            <div className="fixed w-172">
              <Link to="/" className="">
                {/* <img
                  width={231}
                  height={48}
                  src="/images/logo/logoEasyHRM1.png"
                  alt="Logo"
                /> */}

                <img  src="https://i.ibb.co/C5wFgwn3/h-nh-nh-2026-09-04-111452077.png"></img>
              </Link>
              {/* <p className="text-center text-gray-400 dark:text-white/60">
                Nền tảng quản lý nhân sự và quản lý doanh thu cho KDMN
              </p> */}
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
