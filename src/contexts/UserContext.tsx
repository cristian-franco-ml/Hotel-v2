import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import type { User } from '@supabase/supabase-js';

interface UserContextType {
  user: User | null;
  userId: string | null;
  createdBy: string | null;
  loading: boolean;
  isNewUser: boolean;
  setHasSeenWelcome: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  userId: null,
  createdBy: null,
  loading: true,
  isNewUser: false,
  setHasSeenWelcome: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    supabase.auth.getUser().then(({ data }) => {
      if (mounted) {
        setUser(data.user || null);
        if (data.user) {
          checkIfNewUser(data.user);
        }
        setLoading(false);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        checkIfNewUser(session.user);
      }
      setLoading(false);
    });
    return () => {
      mounted = false;
      listener?.subscription.unsubscribe();
    };
  }, []);

  const checkIfNewUser = async (user: User) => {
    try {
      // Verificar si el usuario ha visto la pantalla de bienvenida
      const { data, error } = await supabase
        .from('user_preferences')
        .select('has_seen_welcome')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.log('User preferences query error:', error);
        if (error.code === 'PGRST116') {
          // No existe el registro, es un usuario nuevo
          setIsNewUser(true);
        } else if (error.code === '406' || error.code === 'PGRST301') {
          // Error de permisos o tabla no accesible, crear el registro
          console.log('Creating user preferences record for new user');
          const { error: insertError } = await supabase
            .from('user_preferences')
            .insert({
              user_id: user.id,
              has_seen_welcome: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
          
          if (insertError) {
            console.error('Error creating user preferences:', insertError);
            // Si no se puede crear, asumir que es un usuario nuevo
            setIsNewUser(true);
          } else {
            // Registro creado exitosamente, es un usuario nuevo
            setIsNewUser(true);
          }
        } else {
          console.error('Error checking user preferences:', error);
          // En caso de error, asumir que es un usuario nuevo para mostrar la bienvenida
          setIsNewUser(true);
        }
      } else if (data && !data.has_seen_welcome) {
        // Existe pero no ha visto la bienvenida
        setIsNewUser(true);
      } else {
        setIsNewUser(false);
      }
    } catch (error) {
      console.error('Error checking if new user:', error);
      // En caso de error de red o conexión, no mostrar la bienvenida para evitar problemas
      setIsNewUser(false);
    }
  };

  const setHasSeenWelcome = async () => {
    if (!user?.id) return;

    try {
      // Insertar o actualizar la preferencia del usuario
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          has_seen_welcome: true,
          updated_at: new Date().toISOString()
        });

      if (!error) {
        setIsNewUser(false);
      } else {
        console.error('Error setting welcome seen:', error);
        // Si hay error, al menos actualizar el estado local
        setIsNewUser(false);
      }
    } catch (error) {
      console.error('Error setting welcome seen:', error);
      // Si hay error, al menos actualizar el estado local
      setIsNewUser(false);
    }
  };

  const userId = user?.id || null;
  const createdBy = userId; // Para facilitar el filtrado en tablas que usen created_by

  return (
    <UserContext.Provider value={{ user, userId, createdBy, loading, isNewUser, setHasSeenWelcome }}>
      {children}
    </UserContext.Provider>
  );
}; 