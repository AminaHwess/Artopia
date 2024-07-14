import React from 'react';
import { useForm, Controller } from "react-hook-form";

const UsernameField = (props) => {
  const { control } = props;

  return (
    <Controller
      name="username"
      control={control}
      defaultValue=""
      rules={{ required: 'Username is required' }} // Custom validation message
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <input
            onChange={onChange}
            value={value}
            required
            id="username"
            type="text"
            name="username"
            placeholder='Type in your username'
            className='w-full px-4 py-3 pr-12 border-2 border-[#9e8b96] rounded-md text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d226aa] focus:border-transparent'

          />
          {/* Displaying helper text/error message */}
          {error ? <p style={{ color: 'red', fontSize: '12px', marginTop: '-10px', marginLeft: '90px' }}>{error.message}</p> : null}
        </>
      )}
    />
  );
};

export default UsernameField;
