---
to: src/screens/<%= name%>/index.tsx
---
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { NavigationStackProp, NavigationStackScreenProps, NavigationStackScreenComponent } from 'react-navigation-stack';
import styles from './styles';

interface IProps extends NavigationStackScreenProps {
  navigation: NavigationStackProp;
}

const <%= name%>: NavigationStackScreenComponent<IProps> = (props) => {

  return (
    <View style={styles.main}>
      <Text>This is <%= name%></Text>
    </View>
  );
}

<%= name%>.navigationOptions = () => ({
  headerShown: true,
});

export default <%= name%>;