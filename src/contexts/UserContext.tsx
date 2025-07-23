import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import type { User } from '@supabase/supabase-js';

interface UserContextType {
  user: User | null;
  userId: string | null;
  createdBy: string | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  userId: null,
  createdBy: null,
  loading: true,
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) {
        setUser(data.user || null);
        setLoading(false);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });
    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  const userId = user?.id || null;
  const createdBy = userId; // Para facilitar el filtrado en tablas que usen created_by

  return (
    <UserContext.Provider value={{ user, userId, createdBy, loading }}>
      {children}
    </UserContext.Provider>
  );
}; 