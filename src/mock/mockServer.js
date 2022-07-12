import Mock from 'mockjs'
import shop from './shop.json'

Mock.mock("/mock/shop",{code:200,data:shop});