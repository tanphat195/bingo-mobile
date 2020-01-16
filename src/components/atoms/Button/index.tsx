import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styles from './styles';
import { primary, secondary } from '../../../../src/styles/color';

type Type = 'default' | 'primary' | 'secondary';

interface IProps extends TouchableOpacityProps {
  type?: Type;
  width?: number;
}

const ButtonCustom: React.FC<IProps> = props => {
  const [isPressIn, setIsPressIn] = useState(false);
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
          color: '#FFFFFF',
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
            color: '#FFFFFF',
          },
        };
        break;
      }
    }
  }

  const onPressIn = () => {
    setIsPressIn(true);
  };

  const onPressOut = () => {
    setIsPressIn(false);
  };

  return (
    <View style={[styles.container, { width: props.width }]}>
      <TouchableOpacity
        {...props}
        style={[styles.main, theme.main, props.style, isPressIn && styles.pressIn]}
        onPress={props.onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        activeOpacity={1}
      >
        {typeof props.children === 'string' ? (
          <Text style={[styles.text, theme.text]}>{props.children}</Text>
        ) : (
          props.children
        )}
      </TouchableOpacity>
      <View style={styles.press} />
    </View>
  );
};

export default ButtonCustom;
