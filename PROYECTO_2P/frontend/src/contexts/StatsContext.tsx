import React, { createContext, useContext, useState, useCallback } from 'react';
import { ProductService } from '../services/ProductService';
import { OrderService } from '../services/OrderService';

interface StatsContextType {
  stats: {
    totalProducts: number;
    totalOrders: number;
    loading: boolean;
  };
  refreshStats: () => Promise<void>;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};

export const StatsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    loading: true
  });

  const refreshStats = useCallback(async () => {
    try {
      setStats(prev => ({ ...prev, loading: true }));
      
      const [products, orders] = await Promise.all([
        ProductService.getAllProducts(),
        OrderService.getAllOrders()
      ]);

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        loading: false
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  }, []);

  return (
    <StatsContext.Provider value={{ stats, refreshStats }}>
      {children}
    </StatsContext.Provider>
  );
};
