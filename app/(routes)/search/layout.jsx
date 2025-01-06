import React from 'react';
import CategorySlideBar from './_components/CategorySlideBar';

function Layout({ children }) {
  return (
    <div className="flex flex-col md:flex-row mt-8">
      {/* Side Category Nav bar */}
      <div className="hidden md:block w-1/4 p-4 border-r">
        <CategorySlideBar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4">
        {children}
      </div>
    </div>
  );
}

export default Layout;
