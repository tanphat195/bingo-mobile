import React, { useState } from 'react';
import { View, Animated, Text, TouchableOpacity, TouchableOpacityProperties } from 'react-native';
import { primary } from '../../../../src/styles/color';
import styles from './styles';

interface Props extends TouchableOpacityProperties {
  checkedText?: string;
  uncheckedText?: string;
  label?: string;
  value?: boolean;
  onChange: (value: boolean) => void;
}

const Switch: React.FC<Props> = props => {
  const [value, changeValue] = useState(props.value || false);
  const onPress = () => {
    const new_value = !value;
    props.onChange(new_value);
    changeValue(new_value);
  };

  return (
    <View>
      {props.label && <Text style={styles.labelText}>{props.label}</Text>}
      <TouchableOpacity
        style={[styles.main, value ? styles.checked : styles.unchecked]}
        onPress={onPress}
      >
        <View style={[styles.text, { flexDirection: value ? 'row' : 'row-reverse' }]}>
          {value ? (
            <Text style={styles.checkedText}>{props.checkedText}</Text>
          ) : (
            <Text style={styles.uncheckedText}>{props.uncheckedText}</Text>
          )}
        </View>
        <FadeInView value={value} />
      </TouchableOpacity>
    </View>
  );
};

interface AnimatedProps {
  value: boolean;
}

const FadeInView: React.FC<AnimatedProps> = props => {
  const [fadeAnim] = useState(new Animated.Value(2));

  React.useEffect(() => {
    if (props.value) {
      Animated.timing(fadeAnim, {
        toValue: 66,
        duration: 200,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 2,
        duration: 200,
      }).start();
    }
  }, [props.value]);

  return (
    <Animated.View
      style={[
        styles.pointer,
        {
          backgroundColor: props.value ? '#fff' : primary,
          left: fadeAnim,
        },
      ]}
    >
      {props.children}
    </Animated.View>
  );
};

export default Switch;
