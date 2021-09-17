import { ref } from 'vue';
import { getPublicMilestonesAPI } from '@/api/destiny2';

export const useMilestones = () => {
  const milestoneInfo = ref<any>(null);
  // const ctx: Record<string, any> = getCurrentInstance()!.appContext.config.globalProperties;

  const getPublicMilestones = async (): Promise<void> => {
    try {
      const { data } = await getPublicMilestonesAPI();
      milestoneInfo.value = data.Response;
    } catch (e) {
      console.log(`Manifest 파일을 가져오지 못했습니다 : ${e}`);
    }
  };

  return {
    milestoneInfo,
    getPublicMilestones,
  };
};
