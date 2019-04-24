/**
 * Description: Common Style
 * Date: 4/23/2019
 */

const commonStyle = {
  // loading styles
  loading_container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  loading: {
    color: '#7da8ae'
  },

  // text align
  left: {
    textAlign: 'left'
  },
  center: {
    textAlign: 'center'
  },
  right: {
    textAlign: 'right'
  },

  card: {
    minHeight: '65vh',
    margin: '0',
  },
  cardTitle: {
    marginTop: "0",
    color: "#434343",
    fontSize: '24px',
    fontFamily: 'Source Sans Pro',
    fontWeight: '700',
  },
  cardHeader: {
    zIndex: "3",
    marginTop: "15px",
  },
  cardContent: {
    position: "relative",
  },
};
  
export default commonStyle;
  