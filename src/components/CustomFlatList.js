import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const CustomFlatList = ({ data, renderItem, maxToRenderPerBatch, keyExtractor }) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.container}
      maxToRenderPerBatch={maxToRenderPerBatch}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Allows the FlatList to grow and take up available space
  },
});

export default CustomFlatList;
