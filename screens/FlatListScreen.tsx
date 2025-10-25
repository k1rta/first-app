import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../types/navigation";
import type { Product } from "../types/product";

/**
 * Navigation type - defines which screen and with what parameters can be navigated to
 * Uses RootStackParamList and sets FlatListDetailsScreen as the target
 */
type FlatListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FlatListDetailsScreen'
>;

/**
 * FlatListScreen - main component for displaying products list
 *
 * This component:
 * - Loads products list from external API (escuelajs.co)
 * - Displays products in a scrollable list (FlatList)
 * - Allows navigation to detail view when product is tapped
 * - Shows ActivityIndicator during loading
 * - Enables pull-to-refresh functionality
 */
const FlatListScreen: React.FC = () => {
  // State hook for storing products array
  const [products, setProducts] = useState<Product[]>([]);

  // State hook for tracking loading state
  const [loading, setLoading] = useState<boolean>(true);

  // Navigation hook that enables navigation to other screens
  const navigation = useNavigation<FlatListScreenNavigationProp>();

  /**
   * useEffect hook - runs when component mounts
   * Due to empty dependency array [], it runs only once
   * Initiates loading products from API
   */
  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * fetchProducts - async function for loading products from API
   *
   * Actions:
   * 1. Makes HTTP GET request to escuelajs API
   * 2. Checks if response was successful (response.ok)
   * 3. Parses JSON response and saves products to state
   * 4. Handles errors with try-catch block
   * 5. Finally sets loading state to false
   *
   * On error:
   * - Logs error to console
   * - Shows Alert message to user
   */
  const fetchProducts = async (): Promise<void> => {
    try {
      // Using DummyJSON API - more reliable for testing
      const response = await fetch("https://dummyjson.com/products?limit=20");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      // DummyJSON returns { products: [...] }, so we need to extract the products array
      const data: Product[] = json.products.map((item: any) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        images: [item.thumbnail], // DummyJSON uses 'thumbnail' for main image
        description: item.description
      }));
      console.log("Fetched products:", data.length); // Debug log
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  /**
   * ProductCard - subcomponent for displaying a single product card
   *
   * Props:
   * - item: Product object containing product data
   *
   * Displays:
   * - Product's first image (item.images[0])
   * - Product title (max 2 lines due to numberOfLines={2})
   * - Product price in format "Price: $XX"
   *
   * onError handler logs warning if image loading fails
   */
  const ProductCard: React.FC<{ item: Product }> = ({ item }) => (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={{ uri: item.images[0] }}
        onError={() => console.warn(`Failed to load image: ${item.images[0]}`)}
      />
      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.price}>Price: ${item.price}</Text>
    </View>
  );

  /**
   * renderProduct - render function for FlatList
   *
   * Parameters:
   * - item: one product from the array to be displayed
   *
   * Function:
   * - Wraps ProductCard component in TouchableOpacity component
   * - TouchableOpacity makes card clickable and adds visual feedback
   * - activeOpacity={0.7} sets opacity during click (70%)
   * - onPress triggers navigation to detail view, passing product data as parameter
   *
   * This is the required function for FlatList's renderItem prop
   */
  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => navigation.getParent()?.navigate("FlatListDetailsScreen", { item })}
      activeOpacity={0.7}
    >
      <ProductCard item={item} />
    </TouchableOpacity>
  );

  /**
   * Loading UI - displayed when loading === true
   *
   * Shows:
   * - ActivityIndicator (spinner) - large, blue (#007AFF)
   * - Text "Loading products..."
   *
   * This view is displayed during initial component loading,
   * before product data is received from API
   */
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  /**
   * Main view - displays products list
   *
   * FlatList props:
   * - data: products array to be displayed
   * - renderItem: function that renders a single item
   * - keyExtractor: defines unique key for each item (product id)
   * - contentContainerStyle: additional styles for content container
   * - showsVerticalScrollIndicator={false}: hides scroll bar
   * - onRefresh: function that runs during pull-to-refresh
   * - refreshing: boolean showing if refresh is in progress
   */
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        onRefresh={fetchProducts}
        refreshing={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  productList: {
    paddingBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default FlatListScreen;
