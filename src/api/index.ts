import axios, { AxiosInstance } from 'axios';
import { setInterceptors } from '@/api/interceptors';

/**
 * API 키 획득하는 방법 : Bungie.net에 로그인 > 새로운 앱 만들기
 * ref) https://www.bungie.net/ko/Application
 */

/**
 * API Details > Bungie.net Platform > Minimum Response Details
 * ref) http://destinydevs.github.io/BungieNetPlatform/docs/API-Details
 */
interface MininumResponseDetails {
  ErrorCode: number;
  ErrorStatus: string;
  Message: string;
  MessageData: any;
  Response: any;
  ThrottleSeconds: number;
}

const createPlatformInstance = (url: string): AxiosInstance => {
  const instance: AxiosInstance = axios.create({
    baseURL: url,
  });

  setInterceptors(instance);
  return instance;
};

// Bungie.net API의 접근을 위한 endpoint의 platform instance
const platformInstance = createPlatformInstance(process.env.VUE_APP_PLATFORM_API_URL);

export {
  platformInstance,
  MininumResponseDetails,
};
