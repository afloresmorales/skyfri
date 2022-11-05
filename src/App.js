import './App.css';
import { useCallback, useMemo, useRef, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Formik } from 'formik';
import * as yup from 'yup';
import { Steps } from './components';
import { useRegisterNewAgreementMutation } from './features/api/apiSlice';

const steps = ['Register agreement', 'Add products', 'Add escalations', 'Add services', 'Forecast generation', 'Review'];
const subsidiaryOptions = ['Rooftop', 'Ground Mounted'];
const clientsOptions = ['Norsk Solar', 'Green Production'];
const paymentsOptions = ['0', '7', '14'];
function App() {
  const formRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [
    registerNewAgreement, // This is the mutation trigger
    { isLoading }, // This is the destructured mutation result
  ] = useRegisterNewAgreementMutation();
  const onSubmit = () => {
    formRef?.current?.submitForm();
  };
  const handleFormSubmit = useCallback(
    async (object) => {
      registerNewAgreement(object);
      setIndex((prevValue) => prevValue + 1);
    },
    [registerNewAgreement],
  );

  const validateSchema = useMemo(
    () =>
      yup.object().shape({
        agreement: yup.string().required('Field is required'),
        billing: yup.string().required('Field is required'),
        subsidiary: yup.string().required('Field is required'),
        payment: yup.string().required('Field is required'),
        client: yup.string().required('Field is required'),
      }),
    [],
  );
  return (
    <div className="container mx-auto m-8">
      <div className="p-5">
        <div className="mx-4 p-4">
          <Steps steps={steps} selectedIndex={index}/>
        </div>
      </div>
      <h2 className="font-bold text-gray-600 text-m my-8">{index + 1} {steps[index]}</h2>
    {index === 0 &&  <Formik
        initialValues={{
          agreement: '',
          billing: '',
          subsidiary: '',
          payment: '',
          client: '',
          startDate: new Date(),
          endDate: new Date()
        }}
        innerRef={formRef}
        validateOnChange={false}
        validationSchema={validateSchema}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleChange, values, errors, setFieldValue}) => (
          <>
            <div className="flex flex-col md:flex-row">
              <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8"> Agreement title*</div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                  <input name="agreement" onChange={handleChange} value={values.agreement} className="p-1 px-2 appearance-none outline-none w-full text-gray-800" /> </div>
                <>
                  {errors.agreement && <span className="text-red-600">{errors.agreement}</span>}
                </>
              </div>
              <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8"> Billing frequency*</div>
                <div className="bg-white my-2 flex items-center flex-row ">
                  <div className="flex items-center mr-4">
                    <input onChange={(event) => setFieldValue("billing", event.target.value)} checked={values.billing === 'Monthly'} type="radio" value="Monthly" name="billing" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ml-2 text-sm font-medium text-slate-600">Monthly</label>
                  </div>
                  <div className="flex items-center">
                    <input onChange={(event) => setFieldValue("billing", event.target.value)} checked={values.billing === 'Quarterly'}  value="Quarterly" type="radio" name="billing" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label className="ml-2 text-sm font-medium text-slate-600">Quarterly</label>
                  </div>
                </div>
                <>
                  {errors.billing && <span className="text-red-600">{errors.billing}</span>}
                </>
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8"> Subsidiary*</div>
                <div className="bg-white my-4 p-1 flex">
                  <Dropdown className="w-4/5 h-4" placeholderClassName='h-4' options={subsidiaryOptions}  onChange={({ value }) => setFieldValue("subsidiary", value)} value={values.subsidiary} placeholder="" />
                </div>
                <>
                  {errors.subsidiary && <span className="text-red-600">{errors.subsidiary}</span>}
                </>
              </div>
              <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8"> Payment terms (in calendar days after invoice date)*</div>
                <div className="bg-white my-4 p-1 flex">
                  <Dropdown className='w-1/2' placeholderClassName='h-4' options={paymentsOptions}  onChange={({ value }) => setFieldValue("payment", value)} value={values.payment} placeholder="" />
                </div>
                <>
                  {errors.payment && <span className="text-red-600">{errors.payment}</span>}
                </>
              </div>
            </div>
            <div className="flex flex-col md:flex-row">
          <div className="w-full mx-2 flex-1">
            <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8"> Client*</div>
            <div className="bg-white my-4 p-1 flex">
              <Dropdown className="w-4/5 h-4" placeholderClassName='h-4' options={clientsOptions}  onChange={({ value }) => setFieldValue("client", value)} value={values.client} placeholder="" />
            </div>
              <>
                  {errors.client && <span className="text-red-600">{errors.client}</span>}
                </>
          </div>
          <div className="w-full mx-2 flex-1">
            <div className="bg-white my-4 p-1 flex">
              <div className="mr-10">
                <div className="font-bold text-gray-600 text-xs leading-8"> Start date*</div>
                <div className="bg-white my-2 p-1 border border-gray-200 rounded">
                  <DatePicker selected={values.startDate} onChange={(date) => setFieldValue("startDate", date)} />
                </div>
              </div>
              <div>
                <div className="font-bold text-gray-600 text-xs leading-8"> End date*</div>
                <div className="bg-white my-2 p-1 border border-gray-200 rounded">
                  <DatePicker selected={values.endDate} onChange={(date) => setFieldValue("endDate", date)} />
                </div>
              </div>
            </div>
          </div>
        </div>
          </>
        )}
      </Formik>}
      <div className='mt-20 flex-row'>
        <button type="button" onClick={onSubmit} className="inline-block mr-5 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Next</button>
        <a onClick={()=>alert('Cancel!')}>Cancel</a>
      </div>
    </div>
  );
}

export default App;
