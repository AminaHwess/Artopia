import React from 'react';
import { useForm, Controller } from "react-hook-form";

const EmailField = (props) => {
  const { control } = props;
  

  return (
    <Controller
      name="email"
      control={control}
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <input
            onChange={onChange}
            value={value}
            required
            id="email"
            type="email"
            name="email"
            placeholder='Type in your email'
            className='w-full px-4 py-3 pr-12 border-2 border-[#9e8b96] rounded-md text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d226aa] focus:border-transparent'
          />
          {/* Displaying helper text/error message */}
          {error? <p style={{ color: 'red',  fontSize: '12px', marginTop: '-10px', marginLeft: '90px' }}>{error.message}</p> : null}

        </>
      )}
    />
  );
};

export default EmailField;
