import { createStyles } from '@material-ui/styles';
import { container, primaryColor } from 'public/jss/material-kit-react.js';

const footerStyle = () =>
  createStyles({
    block: {
      color: 'inherit',
      padding: '0.9375rem',
      fontWeight: '500',
      fontSize: '12px',
      textTransform: 'uppercase',
      borderRadius: '3px',
      textDecoration: 'none',
      position: 'relative',
      display: 'block',
    },
    left: {
      float: 'left!important',
      display: 'block',
    },
    right: {
      padding: '15px 0',
      margin: '0',
      float: 'right!important',
      fontSize: '14px',
      fontWeight: '400',
      color: '#333',
      opacity: '0.8',
    },
    footer: {
      padding: '0.9375rem 0',
      textAlign: 'center',
      display: 'flex',
      zIndex: '2',
      position: 'relative',
      backgroundColor: '#ebebeb',
      borderTop: '1px solid #b3b3b3',
    },
    a: {
      color: primaryColor,
      textDecoration: 'none',
      backgroundColor: 'transparent',
    },
    footerWhiteFont: {
      '&,&:hover,&:focus': {
        color: '#FFFFFF',
      },
    },
    container,
    list: {
      marginBottom: '0',
      padding: '0',
      marginTop: '0',
    },
    inlineBlock: {
      display: 'inline-block',
      padding: '0px 4px',
      width: 'auto',
    },
    icon: {
      width: '18px',
      height: '18px',
      position: 'relative',
      top: '3px',
    },
    linkButton: {
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: 12,
      padding: '0.9375rem',
    },
  });
export default footerStyle;
