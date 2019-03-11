import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";
import banner from "assets/img/booking3.jpg";

const pagesStyle = theme => ({
  ...customCheckboxRadioSwitch,
  wrapper: {
    height: "auto",
    minHeight: "100vh",
    position: "relative",
    top: "0",
    // padding: "0 15px",
  },
  banner: {
    width: '100%',
    height: '350px',
    backgroundImage: "url(" + banner + ")",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  },
  container: {
    marginLeft: 'auto',
    paddingLeft: "15px",
    marginRight: 'auto',
    paddingRight: '15px',
  },
  stepperRoot: {
    padding: '24px 0 0',
  },
  stepIcon: {
    width: '1.5em',
    height: '1.5em'
  },
  stepLabel: {
    fontSize: '16px'
  },
  connectorRoot: {
    top: '16px',
    left: 'calc(50% + 25px)',
    right: 'calc(-50% + 25px)',
    position: 'absolute',
  },
  lineHorizontal: {
    borderTopWidth: '3px',
  },
  textRight: {
    textAlign: 'right'
  },
  leftButton: {
    padding: '12px 15px 12px 10px'
  },
  rightButton: {
    padding: '12px 10px 12px 15px'
  },
  mr_0: {
    marginRight: '0',
  },
  pl_30: {
    paddingLeft: '30px',
  },
  contentKey: {
    fontSize: '16px',
    fontWeight: '600'
  },
  title: {
    margin: '0 0 10px',
    textAlign: 'center'
  },

  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  connectorActive: {
    '& $connectorLine': {
      borderColor: theme.palette.secondary.main,
    },
  },
  connectorCompleted: {
    '& $connectorLine': {
      borderColor: theme.palette.primary.main,
    },
  },
  connectorDisabled: {
    '& $connectorLine': {
      borderColor: theme.palette.grey[100],
    },
  },
  connectorLine: {
    transition: theme.transitions.create('border-color'),
  }
});

export default pagesStyle;
