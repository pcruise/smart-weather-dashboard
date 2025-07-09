import { GoogleGenAI } from "@google/genai";
import { OpenWeatherMapResponse } from "../weather/schema";
import { removeDt } from "@/lib/openWeatherUtil";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const AI_MODEL = "gemini-2.5-flash-lite-preview-06-17" as const;

// 에러 메세지
const ERROR_MSG_ITEM_EMPTY = "의상 추천 결과를 받아오지 못했습니다.";

const OUTFIT_RECOMMENDATION_PROMPT =
  `Based on this weather data, tell me in Korean what kind of outfit I should wear. 
  Start message with the outfit suggestion (e.g., “jeans and a short-sleeved T-shirt”).
  Please use a recommending tone instead of imperative forms like "입으세요".
  Avoid using the same sentence ending twice.
  Do not mention tomorrow’s weather unless the current time is nighttime.
  Please avoid mentioning the current temperature, but you may refer to near-future conditions (like later tonight or early tomorrow morning).
  Don't use any emojis.
  Respond in one or two or three sentences.
  Please fill each line with up to 21 full-width Korean characters (excluding spaces and punctuation).
  Do not Insert any line break character.
  You may add punctuation marks and spaces for visual balance — they do not count toward the 20-character limit.
  Here is a JSON weather data:` as const;

export const getOutfitSuggestion = async (
  weatherData: OpenWeatherMapResponse
) => {
  // API 전송량을 줄이기 위해 daily 정보는 제거, hour 정보는 12시간까지만 제공, dt 값 제거
  const filteredWeatherData = {
    ...weatherData,
    daily: null,
    hourly: weatherData.hourly.slice(0, 12).map(removeDt),
  };

  // GEMINI API 호출
  const aiContentResponse = await ai.models.generateContent({
    model: AI_MODEL,
    contents:
      OUTFIT_RECOMMENDATION_PROMPT + JSON.stringify(filteredWeatherData),
  });

  const resultText = aiContentResponse.text;
  if (!resultText) throw new Error(ERROR_MSG_ITEM_EMPTY);

  // 모든 개행 문자를 제거한 후, 마침표 물음표 느낌표 다음에 개행문자 입력 (마지막은 입력하지 않음)
  return resultText.replace(/\n/g, "").replace(/([.!?])\s*(?=\S)/g, "$1\n");
};
