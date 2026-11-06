import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ArticlesContext = createContext();

export function ArticlesProvider({ children }) {
  const [savedArticlesbyuser, setSavedArticlesbyuser] = useState([]);
  const { user } = useAuth();

  const getUserSavedArticles = () => {
    if (!user) return [];
    return savedArticlesbyuser[user.username] || [];
  };

  const saveArticle = (article) => {
    if (!user) return;
    setSavedArticlesbyuser(prev => {
      const userArticles = prev[user.username] || [];
      if (userArticles.find(a => a.url === article.url)) {
        return prev;
      }
      return { ...prev, [user.username]: [...userArticles, article] };
    });
  };

  const removeArticle = (url) => {
    if (!user) return;
    setSavedArticlesbyuser(prev => ({
      ...prev,
      [user.username]: (prev[user.username] || []).filter(a => a.url !== url)
    }));
  };

  const isArticleSaved = (url) => {
    return getUserSavedArticles().some(a => a.url === url);
  };

  const getAllUserArticles = () => {
    return savedArticlesbyuser;
  };

  return (
    <ArticlesContext.Provider 
      value={{ 
        getUserSavedArticles,
        saveArticle, 
        removeArticle, 
        isArticleSaved,
        getAllUserArticles
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('useArticles must be used within ArticlesProvider');
  }
  return context;
};