import * as React from 'react';

export interface IHeaderProps {
}

export default class Header extends React.Component<IHeaderProps> {
  public render() {
    return (
      <div className="bg-slate-900">
  <div className="container mx-auto px-4">
    <nav className="flex items-center py-5">
      <div className="w-35 text-white">URL Shortener
        {/* <img src="/logo3.png" alt="Shortly Logo" className="w-full h-full object-contain" /> */}
      </div>
    </nav>
  </div>
</div>

    );
  }
}
