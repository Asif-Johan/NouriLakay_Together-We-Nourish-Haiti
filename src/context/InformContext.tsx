import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface InformPost {
  id: number;
  org: string;
  time: string;
  location: string;
  content: string;
  image?: string;
  likes: number;
  replies: Reply[];
  verified: boolean;
  flagged: boolean;
  likedBy: string[]; // Array of user IDs who liked the post
}

export interface Reply {
  id: number;
  org: string;
  content: string;
  time: string;
}

interface InformContextType {
  posts: InformPost[];
  addPost: (post: Omit<InformPost, 'id' | 'time' | 'likes' | 'replies' | 'verified' | 'flagged' | 'likedBy'>) => void;
  addReply: (postId: number, reply: Omit<Reply, 'id' | 'time'>) => void;
  toggleLike: (postId: number, userId: string) => void;
  verifyPost: (postId: number) => void;
  flagPost: (postId: number) => void;
  deletePost: (postId: number) => void;
}

const InformContext = createContext<InformContextType | undefined>(undefined);

export const useInform = () => {
  const context = useContext(InformContext);
  if (!context) {
    throw new Error('useInform must be used within an InformProvider');
  }
  return context;
};

export const InformProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<InformPost[]>([
    {
      id: 1,
      org: 'World Food Programme',
      time: '15 minutes ago',
      location: 'Cité Soleil, Port-au-Prince',
      content: 'Critical food insecurity levels detected in Cité Soleil. Immediate intervention needed for 85,000 families. Our emergency response team is coordinating with local partners for rapid deployment.',
      image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: 28,
      replies: [
        {
          id: 1,
          org: 'Action Against Hunger',
          content: 'We have mobile nutrition units ready to assist. Can coordinate with your emergency response.',
          time: '10 minutes ago'
        },
        {
          id: 2,
          org: 'Meds & Food for Kids',
          content: 'Our therapeutic feeding center can accommodate 200 malnourished children. Please coordinate.',
          time: '8 minutes ago'
        }
      ],
      verified: true,
      flagged: false,
      likedBy: ['user1', 'user2', 'user3']
    },
    {
      id: 2,
      org: 'Action Against Hunger',
      time: '1 hour ago',
      location: 'Jean Rabel, Nord-Ouest',
      content: 'Successfully distributed cash transfers to 1,200 families and provided seeds/tools for sustainable farming. Mobile nutrition screening ongoing in Jean Rabel area.',
      image: 'https://images.pexels.com/photos/6591307/pexels-photo-6591307.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: 45,
      replies: [
        {
          id: 3,
          org: 'FAO',
          content: 'Excellent work! We can provide additional agricultural training if needed.',
          time: '45 minutes ago'
        }
      ],
      verified: false,
      flagged: true,
      likedBy: ['user1', 'user4', 'user5']
    },
    {
      id: 3,
      org: 'Meds & Food for Kids',
      time: '2 hours ago',
      location: 'Port-au-Prince, Ouest',
      content: 'Urgent: Severe acute malnutrition cases increasing in Port-au-Prince. Several children need immediate therapeutic feeding. Requesting backup nutrition specialists.',
      likes: 22,
      replies: [
        {
          id: 4,
          org: 'World Food Programme',
          content: 'Our nutrition team is en route. ETA 30 minutes.',
          time: '1 hour 45 minutes ago'
        },
        {
          id: 5,
          org: 'PPAF',
          content: 'Sending our mobile health unit to assist with screening.',
          time: '1 hour 30 minutes ago'
        }
      ],
      verified: true,
      flagged: false,
      likedBy: ['user2', 'user6']
    },
    {
      id: 4,
      org: 'FAO',
      time: '3 hours ago',
      location: 'Artibonite Valley',
      content: 'Food crisis alert for Artibonite Valley. Agricultural production severely impacted. Farmers advised to access emergency seed distribution at regional centers.',
      image: 'https://images.pexels.com/photos/552789/pexels-photo-552789.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: 67,
      replies: [
        {
          id: 6,
          org: 'Papaye Peasant Movement',
          content: 'Mobilizing 500 trained farmers to assist with emergency planting.',
          time: '2 hours 45 minutes ago'
        }
      ],
      verified: true,
      flagged: false,
      likedBy: ['user1', 'user3', 'user7', 'user8']
    },
    {
      id: 5,
      org: 'Grown In Haiti',
      time: '4 hours ago',
      location: 'Grand\'Anse Department',
      content: 'Establishing community food forests in Grand\'Anse. Planting 1,000 fruit trees for long-term food security. Volunteers needed for tree planting activities.',
      likes: 38,
      replies: [
        {
          id: 7,
          org: 'PPAF',
          content: 'Sending 20 volunteers to help with reforestation efforts.',
          time: '3 hours 30 minutes ago'
        },
        {
          id: 8,
          org: 'World Food Programme',
          content: 'We can provide nutritional education alongside tree planting.',
          time: '3 hours 15 minutes ago'
        }
      ],
      verified: false,
      flagged: false,
      likedBy: ['user4', 'user9']
    },
    {
      id: 6,
      org: 'Papaye Peasant Movement',
      time: '5 hours ago',
      location: 'Croix-des-Bouquets, Ouest',
      content: 'Training 200 farmers in climate-resilient agriculture techniques. Distributing drought-resistant seeds and promoting sustainable farming practices in Croix-des-Bouquets.',
      image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400',
      likes: 84,
      replies: [
        {
          id: 9,
          org: 'FAO',
          content: 'Providing technical support and additional seed varieties. Great initiative!',
          time: '4 hours 30 minutes ago'
        }
      ],
      verified: true,
      flagged: false,
      likedBy: ['user2', 'user5', 'user10']
    }
  ]);

  const addPost = (newPost: Omit<InformPost, 'id' | 'time' | 'likes' | 'replies' | 'verified' | 'flagged' | 'likedBy'>) => {
    const post: InformPost = {
      ...newPost,
      id: Math.max(...posts.map(p => p.id), 0) + 1,
      time: 'Just now',
      likes: 0,
      replies: [],
      verified: false,
      flagged: false,
      likedBy: []
    };
    setPosts(prev => [post, ...prev]);
  };

  const addReply = (postId: number, newReply: Omit<Reply, 'id' | 'time'>) => {
    const reply: Reply = {
      ...newReply,
      id: Math.max(...posts.flatMap(p => p.replies.map(r => r.id)), 0) + 1,
      time: 'Just now'
    };

    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, replies: [...post.replies, reply] }
          : post
      )
    );
  };

  const toggleLike = (postId: number, userId: string) => {
    setPosts(prev => 
      prev.map(post => {
        if (post.id === postId) {
          const hasLiked = post.likedBy.includes(userId);
          return {
            ...post,
            likes: hasLiked ? post.likes - 1 : post.likes + 1,
            likedBy: hasLiked 
              ? post.likedBy.filter(id => id !== userId)
              : [...post.likedBy, userId]
          };
        }
        return post;
      })
    );
  };

  const verifyPost = (postId: number) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, verified: true, flagged: false }
          : post
      )
    );
  };

  const flagPost = (postId: number) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, flagged: true, verified: false }
          : post
      )
    );
  };

  const deletePost = (postId: number) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  return (
    <InformContext.Provider value={{
      posts,
      addPost,
      addReply,
      toggleLike,
      verifyPost,
      flagPost,
      deletePost
    }}>
      {children}
    </InformContext.Provider>
  );
};