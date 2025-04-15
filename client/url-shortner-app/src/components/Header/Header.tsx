import * as React from 'react';

export interface IHeaderProps {
}

export default class Header extends React.Component<IHeaderProps> {
  public render() {
    return (
      <div className="bg-slate-900">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between flex-wrap py-4">
            <div className="text-white text-xl sm:text-2xl font-semibold">
              URL Shortener
              {/* Optional logo */}
              {/* <img src="/logo3.png" alt="Shortly Logo" className="h-8 w-auto object-contain inline-block ml-2" /> */}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}
