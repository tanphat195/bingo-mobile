import React, { useRef, useImperativeHandle, forwardRef, RefForwardingComponent, PropsWithChildren } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

export interface ImperativeScrollViewHandles {
  scrollToStart(option?: { animated: boolean }): void;
  scrollToEnd(option?: { animated: boolean }): void;
  scrollTo(option?: { x?: number; y?: number; animated: boolean }): void;
}

const ImperativeScrollView: RefForwardingComponent<ImperativeScrollViewHandles, PropsWithChildren<ScrollViewProps>> = (
  props,
  ref,
) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useImperativeHandle(ref, () => ({
    scrollToStart: options => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: 0,
          y: 0,
          animated: options ? options.animated : true,
        });
      }
    },
    scrollToEnd: options => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd(options);
      }
    },
    scrollTo: options => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo(options);
      }
    },
  }));

  return <ScrollView ref={scrollViewRef} {...props} />;
};

export default forwardRef(ImperativeScrollView);
