<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list"
            v-for="(cart, index) in shopcar"
            :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox"
                   name="chk_list"
                   :checked="cart.isChecked == 1"
                   @change="updateChecked(cart, $event)" />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.img" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">￥{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="#"
               class="mins"
               @click="handler('minus', -1, cart,index)">-</a>
            <input
                   type="text"
                   minnum="1"
                   class="itxt"
                   v-model="cart.skuNum"
                   @change="handler('change', $event.target.value * 1, cart,index)" />
            <a href="#"
               class="plus"
               @click="handler('add', 1, cart,index)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet"
               @click="deleteCartById(index)">删除</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll"
               type="checkbox"
               :checked="isAllCheck && shopcar.length > 0"
               @change="updateAllCartChecked" />
        <span>全选</span>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>{{SumNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reqGetShopCar } from '@/api'
export default {
  name: 'ShopCart',
  data () {
    return {
      shopcar: [],
    }
  },
  mounted () {
    this.getData()
  },
  computed:{
    //所有商品的总价
    totalPrice() {
      let sum = 0;
      this.shopcar.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    //商品总数
    SumNum(){
      let sum = 0;
      this.shopcar.forEach((item)=>{
        sum += item.skuNum
      })
      return sum
    },
    //全选框是否选中
    isAllCheck() {
      return this.shopcar.every((item) => item.isChecked == 1);
    }
  },
  methods: {
    //请求mock数据
    async getData () {
      let result = await reqGetShopCar()
      this.shopcar = result.data
    },
    //商品数量的修改
    handler(type,disNum,cart,index){
      if(type == "minus"){
       if(cart.skuNum >= 1){
          cart.skuNum--
       }
      }
      if(type == "add"){
        cart.skuNum++ 
      }
      if(cart.skuNum == 0){
        this.shopcar.splice(index, 1);
      }
    },
    //全选
    updateAllCartChecked(event) {
      this.shopcar.forEach((item) =>{
        item.isChecked = event.target.checked ? "1" : "0";
      })
    },
    //删除商品
    deleteCartById(index){
      this.shopcar.splice(index, 1);
    },
    //勾选某个商品的状态
     updateChecked(cart, event) {
       cart.isChecked = 1
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
          list-style-type: none;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            text-decoration: none;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            text-decoration: none;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 52px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 52px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
