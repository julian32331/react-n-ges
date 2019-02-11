import React from "react";

// core components
import Wizard from "components/Wizard/Wizard.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import Step1 from "./Steps/Step1.jsx";
import Step2 from "./Steps/Step2.jsx";
import Step3 from "./Steps/Step3.jsx";

class Booking extends React.Component {
  render() {
    return (
      <GridContainer justify="center">
        <GridItem xs={12} sm={8}>
          <Wizard
            // validate
            steps={[
              { stepName: "Salon", stepComponent: Step1, stepId: "salon" },
              { stepName: "Services", stepComponent: Step2, stepId: "services" },
              { stepName: "Date/Time", stepComponent: Step3, stepId: "date-time" }
            ]}
            title="Booking"
            subtitle="Please complete all steps"
          />
        </GridItem>
      </GridContainer>
    );
  }
}

export default Booking;
