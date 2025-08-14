import Sentiment from "sentiment";
const sentiment = new Sentiment();

export function analyzeSentiment(text) {
    return sentiment.analyze(text);
}

