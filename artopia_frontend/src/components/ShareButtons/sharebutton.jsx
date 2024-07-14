import React, { useState } from "react";
import "./sharebutton.css";

const ShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOptions = () => {
    setIsOpen(!isOpen);
  };

  const share = (platform) => {
    const postUrl = encodeURIComponent(window.location.href);
    const postTitle = encodeURIComponent(document.title);

    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer.php?u=${postUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${postUrl}&text=${postTitle}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="share-container">
      <button className="share-btn" onClick={toggleOptions}>
        <i className="fa fa-share-alt" />
      </button>
      {isOpen && (
        <div className="share-options">
          <button
            className="share-option facebook"
            onClick={() => share("facebook")}
          >
            <i className="fab fa-facebook-f" />
          </button>

          <button
            className="share-option linkedin"
            onClick={() => share("linkedin")}
          >
            <i className="fab fa-linkedin-in" />
          </button>

          <button
            className="share-option twitter"
            onClick={() => share("twitter")}
          >
            <i className="fab fa-twitter" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
