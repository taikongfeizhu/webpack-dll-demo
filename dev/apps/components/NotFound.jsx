import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="error-notfound content">
      <div className="error-box-wrapper">
        <div className="error-box">
          <div className="error-code">
            <h3>你访问的页面不存在</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
