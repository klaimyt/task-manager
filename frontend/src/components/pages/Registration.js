import React from "react";
import Card from '../Card'
import TextForm from '../TextForm'

const Registration = () => {
  return (
    <Card>
      <form>
        <TextForm inputId="username" inputType="text" labelText="Username:" />
        <TextForm
          inputId="password"
          inputType="password"
          labelText="Password:"
        />
        <button className="btn-long mr-h-3">SIGN IN</button>
      </form>
    </Card>
  );
};

export default Registration;
