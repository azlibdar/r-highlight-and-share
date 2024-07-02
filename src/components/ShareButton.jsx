import PropTypes from "prop-types";

function ShareButton({ text, position }) {
  const handleShare = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <div
      className="absolute"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translateX(-50%)",
      }}
    >
      <button
        onClick={handleShare}
        className="py-2 px-6 text-base bg-black rounded-md shadow-xl text-white font-semibold relative after:absolute after:w-0 after:h-0 after:border-l-[6px] after:border-l-transparent after:border-r-[6px] after:border-r-transparent after:border-t-[6px] after:border-t-black after:bottom-[-6px] after:left-1/2 after:transform after:-translate-x-1/2"
      >
        Share
      </button>
    </div>
  );
}

ShareButton.propTypes = {
  text: PropTypes.string.isRequired,
  position: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
};

export default ShareButton;
