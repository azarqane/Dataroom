import { supabase } from './supabase';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export const signUp = async (email: string, password: string, full_name: string) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    if (authData.user) {
      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', authData.user.id)
        .maybeSingle();

      // Only create profile if it doesn't exist
      if (!existingProfile) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              email,
              full_name,
            },
          ]);

        if (profileError) throw profileError;
      }
    }

    return { data: authData, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error };
  }
};

export const getProfile = async (userId: string) => {
  try {
    // First try to get the existing profile
    let { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;

    // If no profile exists, get the user's email and create one
    if (!data) {
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        // Check again before inserting to prevent race conditions
        const { data: checkProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', userId)
          .maybeSingle();

        if (!checkProfile) {
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([
              {
                id: userId,
                email: userData.user.email,
                full_name: null,
              },
            ])
            .select()
            .single();

          if (insertError) throw insertError;
          data = newProfile;
        } else {
          // Profile was created between our first and second check
          const { data: justCreatedProfile, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

          if (fetchError) throw fetchError;
          data = justCreatedProfile;
        }
      }
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};