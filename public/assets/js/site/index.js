export default function getYouTubeVideoId(url) {
  const match = url.match(/v=([^&]+)/);
  return match ? match[1] : null;
}
