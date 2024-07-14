import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';

const PasswordField1 = ({ control }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const iconButtonStyle = {
    position: 'absolute',
    marginLeft: '-50px'
  };

  return (
    
      <Controller
        name="password1"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
              <input
                id="password1"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => onChange(e.target.value)}
                value={value}
                placeholder="Password"
                className="password-input w-full px-4 py-3 pr-12 border-2 border-[#9e8b96] rounded-md text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d226aa] focus:border-transparent"
              />
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                className="visibility-icon"
                style={iconButtonStyle}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            {error && <FormHelperText error>{error.message}</FormHelperText>}
          </>
        )}
      />
  );
};

export default PasswordField1;
