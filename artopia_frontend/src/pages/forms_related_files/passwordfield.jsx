import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

const PasswordField = ({ control }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Controller
      name="password"
      control={control}
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="relative">
          <input
            required
            id="password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            placeholder="Password"
            className="w-full px-4 py-3 pr-12 border-2 border-[#9e8b96] rounded-md text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d226aa] focus:border-transparent"
          />
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
            className="absolute bottom-11 left-20"
            style={{ right: "0", transform: "translateX(720%)" }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>


        </div>
      )}
    />
  );
};

export default PasswordField;
