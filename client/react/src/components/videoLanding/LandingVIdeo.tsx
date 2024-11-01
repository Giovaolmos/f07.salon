const LandingVideo = () => {
  return (
    <div>
      <video
        src={"/videolanding.mp4"}
        autoPlay
        loop
        muted
        playsInline
        style={{ width: "500px", height: "100%" }}
      />
    </div>
  );
};

export default LandingVideo;
