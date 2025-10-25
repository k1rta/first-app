import type { Product } from './product';

export type RootStackParamList = {
  Home: undefined;
  Drawer: undefined;
  FlatListDetailsScreen: { item: Product };
};
