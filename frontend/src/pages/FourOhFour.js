import React from "react";
import Error from "../components/ui/Error";

const FourOhFour = () => {
  return (
    <div>
      <Error
        emoji="😔"
        title="404"
        secondaryTitle="Oooops..."
        text="The page you are looking for does not exist. But you can go back to the homepage."
      />
    </div>
  );
};

export default FourOhFour;
