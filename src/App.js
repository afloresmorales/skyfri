import './App.css';
import { useState } from 'react';
import Dropdown from 'react-dropdown';
import { Steps } from './components';
const steps = ['Register agreement', 'Add products', 'Add escalations', 'Add services', 'Forecast generation', 'Review'];
const subsidiaryOptions = ['amazon', 'ios', 'android', 'Web', 'roku'];
function App() {
  const [index, setIndex] = useState(0);
  const [subsidiary, setSubsidiary] = useState('');
  return (
    <div className="container mx-auto m-8">
      <div className="p-5">
        <div className="mx-4 p-4">
          <Steps steps={steps} />
        </div>
      </div>
      <h2 className="font-bold text-gray-600 text-m my-8">{index + 1} {steps[index]}</h2>
      <div className="flex flex-col md:flex-row">
        <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8"> Agreement title*</div>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input placeholder="Just a hint.." className="p-1 px-2 appearance-none outline-none w-full text-gray-800" /> </div>
        </div>
        <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8"> Billing frequency*</div>
          <div className="bg-white my-2 flex items-center flex-row ">
            <div className="flex items-center mr-4">
              <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="default-radio-1" className="ml-2 text-sm font-medium text-slate-600">Monthly</label>
            </div>
            <div className="flex items-center">
              <input checked="" id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label for="default-radio-2" className="ml-2 text-sm font-medium text-slate-600">Quarterly</label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8"> Subsidiary*</div>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <Dropdown placeholderClassName="w-4/5 h-3/4" options={subsidiaryOptions} onChange={(option)=> setSubsidiary(option.value)} value={subsidiary} placeholder="Select a subsidiary" />
          </div>
        </div>
        <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8"> Your Email</div>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input placeholder="jhon@doe.com" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" /> </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8"> Agreement title*</div>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input placeholder="Just a hint.." className="p-1 px-2 appearance-none outline-none w-full text-gray-800" /> </div>
        </div>
        <div className="w-full mx-2 flex-1">
          <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8"> Your Email</div>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
            <input placeholder="jhon@doe.com" className="p-1 px-2 appearance-none outline-none w-full text-gray-800" /> </div>
        </div>
      </div>
    </div>
  );
}

export default App;
