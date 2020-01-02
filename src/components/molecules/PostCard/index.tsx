import React, { useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import moment from 'moment';
import styles from './styles';

interface Post {
  id: string,
  title: string,
  description: string,
  photo: string,
  created_at: string,
  creator: string,
}

interface Props extends TouchableOpacityProps {
  navigation: NavigationStackProp
  post: Post
}

const PostCard: React.FC<Props> = (props) => {
  const goToPostDetail = useCallback(() => {
    props.navigation.push('PostDetail', { post: props.post })
  }, [props.post]);

  return (
    <TouchableOpacity style={[styles.main, props.style]} onPress={goToPostDetail}>
      <View style={styles.left}>
        <Text style={styles.title}>{props.post.title}</Text>
        <Text style={styles.created_at}>{moment(props.post.created_at).fromNow()}</Text>
      </View>
      <View style={styles.right}>
        <Image style={styles.photo} source={{uri: props.post.photo}}/>
      </View>
    </TouchableOpacity>
  );
}

export default PostCard;