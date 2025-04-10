import * as React from 'react';

export interface IFooterProps {
}

export default class Footer extends React.Component<IFooterProps> {
  public render() {
    return (
        <div className='bg-slate-900 text-white text-left py-5 pl-5'>
            Copyright &#169; URLSHORTNER | Krishna Patel
        </div>
    );
  }
}
