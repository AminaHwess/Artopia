import React from 'react';
import { Controller } from "react-hook-form";

const UsermailField = (props) => {
  const { control } = props;

  return (
    <Controller
      name="username"
      control={control}
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <input
            onChange={onChange}
            value={value}
            required
            id="username"
            type="text"
            name="username"
            placeholder='Type in your email or username.'
            className="w-full px-4 py-3 border-2 border-[#9e8b96] rounded-md text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d226aa] focus:border-transparent"
          />  
        </>
      )}
    />
  );
};

export default UsermailField;
