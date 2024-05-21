import CryptoJS from "crypto-js";
import { getFileBase64 } from "./img2base64";

async function initData() {
  let users = JSON.parse(localStorage.getItem("user")) || [];
  if (users.length === 0) {
    localStorage.setItem("user", JSON.stringify([
      {
        username: 'admin',
        password: CryptoJS.SHA256('Admin123456').toString(),
        email: "81723334@qq.com",
        privilege: "管理员"
      },
      {
        username: 'user',
        password: CryptoJS.SHA256('User123456').toString(),
        email: "21301172@bjtu.edu.cn",
        privilege: "普通用户"
      },
      {
        username: 'seller',
        password: CryptoJS.SHA256('Seller123456').toString(),
        email: "21301173@bjtu.edu.cn",
        privilege: "商家"
      }
    ]));
  }

  // 设置权限列表
  let privileges = JSON.parse(localStorage.getItem('privileges')) || [];
  if (privileges.length === 0) {
    privileges = [
      {
        role: '管理员',
        desc: '拥有所有权限'
      },
      {
        role: '普通用户',
        desc: '只能查看'
      },
      {
        role: "商家",
        desc: "能够管理商城商品"
      }
    ];
    localStorage.setItem('privileges', JSON.stringify(privileges));
  }

  // 设置菜单列表
  let menus = JSON.parse(localStorage.getItem('menus')) || [];
  if (menus.length === 0) {
    menus = [
      {
        title: '权限管理',
        parent: "",
        path: "",
      },
      {
        title: '用户管理',
        parent: '权限管理',
        path: '/userControl',
        allowUser: [
          '管理员'
        ]
      },
      {
        title: '角色管理',
        parent: '权限管理',
        path: '/roleControl',
        allowUser: [
          '管理员'
        ]
      },
      {
        title: '菜单管理',
        parent: '权限管理',
        path: '/menuControl',
        allowUser: [
          '管理员'
        ]
      },
      {
        title: "商城管理",
        parent: "",
        path: ""
      },
      {
        title: "订单列表",
        parent: "商城管理",
        path: "/orderControl",
        allowUser: [
          '管理员',
          '商家'
        ]
      },
      {
        title: "商品列表",
        parent: "商城管理",
        path: "/productsControl",
        allowUser: [
          '管理员',
          '商家'
        ]
      },
      {
        title: "分类列表",
        parent: "商城管理",
        path: "/classControl",
        allowUser: [
          '管理员',
          '商家'
        ]
      }
    ];
    localStorage.setItem('menus', JSON.stringify(menus));
  }

  // 商品名称 商品图片 商品价格 库存 销量 图片 商品编号 所属店家
  let products = JSON.parse(localStorage.getItem('products')) || [];

  if (products.length === 0) {
    const product = {
      name: "huawei mate 60 pro",
      classification: "手机数码",
      image: await getFileBase64(`${process.env.PUBLIC_URL}/assets/mate60.png`),
      price: 8848,
      stock: 1024,
      sales: 233,
      imageList: await Promise.all([
        getFileBase64(`${process.env.PUBLIC_URL}/assets/mate60_3.png`),
        getFileBase64(`${process.env.PUBLIC_URL}/assets/mate60_2.png`),
        getFileBase64(`${process.env.PUBLIC_URL}/assets/mate60_1.png`),
      ]),
      id: "d40a13a6-6b58-4f08-b9e6-da2cbd20c3fc",
      seller: "seller"
    };
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
  }
  //订单的格式：用户姓名，商品id，订单商品，订单地址，订单时间，订单数量，订单金额，订单状态（付款-发货-收获）
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  if (orders.length === 0) {
    orders = [
      {
        userId: "user",
        sellerId: "seller",
        productId: products[0].id,
        productName: products[0].name,
        address: "北京市海淀区",
        time: new Date().toLocaleString(),
        amount: 1,
        price: 8848,
        status: "付款"
      }
    ];
    localStorage.setItem('orders', JSON.stringify(orders));
  }
  let classificiations = JSON.parse(localStorage.getItem('classifications')) || [];
  if (classificiations.length === 0) {
    classificiations = [
      {
        name: "手机数码",
      },
      {
        name: "家用电器",
      },
      {
        name: "家居家装",
      },
      {
        name: "汽车用品",
      },
      {
        name: "电脑办公",
      }
    ];
    localStorage.setItem('classifications', JSON.stringify(classificiations));
  }
}

export { initData };