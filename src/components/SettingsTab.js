import React from 'react';

const SettingsTab = () => {
  return (
    <div className="container mx-auto px-4 mt-4 max-w-lg">
      <form className="bg-white shadow-lg rounded-lg p-6">
        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">Select Category</label>
          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-300">
            <option value="">Select Category</option>
            {/* Add more options here */}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">Select Source</label>
          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-300">
            <option value="">Select Source</option>
            {/* Add more options here */}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 font-semibold mb-2">Select Author</label>
          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-300">
            <option value="">Select Author</option>
            {/* Add more options here */}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-md shadow-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SettingsTab;
