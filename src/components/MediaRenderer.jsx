import React from 'react';

export function MediaRenderer({ media }) {
  if (!media || !media.url) return null;

  if (media.type === 'image') {
    return (
      <div className="w-full h-full rounded-xl overflow-hidden bg-foreground/5 relative group">
        <img 
          src={media.url} 
          alt="Project Media" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    );
  }

  if (media.type === 'video') {
    const url = media.url;
    // Check if YouTube
    const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    
    if (ytMatch && ytMatch[1]) {
      const videoId = ytMatch[1];
      return (
        <div className="w-full h-full rounded-xl overflow-hidden bg-foreground/5 relative aspect-video">
          <iframe 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      );
    }

    // Default HTML5 video player for .mp4 or other direct links
    return (
      <div className="w-full h-full rounded-xl overflow-hidden bg-foreground/5 relative group aspect-video flex items-center justify-center">
        <video 
          controls 
          preload="metadata"
          className="w-full h-full object-cover"
        >
          <source src={media.url} type="video/mp4" />
          Tarayıcınız video etiketini desteklemiyor.
        </video>
      </div>
    );
  }

  return null;
}
