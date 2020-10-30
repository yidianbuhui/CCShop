import request from "@/utils/request.js";

export function carousels(params) {
  return request({
    url: "/carousel/list", //如果是绝对路径就不会在使用配置里的url
    method: "post",
    data: params //注意：如果是post请求请使用 data: params
  });
}

export function selectCarousel(params) {
  return request({
    url: "/carousel/selectCarousel", //如果是绝对路径就不会在使用配置里的url
    method: "get",
    params: params //注意：如果是post请求请使用 data: params
  });
}
