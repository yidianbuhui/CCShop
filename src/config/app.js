import { useApiUrl } from "@/config/apiUrl";
import CommonConfig from "@/config/common";
import SystemConfig from "@/config/system";

export default {
  ...CommonConfig,
  ...SystemConfig,
  apiUrl: useApiUrl,
  corporation: "cc电子有限公司",
  siteName: "cc电子商城"
};
