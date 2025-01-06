// ThemeToggle.js
import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-800 dark:text-gray-200"
        >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
}
