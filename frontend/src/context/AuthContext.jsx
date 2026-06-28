import React, { createContext, useState } from 'react';
// STEP 1: Create the actual "Cloud" (Context)
// We export this so other files can ask it questions later.
export const AuthContext = createContext();

// STEP 2: Create the "Wrapper" (Provider)
// Think of 'children' as your entire website (Navbar, Pages, etc.)
export const AuthProvider = ({ children }) => {
    // STEP 3: Create the memory variable!
    // For now, we are hardcoding it to "testUser99" so your Cart API works immediately.
    // Later, when you build the Login page, we will change this blank or real user data.
    const [userId, setUserId] = useState(() => {
        return localStorage.getItem('token') ? "activeUser" : null;
    });

    return (
        // STEP 4: Wrap the website in the cloud, and pass down the userId memory
        <AuthContext.Provider value={{ userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};