import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, StyleSheetProperties } from 'react-native';
import styles from './styles';
import { primary, secondary } from 'src/styles/color';

type Type = 'default' | 'primary' | 'secondary';

interface Props extends TouchableOpacityProps {
  type?: Type;
}

const ButtonCustom: React.FC<Props> = props => {
  let theme = {
    main: {},
    text: {},
  };

  switch (props.type) {
    case 'default': {
      theme = {
        main: {
          borderWidth: 1,
          borderColor: primary,
        },
        text: {
          color: primary,
        },
      };
      break;
    }
    case 'primary': {
      theme = {
        main: {
          backgroundColor: primary,
        },
        text: {
          color: '#FFFFFF',
        },
      };
      break;
    }
    case 'secondary': {
      theme = {
        main: {
          backgroundColor: secondary,
        },
        text: {
          color: '#FFFFFF',
        },
      };
      break;
    }
    default: {
      {
        theme = {
          main: {
            borderWidth: 1,
            borderColor: primary,
          },
          text: {
            color: primary,
          },
        };
        break;
      }
    }
  }
  return (
    <TouchableOpacity {...props} style={[styles.main, theme.main, props.style]} onPress={props.onPress}>
      <Text style={[styles.text, theme.text]}>{props.children}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;
