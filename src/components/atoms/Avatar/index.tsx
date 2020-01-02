import React from 'react';
import { View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import styles from '../Button/styles';

interface Props {
  source: ImageSourcePropType;
  size?: number;
  border?: {
    width: number;
    color: string;
  };
}

const Avatar: React.FC<Props> = props => {
  const size = props.size || 48;
  const width = size + (props.border ? props.border.width : 0);

  return (
    <TouchableOpacity style={{ width: size, height: size }}>
      <View
        style={[
          styles.border,
          {
            width,
            height: width,
            backgroundColor: props.border ? props.border.color : '#FFFFFF',
            borderRadius: props.size / 2 || 24,
          },
        ]}
      >
        <Image
          style={{
            borderRadius: props.size / 2 || 24,
            width: size,
            height: size,
          }}
          source={props.source}
        />
      </View>
    </TouchableOpacity>
  );
};

export default Avatar;
