import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../types/navigation';

/**
 * FlatListDetailsScreenRouteProp - type for route object
 *
 * Defines what type of parameters this screen expects:
 * - item: product object containing id, title, price, description, images
 *
 * RouteProp is React Navigation's type that ensures type safety
 * when using navigation parameters
 */
type FlatListDetailsScreenRouteProp = RouteProp<RootStackParamList, 'FlatListDetailsScreen'>;

/**
 * Props interface - defines component input parameters
 *
 * route: contains navigation parameters, including product data (item)
 * Route object is passed automatically by React Navigation
 */
interface Props {
  route: FlatListDetailsScreenRouteProp;
}

/**
 * FlatListDetailsScreen - component for displaying single product detail view
 *
 * This component:
 * - Receives product data from navigation route parameters
 * - Displays complete product info: image, name, price and description
 * - Uses ScrollView so long content is scrollable
 * - Shows description only if it exists (conditional rendering)
 *
 * Parameters:
 * - route: navigation route object containing params.item (product data)
 *
 * Usage example:
 * Navigation from FlatListScreen:
 * navigation.navigate("FlatListDetailsScreen", { item: selectedProduct })
 */
const FlatListDetailsScreen: React.FC<Props> = ({ route }) => {
  // Extracts product data from route parameters
  // Destructuring: takes item from route.params object
  const { item } = route.params;

  /**
   * Main view:
   * - ScrollView allows content to scroll if longer than screen
   * - card View gives card appearance (background color, shadow, padding)
   * - Image displays product's first image
   * - resizeMode="cover" ensures image covers entire area while maintaining proportions
   * - title, price and description are displayed below Image
   * - Conditional rendering: description is shown only if it exists
   */
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{ uri: item.images[0] }}
          resizeMode="cover"
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>Price: ${item.price}</Text>
        {item.description && (
          <Text style={styles.description}>{item.description}</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  price: {
    fontSize: 20,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

export default FlatListDetailsScreen;
