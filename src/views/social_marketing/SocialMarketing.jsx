/**
 * Description: Social Marketing Page
 * Date: 7/5/2019
 */

import React from "react";
import PropTypes from "prop-types";

import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import connect from 'react-redux/es/connect/connect';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import socialMarketingStyle from "assets/jss/material-dashboard-pro-react/views/social_marketing/socialMarketingStyle";

import marketing from "assets/img/marketing-1.jpg";

class SocialMarketing extends React.Component {

    componentWillMount() {
        this.props.getUser();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                        <Card product>
                            <CardHeader image>
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                    <img src={marketing} alt="..." />
                                </a>
                            </CardHeader>
                            <CardBody>
                                <h4 className={classes.cardProductTitle}>
                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                        Marketing 1
                                </a>
                                </h4>
                                <p className={classes.cardProductDesciprion}>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                    Aenean commodo ligula eget dolor. Aenean massa.
                                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                    Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                                    Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
                                    imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
                            </p>
                            </CardBody>
                            <CardFooter product>
                                <Button justIcon color="github" simple>
                                    <i
                                        className={
                                            classes.socialButtonsIcons + " fa fa-share-alt"
                                        }
                                    />
                                </Button>
                                <div className={classes.stats}>
                                    <Button justIcon color="facebook" simple>
                                        <i
                                            className={
                                                classes.socialButtonsIcons + " fab fa-facebook-square"
                                            }
                                        />
                                    </Button>
                                    <Button justIcon color="google" simple>
                                        <i
                                            className={
                                                classes.socialButtonsIcons + " fab fa-google"
                                            }
                                        />
                                    </Button>
                                    <Button justIcon color="twitter" simple>
                                        <i
                                            className={
                                                classes.socialButtonsIcons + " fab fa-twitter"
                                            }
                                        />
                                    </Button>
                                    <Button justIcon color="linkedin" simple>
                                        <i
                                            className={
                                                classes.socialButtonsIcons + " fab fa-linkedin"
                                            }
                                        />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <Card product>
                            <CardHeader image>
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                    <img src={marketing} alt="..." />
                                </a>
                            </CardHeader>
                            <CardBody>
                                <h4 className={classes.cardProductTitle}>
                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                        Marketing 2
                                </a>
                                </h4>
                                <p className={classes.cardProductDesciprion}>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                    Aenean commodo ligula eget dolor. Aenean massa.
                                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                    Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                                    Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
                                    imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
                            </p>
                            </CardBody>
                            <CardFooter product>
                                <Button justIcon color="github" simple>
                                    <i
                                        className={
                                            classes.socialButtonsIcons + " fa fa-share-alt"
                                        }
                                    />
                                </Button>
                                <div className={classes.stats}>
                                    <Button justIcon color="facebook" simple>
                                        <i
                                            className={
                                                classes.socialButtonsIcons + " fab fa-facebook-square"
                                            }
                                        />
                                    </Button>
                                    <Button justIcon color="google" simple>
                                        <i
                                            className={
                                                classes.socialButtonsIcons + " fab fa-google"
                                            }
                                        />
                                    </Button>
                                    <Button justIcon color="twitter" simple>
                                        <i
                                            className={
                                                classes.socialButtonsIcons + " fab fa-twitter"
                                            }
                                        />
                                    </Button>
                                    <Button justIcon color="linkedin" simple>
                                        <i
                                            className={
                                                classes.socialButtonsIcons + " fab fa-linkedin"
                                            }
                                        />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <Card product>
                            <CardHeader image>
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                    <img src={marketing} alt="..." />
                                </a>
                            </CardHeader>
                            <CardBody>
                                <h4 className={classes.cardProductTitle}>
                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                        Marketing 3
                                </a>
                                </h4>
                                <p className={classes.cardProductDesciprion}>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                    Aenean commodo ligula eget dolor. Aenean massa.
                                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                    Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                                    Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
                                    imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
                            </p>
                            </CardBody>
                            <CardFooter product>
                                <Button justIcon color="github" simple>
                                    <i
                                        className={
                                            classes.socialButtonsIcons + " fa fa-share-alt"
                                        }
                                    />
                                </Button>
                                <div className={classes.stats}>
                                    <Button justIcon color="facebook" simple>
                                        <i
                                            className={
                                                classes.socialButtonsIcons + " fab fa-facebook-square"
                                            }
                                        />
                                    </Button>
                                    <Button justIcon color="google" simple>
                                        <i
                                            className={
                                                classes.socialButtonsIcons + " fab fa-google"
                                            }
                                        />
                                    </Button>
                                    <Button justIcon color="twitter" simple>
                                        <i
                                            className={
                                                classes.socialButtonsIcons + " fab fa-twitter"
                                            }
                                        />
                                    </Button>
                                    <Button justIcon color="linkedin" simple>
                                        <i
                                            className={
                                                classes.socialButtonsIcons + " fab fa-linkedin"
                                            }
                                        />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <Card product>
                            <CardHeader image>
                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                    <img src={marketing} alt="..." />
                                </a>
                            </CardHeader>
                            <CardBody>
                                <h4 className={classes.cardProductTitle}>
                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                        Marketing 4
                                </a>
                                </h4>
                                <p className={classes.cardProductDesciprion}>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                    Aenean commodo ligula eget dolor. Aenean massa.
                                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                    Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
                                    Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
                                    imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
                            </p>
                            </CardBody>
                            <CardFooter product>
                                <Button justIcon color="github" simple>
                                    <i
                                        className={
                                            classes.socialButtonsIcons + " fa fa-share-alt"
                                        }
                                    />
                                </Button>
                                <div className={classes.stats}>
                                    <Button justIcon color="facebook" simple>
                                        <i
                                            className={
                                                classes.socialButtonsIcons + " fab fa-facebook-square"
                                            }
                                        />
                                    </Button>
                                    <Button justIcon color="google" simple>
                                        <i
                                            className={
                                                classes.socialButtonsIcons + " fab fa-google"
                                            }
                                        />
                                    </Button>
                                    <Button justIcon color="twitter" simple>
                                        <i
                                            className={
                                                classes.socialButtonsIcons + " fab fa-twitter"
                                            }
                                        />
                                    </Button>
                                    <Button justIcon color="linkedin" simple>
                                        <i
                                            className={
                                                classes.socialButtonsIcons + " fab fa-linkedin"
                                            }
                                        />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

SocialMarketing.propTypes = {
  classes: PropTypes.object.isRequired
};
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUser             : Actions.getUser
    }, dispatch);
}

export default withStyles(socialMarketingStyle)(connect(null, mapDispatchToProps)(SocialMarketing));
