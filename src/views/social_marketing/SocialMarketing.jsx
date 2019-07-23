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
import CircularProgress from '@material-ui/core/CircularProgress';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    EmailShareButton,
  } from 'react-share';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import socialMarketingStyle from "assets/jss/material-dashboard-pro-react/views/social_marketing/socialMarketingStyle";

import * as Utils from 'utils/api';
import marketing from "assets/img/marketing-1.jpg";

class SocialMarketing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        this.props.getUser().then(() => {
            this.props.getSocialData({workingForId: this.props.workingForId})
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log('data: ', nextProps.data);
    }

    render() {
        const { classes, loading, data } = this.props;
        return (
            <div>
                {
                    loading &&
                        <div className={classes.loading_container}>
                            <CircularProgress className={classes.progress} classes={{colorPrimary: classes.loading}} />
                        </div>
                }
                <GridContainer>
                {
                    data.length > 0 &&
                        data.map((item, key) => {
                            return (
                                <GridItem xs={12} sm={12} md={3} key={key}>
                                    <Card product>
                                        <CardHeader image>
                                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                                {
                                                    item.image !== ""? (
                                                        <img src={item.image} alt="..." />
                                                    ) : (
                                                        <img src={marketing} alt="..." />
                                                    )
                                                }
                                            </a>
                                        </CardHeader>
                                        <CardBody>
                                            <h4 className={classes.cardProductTitle}>
                                                <a href="#pablo" onClick={e => e.preventDefault()}>
                                                    {item.title}
                                            </a>
                                            </h4>
                                            <p className={classes.cardProductDesciprion}>
                                                {item.description}
                                        </p>
                                        </CardBody>
                                        <CardFooter product>
                                            <CopyToClipboard text={item.shareUrl}
                                                onCopy={() => this.setState({copied: true})}>
                                                <Button justIcon color="github" simple>
                                                    <i
                                                        className={
                                                            classes.socialButtonsIcons + " fa fa-share-alt"
                                                        }
                                                    />
                                                </Button>
                                            </CopyToClipboard>
                                            <div className={classes.stats}>
                                                <FacebookShareButton
                                                    url={item.shareUrl}
                                                    quote={item.title}
                                                    className={classes.social_button}>                                                        
                                                        <Button justIcon color="facebook" simple>
                                                            <i
                                                                className={
                                                                    classes.socialButtonsIcons + " fab fa-facebook-square"
                                                                }
                                                            />
                                                        </Button>
                                                </FacebookShareButton>
                                                <EmailShareButton
                                                    url={item.shareUrl}
                                                    quote={item.title}
                                                    className={classes.social_button}>
                                                    <Button justIcon color="google" simple>
                                                        <i
                                                            className={
                                                                classes.socialButtonsIcons + " fab fa-google"
                                                            }
                                                        />
                                                    </Button>
                                                </EmailShareButton>                                                
                                                <TwitterShareButton
                                                    url={item.shareUrl}
                                                    quote={item.title}
                                                    className={classes.social_button}>
                                                    <Button justIcon color="twitter" simple>
                                                        <i
                                                            className={
                                                                classes.socialButtonsIcons + " fab fa-twitter"
                                                            }
                                                        />
                                                    </Button>
                                                </TwitterShareButton>                                                  
                                                <LinkedinShareButton
                                                    url={item.shareUrl}
                                                    windowWidth={750}
                                                    windowHeight={600}
                                                    className={classes.social_button}>
                                                    <Button justIcon color="linkedin" simple>
                                                        <i
                                                            className={
                                                                classes.socialButtonsIcons + " fab fa-linkedin"
                                                            }
                                                        />
                                                    </Button>
                                                </LinkedinShareButton>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </GridItem>
                            )
                        })
                    }
                    
                    {
                        !loading && data.length === 0 &&
                            <h4 style={{textAlign: 'center'}}>No Services</h4>                           
                    } 
                </GridContainer>
            </div>
        );
    }
}

SocialMarketing.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        workingForId: state.auth.workingForId,
        loading: state.social_marketing.loading,
        data: state.social_marketing.data,
        error: state.social_marketing.error
    };
  }
  
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUser             : Actions.getUser,
        getSocialData       : Actions.getSocialData
    }, dispatch);
}

export default withStyles(socialMarketingStyle)(connect(mapStateToProps, mapDispatchToProps)(SocialMarketing));
