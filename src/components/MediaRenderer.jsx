import React from 'react';

export function MediaRenderer({ media }) {
  if (!media || !media.url) return null;

  if (media.type === 'image') {
    return (
      <div className="w-full h-full rounded-xl overflow-hidden bg-black/50 flex items-center justify-center p-2">
        <img 
          src={media.url} 
          alt="Project Media" 
          className="w-full h-full object-contain transition-transform duration-700"
        />
      </div>
    );
  }

  if (media.type === 'video') {
    const url = media.url;
    
    // Check if YouTube (standard or shorts)
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    
    if (ytMatch && ytMatch[1]) {
      const videoId = ytMatch[1];
      const isShorts = url.includes('/shorts/');
      
      return (
        <div className="w-full h-full rounded-xl overflow-hidden bg-black flex items-center justify-center p-2 md:p-4">
          <iframe 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className={`w-full h-full rounded-xl ${isShorts ? 'max-w-[420px] aspect-[9/16]' : 'aspect-video'}`}
          ></iframe>
        </div>
      );
    }

    // Check if Instagram (reel, post, tv)
    const igMatch = url.match(/(?:instagram\.com|instagr\.am)\/(?:p|reel|tv)\/([^\/?#&]+)/);
    if (igMatch && igMatch[1]) {
      const igId = igMatch[1];
      return (
        <div className="w-full h-full rounded-xl overflow-hidden bg-black flex items-center justify-center p-2 md:p-4">
          <iframe 
            src={`https://www.instagram.com/p/${igId}/embed`}
            title="Instagram video player"
            frameBorder="0"
            allowFullScreen
            className="w-full h-full max-w-[420px] bg-white rounded-xl shadow-lg"
          ></iframe>
        </div>
      );
    }

    // Default HTML5 video player for .mp4 or other direct links
    return (
      <div className="w-full h-full rounded-xl overflow-hidden bg-black flex items-center justify-center p-2 md:p-4">
        <video 
          controls 
          preload="metadata"
          className="w-full h-full object-contain rounded-xl"
        >
          <source src={media.url} type="video/mp4" />
          Tarayıcınız video etiketini desteklemiyor.
        </video>
      </div>
    );
  }

  return null;
}
