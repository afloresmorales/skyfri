import React from 'react';

function Steps({
    steps,
    selectedIndex = 0
}) {
    return (
        <div class="flex items-center">
            {
                steps.map((step, index) => (
                    <React.Fragment key={index}>
                        <div class="flex items-center relative text-center">
                            <div class={`rounded-full transition duration-500 text-white ease-in-out h-12 w-12 py-3 border-2 ${selectedIndex === index ? 'bg-blue-600' : 'bg-slate-400 '}`}>
                                {index + 1}
                            </div>
                            <div class={`absolute top-0 -ml-10 text-center text-slate-400 mt-16 w-32 text-xs font-medium uppercase ${selectedIndex === index ? 'text-slate-900' : 'text-gray-200'}`}>{step}</div>
                        </div>
                        {index < steps.length-1 && <div class="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-200"></div>}
                    </React.Fragment>
                ))
            }
        </div>
    )
}
export default Steps;