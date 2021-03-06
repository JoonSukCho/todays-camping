import { createStyles } from '@material-ui/styles';
import { container, title } from 'public/jss/material-kit-react.js';
import customCheckboxRadioSwitch from 'public/jss/material-kit-react/customCheckboxRadioSwitch.js';

const basicsStyle = () =>
  createStyles({
    sections: {
      padding: '70px 0',
      backgroundColor: '#f5f6fa',
    },
    container,
    title: {
      ...title,
      marginTop: '30px',
      minHeight: '32px',
      textDecoration: 'none',
    },
    space50: {
      height: '50px',
      display: 'block',
    },
    space70: {
      height: '70px',
      display: 'block',
    },
    icons: {
      width: '17px',
      height: '17px',
      color: '#FFFFFF',
    },
    ...customCheckboxRadioSwitch,
  });

export default basicsStyle;
