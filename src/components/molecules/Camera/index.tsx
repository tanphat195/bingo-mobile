import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert, StatusBar, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';

interface Props {
  getFile: (file: any) => void;
}

const CameraComponent: React.FC<Props> = (props, ref) => {
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [visible, setVisible] = useState(false);
  const [photo, setPhoto] = useState('');

  useImperativeHandle(ref, () => ({
    openCamera,
    closeCamera,
    takeCamera: onTakePictureAsync,
  }));

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    setHasCameraPermission(status === 'granted');
  }

  const onFlip = () => {
    setType(type === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    );
  };

  const openCamera = () => {
    setVisible(true);
    StatusBar.setBarStyle('light-content');
    StatusBar.setHidden(true);
  };

  const closeCamera = () => {
    setVisible(false);
    StatusBar.setBarStyle('default');
    StatusBar.setHidden(false);
  };

  const onTakePictureAsync = async () => {
    if (cameraRef) {
      let file = await cameraRef.current.takePictureAsync({base64: true, quality: 0.5});
      setPhoto(`data:image/jpg;base64,${file.base64}`);
    }
  };

  const recordAsync = async () => {
    if (cameraRef) {
      let photo = await cameraRef.current.recordAsync({quality : '1080p'});
      console.log(photo);
      return photo;
    }
  };

  const stopRecording = async () => {
    if (cameraRef) {
      let photo = await cameraRef.current.stopRecording();
      console.log(photo);
      return photo;
    }
  };

  const onOk = () => {
    props.getFile(photo);
    setPhoto('');
    closeCamera();
  };

  const onCancel = () => {
    setPhoto('');
  };

  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return (
      <View>
        <Text>No access to camera</Text>
      </View>
    );
  } else {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        {photo ? (
          <RenderPhoto photo={photo} onOk={onOk} onCancel={onCancel} />
        ) : (
          <Camera
            ref={cameraRef}
            style={styles.camera} type={type}
          >
            <View style={styles.main}>
              <View style={styles.close}>
                <TouchableOpacity style={{ padding: 4 }} onPress={closeCamera}>
                  <EvilIcons size={28} color='#FFF' name='close' />
                </TouchableOpacity>
              </View>

              <View style={styles.bottom}>
                <TouchableOpacity
                  style={styles.flip}
                  onPress={onFlip}
                >
                  <Ionicons size={28} color='#FFF' name='ios-swap' />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.flip}
                  onPress={onTakePictureAsync}
                >
                  <Ionicons size={40} color='red' name='ios-radio-button-on' />
                </TouchableOpacity>

                {true ? (
                  <TouchableOpacity
                    style={styles.flip}
                    onPress={recordAsync}
                  >
                    <Feather size={28} color='#FFF' name='camera' />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.flip}
                    onPress={stopRecording}
                  >
                    <Feather size={28} color='#FFF' name='camera-off' />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Camera>
        )}
      </Modal>
    );
  }
};

interface PhotoProps {
  photo: string;
  onOk: () => void;
  onCancel: () => void;
};

const RenderPhoto: React.FC<PhotoProps> = (props) => {
  const { photo, onOk, onCancel } = props;

  return (
    <View style={styles.photoContainer}>
      <Image style={styles.photo} source={{uri: photo}} />
      <View style={styles.actionGroup}>
        <TouchableOpacity
          style={styles.action}
          onPress={onOk}
        >
          <Text style={styles.text}>OK</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.action}
          onPress={onCancel}
        >
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default forwardRef(CameraComponent);