"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const EmojiCard = props => {
  const {
    emojiDetails,
    clickEmoji
  } = props;
  const {
    id,
    emojiName,
    emojiUrl
  } = emojiDetails;

  const onClickEmoji = () => {
    clickEmoji(id);
  };

  return /*#__PURE__*/React.createElement("li", {
    className: "emoji-item"
  }, /*#__PURE__*/React.createElement("button", {
    className: "emoji-button",
    type: "button",
    onClick: onClickEmoji
  }, /*#__PURE__*/React.createElement("img", {
    src: emojiUrl,
    alt: emojiName,
    className: "emoji-img"
  })));
};

const NavBar = props => {
  const {
    currentScore,
    topScore,
    isGameInProgress
  } = props;
  return /*#__PURE__*/React.createElement("nav", {
    className: "navbar-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "navbar-sub-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-title-container"
  }, /*#__PURE__*/React.createElement("img", {
    className: "emoji-logo",
    src: "https://assets.ccbp.in/frontend/react-js/game-logo-img.png",
    alt: "emoji logo"
  }), /*#__PURE__*/React.createElement("h1", {
    className: "title"
  }, "Emoji Game")), isGameInProgress && /*#__PURE__*/React.createElement("div", {
    className: "scores-container"
  }, /*#__PURE__*/React.createElement("p", {
    className: "score"
  }, "Score: ", currentScore), /*#__PURE__*/React.createElement("p", {
    className: "score"
  }, "Top Score: ", topScore))));
};

const LOSE_IMAGE = 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png';
const WON_IMAGE = 'https://assets.ccbp.in/frontend/react-js/won-game-img.png';

const WinOrLoseCard = props => {
  const {
    isWon,
    score,
    onClickPlayAgain
  } = props;
  const imgUrl = isWon ? WON_IMAGE : LOSE_IMAGE;
  const gameStatus = isWon ? 'You Won' : 'You Lose';
  const scoreLabel = isWon ? 'Best Score' : 'Score';
  return /*#__PURE__*/React.createElement("div", {
    className: "win-lose-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "score-details-container"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "game-status"
  }, gameStatus), /*#__PURE__*/React.createElement("p", {
    className: "your-score-status"
  }, scoreLabel), /*#__PURE__*/React.createElement("p", {
    className: "your-score"
  }, score, "/12"), /*#__PURE__*/React.createElement("button", {
    className: "play-again-button",
    type: "button",
    onClick: onClickPlayAgain
  }, "Play Again")), /*#__PURE__*/React.createElement("div", {
    className: "image-section-container"
  }, /*#__PURE__*/React.createElement("img", {
    src: imgUrl,
    className: "win-lose-image",
    alt: "win or lose"
  })));
};
/* 
Quick Tip 
- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.
const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}
*/


class EmojiGame extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      clickedEmojisList: [],
      isGameInProgress: true,
      topScore: 0
    });

    _defineProperty(this, "resetGame", () => {
      this.setState({
        clickedEmojisList: [],
        isGameInProgress: true
      });
    });

    _defineProperty(this, "renderScoreCard", () => {
      const {
        emojisList
      } = this.props;
      const {
        clickedEmojisList
      } = this.state;
      const isWon = clickedEmojisList.length === emojisList.length;
      return /*#__PURE__*/React.createElement(WinOrLoseCard, {
        isWon: isWon,
        score: clickedEmojisList.length,
        onClickPlayAgain: this.resetGame
      });
    });

    _defineProperty(this, "finishGameAndSetTopScore", currentScore => {
      const {
        topScore
      } = this.state;
      let newTopScore = topScore;

      if (currentScore > newTopScore) {
        newTopScore = currentScore;
      }

      this.setState({
        topScore: newTopScore,
        isGameInProgress: false
      });
    });

    _defineProperty(this, "clickEmoji", id => {
      const {
        emojisList
      } = this.props;
      const {
        clickedEmojisList
      } = this.state;
      const isEmojiClicked = clickedEmojisList.includes(id);
      const clickedEmojisLength = clickedEmojisList.length;

      if (isEmojiClicked) {
        this.finishGameAndSetTopScore(clickedEmojisLength);
      } else {
        if (clickedEmojisLength === emojisList.length - 1) {
          this.finishGameAndSetTopScore(emojisList.length);
        }

        this.setState(prevState => ({
          clickedEmojisList: [...prevState.clickedEmojisList, id]
        }));
      }
    });

    _defineProperty(this, "getShuffledEmojisList", () => {
      const {
        emojisList
      } = this.props;
      return emojisList.sort(() => Math.random() - 0.5);
    });

    _defineProperty(this, "renderEmojisList", () => {
      const shuffledEmojisList = this.getShuffledEmojisList();
      return /*#__PURE__*/React.createElement("ul", {
        className: "emojis-list-container"
      }, shuffledEmojisList.map(eachEmoji => /*#__PURE__*/React.createElement(EmojiCard, {
        key: eachEmoji.id,
        emojiDetails: eachEmoji,
        clickEmoji: this.clickEmoji
      })));
    });
  }

  render() {
    const {
      clickedEmojisList,
      topScore,
      isGameInProgress
    } = this.state;
    return /*#__PURE__*/React.createElement("div", {
      className: "main-container"
    }, /*#__PURE__*/React.createElement(NavBar, {
      topScore: topScore,
      isGameInProgress: isGameInProgress,
      currentScore: clickedEmojisList.length
    }), /*#__PURE__*/React.createElement("div", {
      className: "emoji-body-container"
    }, isGameInProgress ? this.renderEmojisList() : this.renderScoreCard()));
  }

}

const emojisList = [{
  id: 0,
  emojiName: 'Face with stuck out tongue',
  emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-img.png'
}, {
  id: 1,
  emojiName: 'Face with head bandage',
  emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-head-bandage-img.png'
}, {
  id: 2,
  emojiName: 'Face with hugs',
  emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-hugs-img.png'
}, {
  id: 3,
  emojiName: 'Face with laughing',
  emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-laughing-img.png'
}, {
  id: 4,
  emojiName: 'Laughing face with hand in front of mouth',
  emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-laughing-with-hand-infront-mouth-img.png'
}, {
  id: 5,
  emojiName: 'Face with mask',
  emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-mask-img.png'
}, {
  id: 6,
  emojiName: 'Face with silence',
  emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-silence-img.png'
}, {
  id: 7,
  emojiName: 'Face with stuck out tongue and winked eye',
  emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-and-winking-eye-img.png'
}, {
  id: 8,
  emojiName: 'Grinning face with sweat',
  emojiUrl: 'https://assets.ccbp.in/frontend/react-js/grinning-face-with-sweat-img.png'
}, {
  id: 9,
  emojiName: 'Smiling face with heart eyes',
  emojiUrl: 'https://assets.ccbp.in/frontend/react-js/smiling-face-with-heart-eyes-img.png'
}, {
  id: 10,
  emojiName: 'Grinning face',
  emojiUrl: 'https://assets.ccbp.in/frontend/react-js/grinning-face-img.png'
}, {
  id: 11,
  emojiName: 'Smiling face with star eyes',
  emojiUrl: 'https://assets.ccbp.in/frontend/react-js/smiling-face-with-star-eyes-img.png'
}];

const App = () => /*#__PURE__*/React.createElement(EmojiGame, {
  emojisList: emojisList
});