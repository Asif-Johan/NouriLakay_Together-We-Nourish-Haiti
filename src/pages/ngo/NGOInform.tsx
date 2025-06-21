import React, { useState } from 'react';
import { Camera, MapPin, Send, Heart, MessageSquare, CheckCircle, Flag, Reply } from 'lucide-react';
import NGOLayout from '../../components/NGOLayout';
import { useInform } from '../../context/InformContext';

const NGOInform = () => {
  const { posts, addPost, addReply, toggleLike } = useInform();
  const [newPost, setNewPost] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [showLocationInput, setShowLocationInput] = useState(false);

  const currentUser = 'World Food Programme'; // In real app, this would come from auth context
  const currentUserId = 'user1'; // In real app, this would come from auth context

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    addPost({
      org: currentUser,
      location: location || 'Port-au-Prince, Haiti',
      content: newPost,
      image: image || undefined
    });

    // Reset form
    setNewPost('');
    setLocation('');
    setImage('');
    setShowImageInput(false);
    setShowLocationInput(false);
  };

  const handleReply = (postId: number) => {
    if (!replyContent.trim()) return;

    addReply(postId, {
      org: currentUser,
      content: replyContent
    });

    setReplyContent('');
    setReplyingTo(null);
  };

  const handleLike = (postId: number) => {
    toggleLike(postId, currentUserId);
  };

  const handleImageUpload = () => {
    // In a real app, this would handle actual file upload
    const sampleImages = [
      'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/6591307/pexels-photo-6591307.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/552789/pexels-photo-552789.jpeg?auto=compress&cs=tinysrgb&w=400'
    ];
    setImage(sampleImages[Math.floor(Math.random() * sampleImages.length)]);
    setShowImageInput(false);
  };

  const handleLocationDetect = () => {
    // In a real app, this would use geolocation API
    const sampleLocations = [
      'Cité Soleil, Port-au-Prince',
      'Croix-des-Bouquets, Ouest',
      'Jean Rabel, Nord-Ouest',
      'Artibonite Valley',
      'Grand\'Anse Department'
    ];
    setLocation(sampleLocations[Math.floor(Math.random() * sampleLocations.length)]);
    setShowLocationInput(false);
  };

  return (
    <NGOLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ground Information</h1>
          <p className="text-gray-600 mt-2">Share real-time updates from the field and coordinate with other NGOs</p>
        </div>

        {/* Create Post Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share Update</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's happening on the ground? Share updates, food security needs, or coordination information..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-haiti-blue focus:border-transparent resize-none"
              rows={4}
              required
            />

            {/* Location Input */}
            {showLocationInput && (
              <div className="space-y-2">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location (e.g., Cité Soleil, Port-au-Prince)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleLocationDetect}
                  className="text-sm text-haiti-blue hover:text-primary-700"
                >
                  Use current location
                </button>
              </div>
            )}

            {/* Image Input */}
            {showImageInput && (
              <div className="space-y-2">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Enter image URL or upload file"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleImageUpload}
                  className="text-sm text-haiti-blue hover:text-primary-700"
                >
                  Upload from device
                </button>
              </div>
            )}

            {/* Image Preview */}
            {image && (
              <div className="relative">
                <img src={image} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => setImage('')}
                  className="absolute top-2 right-2 bg-haiti-red text-white p-1 rounded-full hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => setShowImageInput(!showImageInput)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-haiti-blue transition-colors duration-200"
                >
                  <Camera className="h-5 w-5" />
                  <span>Add Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowLocationInput(!showLocationInput)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-haiti-blue transition-colors duration-200"
                >
                  <MapPin className="h-5 w-5" />
                  <span>Add Location</span>
                </button>
              </div>
              <button 
                type="submit"
                className="bg-haiti-blue text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newPost.trim()}
              >
                <Send className="h-4 w-4" />
                <span>Share Update</span>
              </button>
            </div>
          </form>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-haiti-blue rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {post.org.split(' ').map(word => word[0]).join('')}
                  </span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{post.org}</h4>
                    {post.verified && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {post.flagged && <Flag className="h-5 w-5 text-haiti-red" />}
                    <span className="text-gray-500 text-sm">•</span>
                    <span className="text-gray-500 text-sm">{post.time}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600 text-sm">{post.location}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt="Field update" 
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  
                  <div className="flex items-center space-x-6 mb-4">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 transition-colors duration-200 ${
                        post.likedBy.includes(currentUserId) 
                          ? 'text-haiti-red hover:text-red-700' 
                          : 'text-gray-600 hover:text-haiti-red'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${post.likedBy.includes(currentUserId) ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    <button 
                      onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-haiti-blue transition-colors duration-200"
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span>{post.replies.length} replies</span>
                    </button>
                  </div>

                  {/* Replies */}
                  {post.replies.length > 0 && (
                    <div className="space-y-3 mb-4 pl-4 border-l-2 border-gray-200">
                      {post.replies.map((reply) => (
                        <div key={reply.id} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-gray-900 text-sm">{reply.org}</span>
                            <span className="text-gray-500 text-xs">•</span>
                            <span className="text-gray-500 text-xs">{reply.time}</span>
                          </div>
                          <p className="text-gray-700 text-sm">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Form */}
                  {replyingTo === post.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex space-x-3">
                        <div className="w-8 h-8 bg-haiti-blue rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-xs">
                            {currentUser.split(' ').map(word => word[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write a reply..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-haiti-blue focus:border-transparent resize-none"
                            rows={2}
                          />
                          <div className="flex justify-end space-x-2 mt-2">
                            <button
                              onClick={() => setReplyingTo(null)}
                              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleReply(post.id)}
                              disabled={!replyContent.trim()}
                              className="bg-haiti-blue text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Reply className="h-4 w-4" />
                              <span>Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </NGOLayout>
  );
};

export default NGOInform;