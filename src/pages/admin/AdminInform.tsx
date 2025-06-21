import React from 'react';
import { Eye, Heart, MessageSquare, Flag, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useInform } from '../../context/InformContext';

const AdminInform = () => {
  const { posts, verifyPost, flagPost, deletePost } = useInform();

  const handleVerify = (postId: number) => {
    verifyPost(postId);
  };

  const handleFlag = (postId: number) => {
    flagPost(postId);
  };

  const handleDelete = (postId: number) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      deletePost(postId);
    }
  };

  const getPostStatusColor = (post: any) => {
    if (post.flagged) return 'border-red-200 bg-red-50';
    if (post.verified) return 'border-green-200 bg-green-50';
    return 'border-gray-200 bg-white';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Information Monitoring</h1>
          <p className="text-gray-600 mt-2">Monitor and verify ground reports from NGOs</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{posts.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Verified</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {posts.filter(post => post.verified).length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Flagged</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {posts.filter(post => post.flagged).length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-red-100">
                <Flag className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {posts.filter(post => !post.verified && !post.flagged).length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100">
                <Eye className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Ground Reports</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Flagged</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-gray-600">Pending</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No posts available to monitor.
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className={`p-6 rounded-xl border-2 transition-all duration-200 ${getPostStatusColor(post)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {post.org.split(' ').map((word: string) => word[0]).join('')}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{post.org}</h4>
                          {post.verified && <CheckCircle className="h-5 w-5 text-green-600" />}
                          {post.flagged && <Flag className="h-5 w-5 text-red-600" />}
                          <span className="text-gray-500 text-sm">•</span>
                          <span className="text-gray-500 text-sm">{post.time}</span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{post.location}</p>
                        <p className="text-gray-700 mb-4">{post.content}</p>
                        
                        {post.image && (
                          <img 
                            src={post.image} 
                            alt="Field update" 
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                        )}
                        
                        <div className="flex items-center space-x-6 mb-4">
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Heart className="h-5 w-5" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <MessageSquare className="h-5 w-5" />
                            <span>{post.replies.length} replies</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Eye className="h-5 w-5" />
                            <span>View Details</span>
                          </div>
                        </div>

                        {/* Show replies if any */}
                        {post.replies.length > 0 && (
                          <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                            <p className="text-sm font-medium text-gray-700">Recent Replies:</p>
                            {post.replies.slice(0, 2).map((reply: any) => (
                              <div key={reply.id} className="bg-gray-100 p-2 rounded text-sm">
                                <span className="font-medium">{reply.org}:</span> {reply.content}
                              </div>
                            ))}
                            {post.replies.length > 2 && (
                              <p className="text-xs text-gray-500">+{post.replies.length - 2} more replies</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      {!post.verified && (
                        <button 
                          onClick={() => handleVerify(post.id)}
                          className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Verify</span>
                        </button>
                      )}
                      {!post.flagged && (
                        <button 
                          onClick={() => handleFlag(post.id)}
                          className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
                        >
                          <Flag className="h-4 w-4" />
                          <span>Flag</span>
                        </button>
                      )}
                      {post.flagged && (
                        <button 
                          onClick={() => handleVerify(post.id)}
                          className="flex items-center space-x-1 bg-gray-600 text-white px-3 py-1 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm"
                        >
                          <XCircle className="h-4 w-4" />
                          <span>Remove Flag</span>
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminInform;