import React, { useState, useRef, useEffect } from 'react';
import { Send } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';

export default function InteractiveVideoPlayer() {
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef();

  // Format seconds to mm:ss
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleAddComment = () => {
    if (!input.trim()) return;
    const videoTime = videoRef.current.currentTime;
    const newComment = {
      id: Date.now(),
      time: videoTime,
      text: input.trim(),
    };
    setComments([newComment, ...comments]);
    setInput('');
  };

  const handleSeek = (time) => {
    videoRef.current.currentTime = time;
    videoRef.current.play();
  };

  const handleDelete = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  // Update currentTime every time video updates
  const onTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  // Find comment closest to currentTime (within 5 seconds)
  const activeCommentId = React.useMemo(() => {
    if (comments.length === 0) return null;
    const threshold = 5; // seconds
    const closeComments = comments.filter(
      (c) => Math.abs(c.time - currentTime) <= threshold
    );
    if (closeComments.length === 0) return null;
    // Get comment closest to current time
    return closeComments.reduce((prev, curr) =>
      Math.abs(curr.time - currentTime) < Math.abs(prev.time - currentTime)
        ? curr
        : prev
    ).id;
  }, [comments, currentTime]);

  return (
    <>
      <Navbar />
       <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-purple-100 to-pink-100 py-10">
      <div className="max-w-4xl mt-5 mx-auto p-8 rounded-3xl bg-gradient-to-br from-sky-100 via-white to-sky-50 shadow-2xl border border-sky-300">
        <h2 className="text-4xl font-extrabold text-sky-800 mb-6 flex items-center gap-3 select-none animate-pulse">
          🎥 Interactive Video with Comments
        </h2>

        <div className="rounded-2xl overflow-hidden shadow-xl border border-sky-300 mb-8 relative">
          <video
            ref={videoRef}
            controls
            className="w-full rounded-2xl aspect-video bg-black"
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            onTimeUpdate={onTimeUpdate}
          />
          {/* Progress bar dots */}
          <div className="absolute bottom-6 left-0 right-0 h-2 pointer-events-none">
            <div className="relative h-full">
              {comments.map((comment) => {
                // Calculate position in %
                const percent = (comment.time / videoRef.current?.duration) * 100 || 0;
                return (
                  <button
                    key={comment.id}
                    onClick={() => handleSeek(comment.time)}
                    className="absolute -bottom-1 w-3 h-3 rounded-full bg-sky-600 hover:bg-sky-800 pointer-events-auto transition"
                    style={{ left: `${percent}%`, transform: 'translateX(-50%)' }}
                    title={`Comment at ${formatTime(comment.time)}`}
                    aria-label={`Seek to ${formatTime(comment.time)}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-center mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="💬 Add a comment for this timestamp..."
            className="flex-1 px-5 py-3 rounded-xl border border-sky-300 focus:outline-none focus:ring-4 focus:ring-sky-400 bg-white shadow-md placeholder:text-sky-400 text-sky-900 transition"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddComment();
              }
            }}
          />
          <button
            onClick={handleAddComment}
            disabled={!input.trim()}
            className={`bg-sky-700 hover:bg-sky-800 disabled:bg-sky-400 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-lg transition duration-200 ease-in-out select-none`}
            title="Add Comment"
          >
            <Send fontSize="small" />
            Comment
          </button>
        </div>

        <div className="space-y-5 max-h-[360px] overflow-y-auto pr-2">
          {comments.length === 0 ? (
            <p className="text-center text-sky-600 italic select-none">
              No comments yet. Be the first to add one! 💬
            </p>
          ) : (
            <AnimatePresence initial={false}>
              {comments.map((comment) => {
                const isActive = comment.id === activeCommentId;
                return (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    layout
                    className={`flex items-start justify-between rounded-xl border px-5 py-3 shadow-md cursor-default transition-shadow ${
                      isActive
                        ? 'border-sky-600 bg-sky-100 shadow-lg'
                        : 'border-sky-200 bg-white'
                    }`}
                  >
                    <div>
                      <button
                        onClick={() => handleSeek(comment.time)}
                        className={`font-semibold underline transition ${
                          isActive ? 'text-sky-900' : 'text-sky-700 hover:text-sky-900'
                        }`}
                        title={`Jump to ${formatTime(comment.time)}`}
                      >
                        ⏱ {formatTime(comment.time)}
                      </button>
                      <p className="mt-1 text-sky-900 whitespace-pre-wrap">{comment.text}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-red-600 hover:text-red-800 text-xl font-bold ml-5 p-1 rounded-full transition-colors select-none"
                      title="Delete comment"
                      aria-label="Delete comment"
                    >
                      ×
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
