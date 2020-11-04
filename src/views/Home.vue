<template>
  <div class="main">
	  <el-row>
	      <!-- <el-breadcrumb
	        separator-class="el-icon-arrow-right"
	        style="font-size:18px; margin-top:20px"
	      >
	        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
	        <el-breadcrumb-item>关于我们</el-breadcrumb-item>
	      </el-breadcrumb> -->
	      <el-col :offset="17">
	        <el-input
	          placeholder="请输入商品名称"
	          size="middle"
	          style="width: 270px;"
	          v-model="searchParams.name"
	          clearable
	        ></el-input>
	        <el-button
	          size="middle"
	          icon="el-icon-search"
	          @click="refresh()"
	        ></el-button>
	      </el-col>
	    </el-row>
	  
      <el-col :offset="3">
        <el-carousel
          height="458px"
          :interval="3000"
          arrow="never"
          style="width:1069px;"
        >
          <el-carousel-item v-for="item in carousel" :key="item.id">
            <el-image
              style="width: 1069px;height: 458px;"
              :src="serverImageUrl + 'carousel/' + item.imgpath"
            ></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    <div class="goodsrush">
      <el-row>
        <el-col :span="3">
          <div class="todayrush">
            <el-image
              style="width: 225px; height: 300px;"
              :src="todayrushadv"
            ></el-image>
          </div>
        </el-col>
        <el-col :span="20" class="rushlist">
          <el-row :gutter="20">
            <el-carousel style="margin-left:16px;width:995px">
              <el-carousel-item v-for="list in goodsrushList" :key="list.num">
                <el-col
                  :span="6"
                  v-for="item in list.goodsrushitem"
                  :key="item.id"
                >
                  <div class="rushitem">
                    <el-image
                      style="width: 180px; height: 180px;"
                      :src="serverImageUrl + 'goods/' + item.imgpath"
                    ></el-image>
                    <h3 style="font-size:18px;margin-left:48px">
                      {{ item.name }}
                    </h3>
                    <p style="margin-left:55px">￥{{ item.price }}</p>
                  </div>
                </el-col>
              </el-carousel-item>
            </el-carousel>
          </el-row>
        </el-col>
      </el-row>
    </div>

    
    <el-divider
      ><b style="font-size:32px;" class="el-icon-shopping-bag-1"
        >更多商品</b
      ></el-divider
    >
	<div class="goodsList">
	  <el-row>
	    <el-col
	      :span="5"
	      v-for="v in goodsList"
	      :key="v.id"
	      style="margin:25px"
	    >
	      <el-card @click.native="toDetail(v.id)" class="gcard">
	        <div>
	          <img
	            :src="serverImageUrl + 'goods/' + v.imgpath"
	            style="width: 180px;height: 150px;"
	          />
	        </div>
	
	        <div>
	          <p style="font-size: 20px;">{{ v.name }}</p>
	          <p style="color: red;font-size: 28px;">{{ v.price }}</p>
	          <p style="font-size: 14px;">{{ v.goodsdesc }}</p>
	        </div>
	      </el-card>
	    </el-col>
	  </el-row>
</div>
</div>
</template>

<script>
//   import {catelogy} from "../../api/goods";
import { carousels } from "@/api/carousel/carousel";
import { goodsTypeList } from "@/api/goodsType/goodsType";
import { goods } from "@/api/goods/goods";
import common01 from "@/assets/imgs/s_img1.jpg";
import { serverApiUrl } from "@/config/apiUrl";
import { getUserInfo, logout } from "@/utils/common";

export default {
  name: "MainNav",
  data() {
    return {
      serverImageUrl: serverApiUrl + "/upload/",
      carousel: [],
      pageNo: 1,
      pageSize: 12,
      // 商品信息
      goodsrushList: [],
      todayrushadv: common01,
      hot: [
        // { name: "宝宝五彩袜", imgpath: hot1, price: 39 },
        // { name: "宝宝连体衣", imgpath: hot2, price: 59 },
        // { name: "宝宝餐具", imgpath: hot3, price: 48 },
        // { name: "宝宝两件套", imgpath: hot4, price: 69 },
        // { name: "宝宝上衣", imgpath: hot5, price: 49 },
        // { name: "宝宝上衣", imgpath: hot6, price: 49 },
        // { name: "宝宝上衣", imgpath: hot7, price: 49 },
        // { name: "宝宝上衣", imgpath: hot8, price: 49 },
      ],
      selected: "",
      isNavEnter: false,
      isMenuEnter: false,
      goodsList: [],
      total: 0, 
      loading: true,
      searchParams: {
        name: "",
        type: "",
      },
      goodsTypeData: [],
      id: null,
    };
  },
  methods: {
	  // 返回顶部
	  backtop() {
	    const timer = setInterval(function() {
	      const top =
	        document.documentElement.scrollTop || document.body.scrollTop;
	      const speed = Math.floor(-top / 5);
	      document.documentElement.scrollTop = document.body.scrollTop =
	        top + speed;
	  
	      if (top === 0) {
	        clearInterval(timer);
	      }
	    }, 20);
	  },
    // togoods(goodTypeId) {
    //   this.$router.push({
    //     path: "/goods",
    //     query: { goodTypeId: goodTypeId },
    //   });
    // },
	toDetail(goodsid) {
	  console.log(goodsid);
	  this.$router.push({
	    path: "GoodsDetails",
	    query: { goodsid: goodsid },
	  });
	},
	changePage(val) {
	  this.pageNo = val;
	  this.initData();
	  this.backtop();
	},
    initData() {
      carousels({})
        .then((r) => {
          this.carousel = r.list;
        })
        .catch(() => {});
      // goods({ pageNo: this.pageNo, pageSize: this.pageSize })
      //   .then((r) => {
      //     var list = r.list;
      //     var goodsrushitem = [];
      //     var o = {};
      //     list.forEach((e, i) => {
      //       goodsrushitem.push(e);
      //       if ((i + 1) % 4 == 0) {
      //         o = {};
      //         o.num = Math.floor((i + 1) / 4);
      //         o.goodsrushitem = goodsrushitem;
      //         goodsrushitem = [];
      //         this.goodsrushList.push(o);
      //       }
      //     });
      //     console.log(this.goodsrushList);
      //     // this.goodsrushList = r.list;
      //   })
      //   .catch(() => {});
	  goods({
	    pageNo: this.pageNo,
	    pageSize: this.pageSize,
	    name: this.searchParams.name,
	    typeid: this.searchParams.type,
	  })
	    .then((r) => {
	      this.goodsList = r.list;
	      this.total = r.count;
	    })
	    .catch(() => {});
	  goodsTypeList({})
	    .then((r) => {
	      this.goodsTypeData = r;
	    })
	    .catch(() => {});
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    toLogout() {
      logout();
    },
  },
  activated() {
    this.searchParams.type = this.$route.query.goodTypeId;
    this.initData();
  },
  created() {
    this.initData();
  },
  computed: {
    userInfo() {
      return getUserInfo();
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 1220px;
  margin: 0 auto;
}
.todayrush {
  margin-top: 20px;
}
.rushitem {
  margin-top: 30px;
}
.rushlist {
  border: 1px solid #c2c2c2;
  border-left: none;
  margin-top: 20px;
  margin-left: 67px;
  width: 1000px;
  height: 300px;
}
.rushlist h3 {
  color: #000000;
  line-height: 30px;
}
.rushlist p {
  color: red;
  font-size: 24px;
}
.main-nav {
  font-size: 14px;
  width: 1226px;
  background: #fff;
  /*margin: 0 auto;*/
  position: absolute;
  display: flex;
  justify-content: flex-start;
  > .nav-first {
    /*width: 215px;*/
    width: 153px;

    text-align: center;
    height: 458px;
    position: relative;
    z-index: 99999;
    /*padding-top: 22px;*/
    ul {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      background: #ffffff;
      padding: 5px 0;
      color: #303133;
      li {
        padding-left: 30px;
        height: 50px;
        line-height: 45.5px;
        cursor: pointer;
        &:hover {
          /*background: #ff6700;*/
          background: #409eff;
          opacity: 0.7;
          transition: all 0.25s;
        }
        > p {
          display: flex;
          justify-content: space-between;
          > .icon {
            margin-right: 20px;
            font-weight: bold;
          }
        }
      }
    }
  }
  .nav-sec {
    height: 400px;
    /*margin-top: 22px;*/
    width: 360px;
    // width: 40vw;
    position: relative;
    top: 0;
    left: 0.06vw;
    /*right: 1.5%;*/
    background: #ffffff;
    opacity: 0.8;
    z-index: 99999;
    overflow: hidden;
    border: 1px solid #cfb2f6;
    border-left: none;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35);
    ul {
      height: 458px;
      display: flex;
      flex-flow: wrap;
      flex-direction: column;
      align-items: flex-start;
      align-content: flex-start;
      justify-content: flex-start;
      li {
        width: 265px;
        height: 76px;
        .product {
          a {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            transition: color 0.2s;
            width: 265px;
            padding: 20px 20px;
            &:hover {
              color: #d33434;
            }
            img {
              width: 40px;
              height: 40px;
              margin-right: 12px;
            }
          }
        }
      }
    }
  }
}
li {
  list-style-type: none;
}
.el-carousel__item h3 {
  font-size: 30px;
  opacity: 0.8;

  color: rgb(0, 0, 0);
}
</style>
