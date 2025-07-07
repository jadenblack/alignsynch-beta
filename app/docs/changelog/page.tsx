import { FC } from 'react';

const ChangelogPage: FC = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-5">Changelog</h1>
      <div id="changelog-content">
    <div className="p-4 mb-4 border rounded-lg">
      <p className="text-lg font-semibold">Test Pass</p>
      <p className="text-sm text-gray-500">7/7/2025, 1:38:17 PM</p>
    </div>
  
        {/* Test pass entries will be added here */}
      </div>
    </div>
  );
};

export default ChangelogPage;
