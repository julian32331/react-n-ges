/**
 * Description: Stepper component style
 * Date: 3/30/2019
 */

const stepperStyle = theme => ({
    root: {
      display: 'flex',
      height: '48px',
      marginBottom: '8px',
      cursor: 'pointer'
    },
    container: {
        display: 'flex',
        position: 'relative',
        backgroundColor: '#cfd9c9',
        '&:before': {
          position: 'absolute',
          content: '""', 
          borderTop: '24px solid transparent',
          borderBottom: '24px solid transparent',      
          borderLeft: '12px solid #F4F4F4'
        },
        '&:after': {
          position: 'absolute',
          content: '""', 
          borderTop: '24px solid transparent',
          borderBottom: '24px solid transparent',      
          borderLeft: '12px solid #cfd9c9',
          right: '-12px'
        }
    },
    active_1: {
        backgroundColor: '#80a0ab !important',
        transition: '1000ms',
        '&:after': {     
          transition: '1000ms',
          borderLeft: '12px solid #80a0ab !important'
        },
    },
    active_2: {
        backgroundColor: '#D1B65C !important',
        transition: '1000ms',
        '&:after': {     
          transition: '1000ms',
          borderLeft: '12px solid #D1B65C !important'
        },
    },
    active_3: {
        backgroundColor: '#B3946F !important',
        transition: '1000ms',
        '&:after': {     
          transition: '1000ms',
          borderLeft: '12px solid #B3946F !important'
        },
    },
    active_4: {
        backgroundColor: '#88A177 !important',
        transition: '1000ms',
        '&:after': {     
          transition: '1000ms',
          borderLeft: '12px solid #88A177 !important'
        },
    },
    number_container: {
        width: '25%',
        zIndex: 999,
    },
    number: {
        width: '100%',
        padding: '0 50%',
        lineHeight: '48px',
        fontSize: '2em',
        color: '#fff',
        fontFamily: "Source Sans Pro",
        fontWeight: 700
    },
    title_container: {
        width: 'calc(75% - 20px)',
        marginLeft: '8px'
    },
    title: {
        width: '100%',
        padding: '0 8px 0 20px',
    },
    header: {
      fontSize: '20px',
      fontWeight: '600',
      paddingTop: '5px',
      color: '#fff',
      fontFamily: "Source Sans Pro",
      fontWeight: 700,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },
    sub_header: {
      color: '#fff',
      fontFamily: "Source Sans Pro",
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    }
  });
  
  export default stepperStyle;
  