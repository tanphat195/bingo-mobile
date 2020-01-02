---
to: src/components/<%= level%>/<%= name%>/index.tsx
---
import React from 'react';
import { View } from 'react-native';
import styles from './styles';

interface Props {

}

const <%= h.toPascalCase(name)%>: React.FC<Props> = (props) => {

  return (
    <View style={styles.main}>
    </View>
  );
}

export default <%= h.toPascalCase(name)%>;