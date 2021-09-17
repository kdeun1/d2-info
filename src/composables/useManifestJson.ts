import { onBeforeMount, ref } from 'vue';
import { getDestinyManifestAPI } from '@/api/destiny2';

interface JsonWorldComponentContentPaths {
  DestinyAchievementDefinition: string; // useless
  DestinyActivityDefinition: string; // 활동 전체 정보
  DestinyActivityGraphDefinition: string; // useless
  DestinyActivityInteractableDefinition: string; // useless
  DestinyActivityModeDefinition: string; // useless (모든 게임 모드)
  DestinyActivityModifierDefinition: string; // 활동 시 모디파이어 정의
  DestinyActivityTypeDefinition: string; // 활동에 대한 설명
  DestinyArtDyeChannelDefinition: string; // useless
  DestinyArtDyeReferenceDefinition: string; // useless
  DestinyArtifactDefinition: string; // 아티펙트
  DestinyBondDefinition: string; // useless
  DestinyBreakerTypeDefinition: string; // useless
  DestinyCharacterCustomizationCategoryDefinition: string; // useless
  DestinyCharacterCustomizationOptionDefinition: string; // useless
  DestinyChecklistDefinition: string; // useless
  DestinyClassDefinition: string; // useless
  DestinyCollectibleDefinition: string; // 수집품 전체 목록
  DestinyDamageTypeDefinition: string; // 속성 아이콘 이미지 참고용
  DestinyDestinationDefinition: string; // 잊혀진 구역 정보?
  DestinyEnergyTypeDefinition: string; // 색상이 있는 속성 아이콘 이미지 참고용
  DestinyEntitlementOfferDefinition: string; // useless
  DestinyEquipmentSlotDefinition: string; // 장비 슬롯 관련정보
  DestinyFactionDefinition: string; // 진영(소속) 정보
  DestinyGenderDefinition: string; // useless
  DestinyInventoryBucketDefinition: string; // useless
  DestinyInventoryItemDefinition: string; // 인벤토리 모든 아이템 정보 (양 많음)
  DestinyInventoryItemLiteDefinition: string; // 인벤토리 모든 아이템 정보 (양 많음)
  DestinyItemCategoryDefinition: string; // useless
  DestinyItemTierTypeDefinition: string; // useless
  DestinyLocationDefinition: string; // useless
  DestinyLoreDefinition: string; // useless 대사?
  DestinyMaterialRequirementSetDefinition: string; // useless
  DestinyMedalTierDefinition: string; // useless
  DestinyMetricDefinition: string; // useless - 업적
  DestinyMilestoneDefinition: string; // 리셋 정보
  DestinyNodeStepSummaryDefinition: string; // useless??
  DestinyObjectiveDefinition: string; // useless
  DestinyPlaceDefinition: string; // useless
  DestinyPlatformBucketMappingDefinition: string; // useless
  DestinyPlugSetDefinition: string; // useless
  DestinyPowerCapDefinition: string; // useless
  DestinyPresentationNodeDefinition: string; // useless
  DestinyProgressionDefinition: string; // useless
  DestinyProgressionLevelRequirementDefinition: string; // useless
  DestinyProgressionMappingDefinition: string; // useless
  DestinyRaceDefinition: string; // useless
  DestinyRecordDefinition: string; // useless - 업적
  DestinyReportReasonCategoryDefinition: string; // useless
  DestinyRewardAdjusterPointerDefinition: string; // useless
  DestinyRewardAdjusterProgressionMapDefinition: string; // useless
  DestinyRewardItemListDefinition: string; // useless
  DestinyRewardMappingDefinition: string; // useless
  DestinyRewardSheetDefinition: string; // useless
  DestinyRewardSourceDefinition: string; // useless
  DestinySackRewardItemListDefinition: string; // useless
  DestinySandboxPatternDefinition: string; // useless
  DestinySandboxPerkDefinition: string; // 버프 디버프 퍽?
  DestinySeasonDefinition: string; // useless
  DestinySeasonPassDefinition: string; // useless
  DestinySocketCategoryDefinition: string; // useless
  DestinySocketTypeDefinition: string; // useless
  DestinyStatDefinition: string; // 케릭터 및 무기의 스탯 정보
  DestinyStatGroupDefinition: string; // useless
  DestinyTalentGridDefinition: string; // 궁극기 선택지 정보
  DestinyTraitCategoryDefinition: string; // useless
  DestinyTraitDefinition: string; // useless
  DestinyUnlockCountMappingDefinition: string; // useless
  DestinyUnlockDefinition: string; // useless
  DestinyUnlockEventDefinition: string; // useless
  DestinyUnlockExpressionMappingDefinition: string; // useless
  DestinyUnlockValueDefinition: string; // useless
  DestinyVendorDefinition: string; //
  DestinyVendorGroupDefinition: string; // useless
}
type PartialJsonContentPaths = Partial<JsonWorldComponentContentPaths>

export const useManifestJson = () => {
  const componentContentPaths = ref<PartialJsonContentPaths>({});
  const manifestVersion = ref<string>('');

  const getManifestData = async (): Promise<void> => {
    try {
      const { data } = await getDestinyManifestAPI();
      const { version, jsonWorldComponentContentPaths } = data.Response;
      manifestVersion.value = version;
      componentContentPaths.value = jsonWorldComponentContentPaths.ko;
    } catch (e) {
      console.log(`Manifest 파일을 가져오지 못했습니다 : ${e}`);
    }
  };

  onBeforeMount(() => {
    getManifestData();
  });

  return {
    manifestVersion,
    componentContentPaths,
  };
};
