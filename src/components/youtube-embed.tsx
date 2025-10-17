interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  className?: string;
}

export function YouTubeEmbed({ videoId, title = 'YouTube video', className = '' }: YouTubeEmbedProps) {
  // Validate YouTube video ID format
  const isValidId = /^[a-zA-Z0-9_-]{11}$/.test(videoId);

  if (!isValidId) {
    return (
      <div className={`p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-600 ${className}`}>
        <p className="font-semibold">Invalid YouTube Video ID</p>
        <p className="text-sm">Please ensure the video ID is 11 characters long.</p>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className={`relative w-full aspect-video overflow-hidden rounded-lg border border-border/50 bg-black ${className}`}>
      <iframe
        className="absolute inset-0 w-full h-full"
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
