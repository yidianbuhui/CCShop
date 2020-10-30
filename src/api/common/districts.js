import request from "@/utils/request.js";

export function listDistricts(params) {
  return request({
    url: "/common/listDistricts",
    method: "get",
    params: params //注意：如果是get请求请使用 params: params
  });
}
