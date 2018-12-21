/**
 * Description: Dashboard view
 * Date: 12/21/2018
 * Author: Dnaijel
 */

import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// @material-ui/icons
import Check from "@material-ui/icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import salongInformasjonStyle from "assets/jss/material-dashboard-pro-react/views1/salongInformasjonStyle.jsx";

class SalongInformasjon extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card>
        <CardHeader>            
            <div className={classes.cardHeader}>
                <h3 className={classes.cardTitle}>Salong Informasjon</h3>
            </div>
        </CardHeader>
        <CardBody>
            <form>
                <GridContainer>
                    <GridItem sm={12} md={6}>
                        <CustomInput
                            labelText="Salongens navn"
                            id="name"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "text"
                            }}
                        />
                    </GridItem>
                    <GridItem sm={12} md={6}>
                        <CustomInput
                            labelText="Addresse"
                            id="address"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "text"
                            }}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem sm={12} md={6}>
                        <CustomInput
                            labelText="Postnummer"
                            id="post_number"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "text"
                            }}
                        />
                    </GridItem>
                    <GridItem sm={12} md={6}>
                        <CustomInput
                            labelText="By"
                            id="by"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "text"
                            }}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem sm={12} md={6}>
                        <CustomInput
                            labelText="Telefonummer"
                            id="tel_number"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "text"
                            }}
                        />
                    </GridItem>
                    <GridItem sm={12} md={6}>
                        <CustomInput
                            labelText="Epost"
                            id="email"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "email"
                            }}
                        />
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem sm={12} md={6}>
                        <CustomInput
                            labelText="Nettadresse"
                            id="network"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                type: "text"
                            }}
                        />
                    </GridItem>
                    <GridItem sm={6} md={3}>                        
                        <div className={classes.checkboxAndRadio}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        tabIndex={-1}
                                        onClick={() => this.handleToggle(2)}
                                        checkedIcon={<Check className={classes.checkedIcon} />}
                                        icon={<Check className={classes.uncheckedIcon} />}
                                        classes={{
                                        checked: classes.checked,
                                        root: classes.checkRoot
                                        }}
                                    />
                                }
                                classes={{
                                    label: classes.label
                                }}
                                label="Har salongen parkering"
                            />
                        </div>
                    </GridItem>
                    <GridItem sm={6} md={3}>                        
                        <div className={classes.checkboxAndRadio}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        tabIndex={-1}
                                        onClick={() => this.handleToggle(2)}
                                        checkedIcon={<Check className={classes.checkedIcon} />}
                                        icon={<Check className={classes.uncheckedIcon} />}
                                        classes={{
                                        checked: classes.checked,
                                        root: classes.checkRoot
                                        }}
                                    />
                                }
                                classes={{
                                    label: classes.label
                                }}
                                label="Tilganglighetsanpassat"
                            />
                        </div>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem sm={12} md={6}>
                        <CustomInput
                            labelText="Salong beskrivelse"
                            id="about-me"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 10
                            }}
                        />
                    </GridItem>
                </GridContainer>
            </form>
        </CardBody>
      </Card>
    );
  }
}

SalongInformasjon.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(salongInformasjonStyle)(SalongInformasjon);
